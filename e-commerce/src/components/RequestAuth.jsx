import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectRoot({isAuthenticated,children}){
    if(!isAuthenticated){
        return <Navigate to='/Login' replace/>
    }
    return children;
}

export default ProtectRoot;