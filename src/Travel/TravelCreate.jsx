import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackwardIcon } from "../icons/backward.svg";
import axios from "axios";



const TravelCreate = () => {
    return (
      <Container>
        <Header>
          <Button><BackwardIcon /></Button>
          <Title>새 여행 생성</Title>
          <CompleteButton>완료</CompleteButton>
        </Header>
        <Circle />
        <Input placeholder="여행명을 입력해주세요." />
        <DateContainer>
          <DateInput type="date" />
          <DateInput type="date" />
        </DateContainer>
        <Input placeholder="여행지를 입력해주세요." />
        <Target>목표 금액</Target>
        <Input type="number" placeholder="목표 금액을 설정해주세요." />
      </Container>
    );
  };
  
  export default TravelCreate;
  const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 48px;
`;


const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 72px;
  position: relative;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: var(--Grayscale-9, #141414);
  font-weight: 600;
  top: 0;
`;

const CompleteButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: var(--Grayscale-9, #141414);
  font-weight: 600;
  top: 0;
  position: absolute;
  right: 0;
`;

const Title = styled.h1`
  color: var(--Grayscale-7, #474747);
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Circle = styled.div`
  width: 207px;
  height: 207px;
  border-radius: 50%;
  background-color: #ddd;
  margin-bottom: 64px;
`;

const Input = styled.input`
  width: 93%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid #ccc;
  background: none;
  outline: none;
  text-align: center;
  color: var(--Grayscale-3, #ADADAD);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.36px;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  position: relative;

  &::before {
    content: "~";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #aaa;
    margin-bottom: 10px;
  }
`;


const DateInput = styled(Input)`
  width: 40%;
text-align: center;
  border-bottom: 1px solid #ccc;
  background: none;
  outline: none;
  color: #333;
`;

const Target = styled.div`
    color: var(--Grayscale-5, #7A7A7A);
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-top: 18px;
`;