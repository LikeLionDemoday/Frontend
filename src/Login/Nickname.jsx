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
        </NicknameContainer>
    )
}

const NicknameContainer=styled.div`
    width: 100%;
    height: 700px;
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
`;

