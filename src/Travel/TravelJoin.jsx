import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as BackwardIcon } from "../icons/backward.svg";

const TravelJoin = () => {

    
return (
    <Container>
      <Header>
        <Button><BackwardIcon /></Button> 
        <Title>초대 링크</Title>
      </Header>
      <QRcode />
      <URLzone></URLzone>
    </Container>
  );


}


export default TravelJoin

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

const QRcode = styled.div`
width: 207px;
height: 207px;
border-radius: 50%;
background-color: #ddd;
margin-bottom: 64px;
`;


const URLzone = styled.div`
`;
