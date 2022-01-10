import React from "react";
import { LoadingSpinner } from "hds-react";
import { useParams } from "react-router-dom"
import authService from '../auth/authService';

export const Login = () => {

    const { id } = useParams();
    localStorage.setItem('orderId', id);
    authService.login();

    return (
        <div className="box spinner">
            <LoadingSpinner></LoadingSpinner>
        </div>
    )
}
export default Login