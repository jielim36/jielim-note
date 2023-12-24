import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userLoginMutation } from '../../graphql/UserGql';
import { useMutation } from '@apollo/client';
import { Alert, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, saveToken } from '../../helper/auth';
import app_logo from "../../assets/app_logo.png";
import './Login.css';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        From MUI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {

  const [userLoginFunction , {data, loading ,error}] = useMutation(userLoginMutation);
  const navigate = useNavigate();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    const userForm = {
      email: data.get('email'),
      password: data.get('password'),
    }
    try {
      await userLoginFunction({variables: {user: userForm}})
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(()=> {
    if(data){      
      loginSuccessfully();
    }
  })

  const loginSuccessfully = async () => {
    saveToken(data.userLogin.access_token);
    if(await isAuthenticated()){
      navigate("/");
    }
  }

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img 
            src={app_logo}
            alt='app_logo'
            className='app_logo'
          />
          <p className='app_welcome'>
            Welcome to Jielim Note
          </p>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Stack sx={{ width: '100%' }} spacing={2}>
          {error && 
            <Alert severity="error">{error?.message}</Alert>
          }
          {
            data &&
            <Alert severity="success">Login Successfully</Alert>
          }
        </Stack>
      </Container>
    </ThemeProvider>
    </>
  );
}