import React from 'react'

const Home = () => {
  
  return (
    <div>
        <h1>Home Page</h1>
        <p>{process.env.SERVER_PORT}</p>
    </div>
  )
}

export default Home