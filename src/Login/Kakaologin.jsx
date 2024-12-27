import React from "react";
import login_button from "../asset/kakaoLogin_pic.png";

export function Kakaologin(){
    const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

    const kakaoURL=`https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    
    const handleLogin = () => {
        window.location.href = kakaoURL;
    }

    return(
        <div>
            <img src={login_button} alt="kakaoLogin" onClick={handleLogin} />
        </div>
    );
}