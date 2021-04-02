import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'


const LoginGoogle=()=>{
    const responseGoogle = (response) => {
        if(response.googleId){
            console.log(response.profileObj);
            let fistName = (response.profileObj.familyName!==undefined)?response.profileObj.familyName:'';
            let lastName = (response.profileObj.givenName!==undefined)?response.profileObj.givenName:'';
            let fullName = `${fistName} ${lastName}`;
            let email = response.profileObj.email;
            axios.post('http://localhost:8001/api/user/',{
                name:fullName,
                loginType:"google",
                email:email,
                id: response.profileObj.googleId,
                password : "123"
            })
            .then(res=>{
                localStorage.setItem('user',JSON.stringify(res.data.data));
                window.location.reload();
            })
            .catch(err=>{
                console.log(err.response);
            })
        }
        return;
    }
    return(
        <div>
            <h2>login</h2>
            <GoogleLogin
                clientId="841882957552-0lo07upplhonc1ei4dqn0cpbqqk495eh.apps.googleusercontent.com"
                buttonText="Đăng nhập Google"
                onSuccess={responseGoogle}
                className="btn-login"
            /> 
        </div>
    )
}
export default LoginGoogle;