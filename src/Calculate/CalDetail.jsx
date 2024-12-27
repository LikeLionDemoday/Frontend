import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import styled from "styled-components";
import TransactionCard from "../Components/TransactionCard";

const CalDetail = () => {

  const navigate = useNavigate();
  
  const [isToggleOn, setIsToggleOn] = useState(false);

  const transactions = [
    { from: "나", to: "김OO", amount: -9000 },
    { from: "김OO", to: "나", amount: 6000 },
  ];

  const handleToggleChange = () => {
    setIsToggleOn(!isToggleOn);
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={ () => {navigate(`/expense/${tripId}`)}}>←</BackButton>
        <Title>정산 내역</Title>
      </Header>
      <TransactionCard
        name="김예송"
        amount={3000}
        date="2024.12.20 - 12.24"
        transactions={transactions}
        isToggleOn={isToggleOn}
        isExpanded={isExpanded}
        onToggleChange={handleToggleChange}
        onCardClick={handleCardClick}
      />
    </Container>
  );
};

export default CalDetail;

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  padding: 16px;
  background-color: #f9f9f9;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.div`
  cursor: pointer;
  font-size: 24px;
  margin-right: 16px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;
