import React from "react";
import login_button from "../asset/kakao_login_medium_wide.png";
import {ReactComponent as LoginPic} from "../asset/loginPic.svg";
import styled from "styled-components";

export function Kakaologin(){
    const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

    const kakaoURL=`https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    
    const handleLogin = () => {
        window.location.href = kakaoURL;
    }

    return(
        <LoginContainer>
            <LoginPic />
            <ButtonContainer>
                <img src={login_button} alt="kakaoLogin" onClick={handleLogin} />
            </ButtonContainer>
            
        </LoginContainer>
    );
}

const LoginContainer=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ButtonContainer=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

`;

