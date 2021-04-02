import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios'

const LoginFacebook=()=>{
    const responseFacebook = (response) => {
        if(response.id){
            // console.log(response);
            let fullName = response.name;
            let email = response.email;
            axios.post('http://localhost:8001/api/user/',{
                name:fullName,
                loginType:"facebook",
                email:email,
                id: response.id,
                password : "123"
            })
            .then(res=>{
                localStorage.setItem('user',JSON.stringify(res.data.data));
                window.location.reload()
            })
            .catch(err=>{
                console.log(err.response);
            })
        }
        return;
    }
    return(
        <div>
            <span style={{
                display:"block",
                margin:"2px auto",
                letterSpacing:"3px",
                padding:"2px",
                fontWeight:"600"
            }}>hoặc</span>
            <FacebookLogin
                appId="486528682704672"
                fields="name,email"
                icon="fa-facebook"
                textButton="đăng nhập"
                callback={responseFacebook}
            />
        </div>
    )
}
export default LoginFacebook;