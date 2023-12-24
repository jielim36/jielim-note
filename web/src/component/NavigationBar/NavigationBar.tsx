import React from 'react'
import './NavigationBar.css';
import { Avatar, IconButton, Stack } from '@mui/material';
import { userLogoutMutation } from '../../graphql/UserGql';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../helper/auth';
import { NoteSystemViewer } from '../NoteSystemViewer/NoteSystemViewer';
import HomeIcon from '@mui/icons-material/Home';

const NavigationBar = ({isCloseNav} : {isCloseNav:boolean}) => {

    const [userLogoutFunction , {data, loading ,error , client}] = useMutation(userLogoutMutation);
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

    const [dirOpen, setDirOpen] = React.useState(true);

    const dirHandleClick = () => {
        setDirOpen(!dirOpen);
      };

    if(isCloseNav){
        return null;
    }


    return (
        <nav className='navigationContainer'>
          <Stack direction="row" spacing={1} className='userInfoContainer'>
            <div className='UserInfo button'>
                  <Stack direction="row" spacing={2}>
                      <Avatar style={{background: '#9254de'}} className='avatarNav'>JL</Avatar>
                      <p>Lim Yee Jie</p>
                  </Stack>
                <div className="UserInfoOptions">
                    <p className="UserInfoOption">My Account</p>
                    <p className="UserInfoOption" onClick={onLogoutHandler}>Logout</p>
                </div>
            </div>
            <IconButton className='homeBtn' onClick={()=> navigate("/")}>
              <HomeIcon />
            </IconButton>
          </Stack>
          <NoteSystemViewer />
        </nav>
      )
}

export default NavigationBar