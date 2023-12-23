import React from 'react'
import './NavigationBar.css';
import { Avatar, Stack } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { userLogoutMutation } from '../../graphql/UserGql';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../helper/auth';

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
            <div className='UserInfo'>
                <Stack direction="row" spacing={2}>
                    <Avatar style={{background: '#9254de'}} className='avatarNav'>JL</Avatar>
                    <p>Lim Yee Jie</p>
                </Stack>
                <div className="UserInfoOptions">
                    <p className="UserInfoOption">My Account</p>
                    <p className="UserInfoOption" onClick={onLogoutHandler}>Logout</p>
                </div>
            </div>

            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                    Directory
                    </ListSubheader>
                }
                >
                <ListItemButton>
                    <ListItemIcon>
                    <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sent mail" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                    <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </ListItemButton>
                <ListItemButton onClick={dirHandleClick}>
                    <ListItemIcon>
                    <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {dirOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={dirOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </nav>
      )
}

export default NavigationBar