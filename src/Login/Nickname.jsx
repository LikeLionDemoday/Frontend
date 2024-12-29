import React from "react";
import styled from "styled-components";
import dodutchPic from "../asset/dodutch.png";
import { useState } from "react";
import axiosInstance from "../api/axios.js";
import { useNavigate } from "react-router-dom";

export function Nickname(){

    const navigate=useNavigate();
    const [nickname,setNickname]=useState("");

    const handleNicknameChange = (e) => {
        const value = e.target.value;
        if (value.length <= 12) {
            setNickname(value);
        }
    };

    const handleComplete = async() => {
        try{
    
            const response=await axiosInstance.post(`/auth/signup`, 
            {   
                accessToken: localStorage.getItem('access_token'),
                nickName: nickname
            },
            );


            const memberId = response.data.data.memberId;
            localStorage.setItem('memberId', memberId);

            navigate("/main");

            console.log(response.data);
        }
        catch(error){
           // 더 자세한 에러 정보 출력
            console.log(error);

            if (error?.response?.status === 400) {
                alert("닉네임이 중복되었어요. 다시 입력해주세요!");
            } else {
                alert("오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    return(
        <NicknameContainer>
            <div className="title">
                <p>시작하기</p>
            </div>
            <img className="dodutchPic" src={dodutchPic} alt="dodutch" />
            <div className="text">
                <p>두더치에서 사용할</p>
                <p>닉네임을 설정해주세요!</p>
            </div>

            <input type="text" className="nicknameInput" value={nickname} onChange={handleNicknameChange} maxLength={12} />
            <div className="nicknameLength">
                <p>{nickname.length}/12</p>
            </div>

            <CompleteBtn onClick={handleComplete}>두더치 시작하기</CompleteBtn> 
        </NicknameContainer>
    )
}

// 완료하면 /main 으로 navigate

const NicknameContainer=styled.div`
    width: 100%;
    height: 812px;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    //background-color: red;

    .title{
        color: var(--Grayscale-7, #474747);
        text-align: center;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 24px */
        margin-top: 60px;
    }

    .dodutchPic{
        width: 270px;
        height: 270px;
        margin-top: 80px;
    }

    .text{
        width:270px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #000;
        text-align: center;
        font-family: Pretendard;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 165%; /* 29.7px */
        letter-spacing: -0.018px;
        margin-top: 40px;
        //background-color: blue;
    }

    .nicknameInput{
        width: 248px;
        height: 48px;
        border: 1px solid var(--Grayscale-1, #E0E0E0);
        border-radius: 10px;
        margin-top: 40px;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid var(--Grayscale-1, #E0E0E0);
        text-align: center;
        outline: none;
    }

    .nicknameLength {
        margin-top: 8px;
        color: var(--Grayscale-5, #9E9E9E);
        font-size: 12px;
        margin-top: 10px;
        margin-left: 210px;
    }
`;

const CompleteBtn=styled.div`
    width:331px;
    height:56px;
    background-color: var(--main-red, #FF5234);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 50px;
    
    color: var(--Grayscale-White, #FFF);
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 27px */
`


