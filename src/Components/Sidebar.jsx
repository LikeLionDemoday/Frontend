import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as NextButton } from "../icons/rightward.svg";
import { ReactComponent as PlusButton } from "../icons/plus.svg";
import { ReactComponent as SearchButton } from "../icons/SearchRight.svg";
import { ReactComponent as Xbutton } from "../icons/Xbutton.svg";



const Sidebar = ({ toggleSidebar }) => {

    const [isTravelMenuOpen, setIsTravelMenuOpen] = useState(false);
    
    const navigate = useNavigate();
    
    const toggleTravelMenu = () => {
      setIsTravelMenuOpen(!isTravelMenuOpen);
    };


    return (
            <Container>
              <CloseButton onClick={toggleSidebar}><Xbutton/></CloseButton>
              <div>
              <EachItem>
                <MenuItem onClick={() => navigate("/main")}>두더치 홈</MenuItem>
              </EachItem>
    
              <EachItem style={{ borderBottom: "none" }}>
                <MenuItem onClick={toggleTravelMenu}>
                여행 관리
                </MenuItem>
              </EachItem>
              {isTravelMenuOpen && (
                <SubMenu>
                  <SubMenuItem onClick={() => navigate("/tripMain")}>여행 목록</SubMenuItem>
                  <SubMenuItem onClick={() => navigate("/trip")}>여행 추가</SubMenuItem>
                  <SubMenuItem onClick={() => navigate("/calculate/total")}>정산 내역</SubMenuItem>
                </SubMenu>
                    )}
              
              <EachItem style={{ borderTop: "1px solid #ddd" }}>
                <MenuItem onClick={() => alert("추후 업데이트 예정")}>계정 관리</MenuItem>
              </EachItem>
              
              </div>
              <Logout onClick={() => alert("추후 업데이트 예정")}>로그아웃</Logout>
            </Container>
    )
}

export default Sidebar;



const Container = styled.div`
width: 241px;
height: 100%;
position: absolute;
top: 0;
right: 0;
background: var(--sidebar, linear-gradient(180deg, #FAFAFA 0%, #FEFEFE 9%, #FFF 100%));
flex-shrink: 0;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
padding: 20px;
display: flex;
flex-direction: column;
padding-top: 64px;
`;


const CloseButton = styled.button`
background: none;
border: none;
font-size: 24px;
cursor: pointer;
align-self: flex-end;
`;


const MenuItem = styled.div`

display: flex;
width: 100%;
height: 40px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 16px;
&:hover,
&:active {
  color: var(--main-red, #FF5234);
  font-weight: 700;
  background: var(--main-lightred, #FFFAF9);
}
`;

const EachItem = styled.div`
  display: flex;
  justify-content: center;
padding: 20px 0;
cursor: pointer;
border-bottom: 1px solid #ddd;
color: var(--Grayscale-7, #474747);
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 24px */
letter-spacing: -0.016px;
`

const SubMenu = styled.div`
flex-direction: column;
margin-bottom: 20px;
`;

const SubMenuItem = styled.div`
padding: 10px 0;
cursor: pointer;
font-size: 16px;
text-align: center;

color: var(--Grayscale-7, #474747);
font-style: normal;
font-weight: 500;
line-height: 150%; /* 24px */
letter-spacing: -0.016px;
`;

const Logout = styled.div`
cursor: pointer;
text-align: center;
&:hover {
  background-color: #f0f0f0;
}
margin-top: 656px;
left: 40%;

position: absolute;


color: var(--Grayscale-9, #141414);
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 21px */
text-decoration-line: underline;
text-decoration-style: solid;
text-decoration-skip-ink: none;
text-decoration-thickness: auto;
text-underline-offset: auto;
text-underline-position: from-font;

`;