import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../helper/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthChecker = ({ children } : {children:any}) => {

    const [loginState, setLoginState] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isNoAuthPath:boolean = ['/login', '/register'].includes(location.pathname);

    const isLogin = async ()=> {
        setLoginState(await isAuthenticated());
        if(!loginState){
            // window.location.href = '/login';
            navigate("/login");
        }
    }

    useEffect( () => {
        if(isNoAuthPath){
            return;
        }
        isLogin();
    }, [isNoAuthPath]);

    if(loginState || isNoAuthPath){
        return <>{children}</>;
    }else{
        return null;
    }
};

export default AuthChecker;
