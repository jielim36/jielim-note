import React from 'react'
import './NavigationBar.css';
import { Avatar, Stack } from '@mui/material';

const NavigationBar = ({isCloseNav} : {isCloseNav:boolean}) => {
    if(isCloseNav){
        return null;
    }

    return (
        <nav className='navigationContainer'>
            <Stack direction="row" spacing={2} className='UserInfo'>
                <Avatar className='avatarNav'>JL</Avatar>
                <p>Lim Yee Jie</p>
            </Stack>
            <ul>
            </ul>
        </nav>
      )
}

export default NavigationBar