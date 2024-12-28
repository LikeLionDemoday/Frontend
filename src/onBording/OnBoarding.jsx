import styled from "styled-components";
import onboardingPic from "../asset/maindodutch.png";
import { useRef } from "react";

export function OnBoarding(){

    const secondPageRef = useRef(null);

    const scrollToSecondPage = () => {
        secondPageRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return(
        <OnBordingContainer>
            <FirstPage>
                <div className="textBox">
                    <p className="serviceExplain">여행 경비 정산 서비스</p>
                    <p className="serviceName">두더치</p>
                </div>
                <img src={onboardingPic} alt="onboardingPic" />
                <CompleteBtn onClick={scrollToSecondPage}>두더치 둘러보기</CompleteBtn>
            </FirstPage>
            <Bar></Bar>
            <SecondPage ref={secondPageRef}>

            </SecondPage>
`
        </OnBordingContainer>
        
    )
}

const OnBordingContainer=styled.div`
    width: 100%;
    //height: 100%;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    background-color: green;
`

const FirstPage=styled.div`
    width: 100%;
    height: 850px;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    background-color: beige;

    .textBox{
        width: 100%;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 202px;
        //background-color: blue;

        .serviceExplain{
            color: #000;

            font-family: Pretendard;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%; /* 30px */
        }

        .serviceName{
            color: #000;

            font-family: Pretendard;
            font-size: 36px;
            font-style: normal;
            font-weight: 900;
            line-height: 150%; /* 54px */
        }
    }

    img{
        width: 300px;
        height: 300px;
    }
`

const CompleteBtn=styled.div`
    width:331px;
    height:56px;
    background-color: var(--main-red, #FF5234);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 100px;
    
    color: var(--Grayscale-White, #FFF);
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 27px */
`
const Bar=styled.div`
    width:375px;
    height:16px;
    background-color: #EFEFEF;
`

const SecondPage=styled.div`
    width: 100%;
    height: 1050px;
    background-color: red;
`
