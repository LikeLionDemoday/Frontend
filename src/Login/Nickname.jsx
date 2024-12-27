import React from "react";
import styled from "styled-components";
import dodutchPic from "../asset/dodutch.png";

export function Nickname(){
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
    background-color: red;

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
        background-color: blue;
    }
`;

