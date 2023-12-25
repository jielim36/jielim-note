import React from 'react'
import './NavigationBar.css';
import { Avatar, IconButton, Skeleton, Stack } from '@mui/material';
import { getUserByTokenQuery, userLogoutMutation } from '../../graphql/UserGql';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../helper/auth';
import { NoteSystemViewer } from '../NoteSystemViewer/NoteSystemViewer';
import HomeIcon from '@mui/icons-material/Home';

const NavigationBar = ({isCloseNav} : {isCloseNav:boolean}) => {

    const [userLogoutFunction , {data, loading ,error , client}] = useMutation(userLogoutMutation);
    const {data:getUserResult , loading: getUserLoading, error: getUserError} = useQuery(getUserByTokenQuery);
    const navigate = useNavigate();

    const onLogoutHandler = async () => {
        try {
            await userLogoutFunction();
            await client.clearStore();
            clearToken();
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    if(isCloseNav){
        return null;
    }

    if(getUserError){
      return (
        <Stack spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
      );
    }

    return (
        <nav className='navigationContainer'>
          <div className='nameCard'>
            <div className='UserInfo button'>
                  <Stack direction="row" spacing={2}>
                    {getUserLoading ? <Skeleton variant="circular" width={40} height={40} /> : <Avatar style={{background: '#9254de'}} className='avatarNav'>JL</Avatar>}
                    <p>{getUserLoading ? <Skeleton variant="rectangular" width={80} height={20} /> : `${getUserResult.me.username}` }</p>
                  </Stack>
                <div className="UserInfoOptions">
                    <p className="UserInfoOption">My Account</p>
                    <p className="UserInfoOption" onClick={onLogoutHandler}>Logout</p>
                </div>
            </div>
            <IconButton className='homeBtn' onClick={()=> navigate("/")}>
              <HomeIcon />
            </IconButton>
          </div>
          <NoteSystemViewer />
        </nav>
      )
}

export default NavigationBar