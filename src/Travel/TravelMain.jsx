import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";



const TravelMain = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const travelList = [
      { name: "여행명", startDate: "12.15", endDate: "12.16" },
      { name: "여행명", startDate: "12.15", endDate: "12.16" },
      { name: "여행명", startDate: "12.15", endDate: "12.16" },
      { name: "여행명", startDate: "12.15", endDate: "12.16" },
      { name: "여행명", startDate: "12.15", endDate: "12.16" },
    ];
  
    const settlementList = [
      { name: "구성원", sum: "+40,000원" },
      { name: "구성원", sum: "-3,300원" },
      { name: "구성원", sum: "-3,300원" },
    ];
  
    return (
      <Container>
        <Header>
          <Logo>두더치</Logo>
          <MenuButton onClick={toggleSidebar}>☰</MenuButton>
        </Header>
        {isSidebarOpen && (
        <Sidebar>
          <CloseButton onClick={toggleSidebar}>닫기</CloseButton>
          사이드바 내용
        </Sidebar>
        )}
        <Section>
          <Title>여행 목록</Title>
          {travelList.map((travel, index) => (
            <ListItem key={index}>
              {travel.name} {travel.startDate} - {travel.endDate}
            </ListItem>
          ))}
        </Section>
        <Section>
          <Title>정산 내역</Title>
          {settlementList.map((settlement, index) => (
            <ListItem key={index}>
              {settlement.name} {settlement.sum}
            </ListItem>
          ))}
        </Section>
      </Container>
    );
  };
  
  const Container = styled.div`
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    background-color: #fff;
    border: none;
  `;
  
  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  `;
  
  const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
  `;
  
  const MenuButton = styled.button`
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
  `;
  
  const Sidebar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  background-color: #f4f4f4;
  padding: 20px;
`;

  const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
`;
  
  const Section = styled.div`
    margin-top: 20px;
  `;
  
  const Title = styled.h2`
    font-size: 18px;
    margin-bottom: 10px;
  `;
  
  const ListItem = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  `;
  
  export default TravelMain;