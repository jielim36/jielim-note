import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../helper/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthChecker = ({ children } : {children:any}) => {

    const [loginState, setLoginState] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isNoAuthPath:boolean = ['/login','/signup'].includes(location.pathname);

    const isLogin = async ()=> {
        if(!isAuthenticated()){
            navigate("/login");
            setLoginState(false);
        }else{
            setLoginState(true);
        }
    }

    useEffect( () => {
        if(isNoAuthPath){
            return;
        }else{
            isLogin();
        }
    }, [isNoAuthPath]);

    if(loginState || isNoAuthPath){
        return <>{children}</>;
    }else{
        return null;
    }
};

export default AuthChecker;
