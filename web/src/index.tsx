import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider , createHttpLink, ApolloLink } from '@apollo/client';
import {setContext} from "@apollo/client/link/context"
import { getToken, isAuthenticated, isAuthenticatedWithPromise, saveToken } from './helper/auth';
import { SERVER_PORT , SERVER_HOST } from './helper/configuration';
import { TokenRefreshLink } from "apollo-link-token-refresh";

const GRAPHQL_URL = `http://${SERVER_HOST}:${SERVER_PORT}/graphql`;
const EXPRESS_URL = `http://${SERVER_HOST}:${SERVER_PORT}`;

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
  credentials: "include",
});

const authLink = setContext( (_ , {headers}) =>{
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  }
})

const refreshLink = new TokenRefreshLink({
  accessTokenField: 'access_token',
  isTokenValidOrUndefined: async ()=> isAuthenticated(),
  fetchAccessToken: () => {
    return fetch(`${EXPRESS_URL}/refresh-token`, {
      method: 'POST',
      credentials: "include"
    });
  },
  handleFetch: (accessToken) => {
    saveToken(accessToken)
  },
  handleError: err => {
    // full control over handling token fetch Error
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);     
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([refreshLink,authLink,httpLink]),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
