import React, { useState } from "react";
import styled from "styled-components";
import backButtonIcon from "../assets/backbutton.svg";
import calButtonIcon from "../assets/calbutton.svg";
import { useNavigate } from "react-router-dom";
import BalanceSummary from "../Components/BalanceSummary"; 


const ExpenseContainer = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  padding: 10px;
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const BackButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const BackButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #474747;
`;

const SettleButton = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: #888;
  font-size: 17px;
  font-weight: normal;
  cursor: pointer;
`;

const ButtonText = styled.span`
  font-size: 17px;
  color: #888;
`;

const ButtonIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const DailyExpenses = styled.div`
  margin-top: 30px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 6px 15px;
  justify-content: center;
  align-items: center;
  border-radius: 29px;
  border: ${(props) => (props.active ? "none" : "1px solid var(--main-gray, #F0F0F0)")};
  background: ${(props) => (props.active ? "var(--Grayscale-9, #141414)" : "#FFF")};
  color: ${(props) => (props.active ? "#FFF" : "#000")};
  display: flex;
  cursor: pointer;
`;

const ExpenseList = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ExpenseListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const Expense = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/main");
  };

  const handleSettleClick = () => {
    navigate("/calculate/detail"); 
  };

  // 초기 설정 금액 및 카테고리 데이터
  const initialAmount = 1000000; // 초기 설정 금액
  const categories = [
    { name: "숙소", amount: 40000, color: "#d9d9d9" },
    { name: "교통", amount: 40000, color: "#c0c0c0" },
    { name: "식사", amount: 40000, color: "#999999" },
    { name: "활동", amount: 40000, color: "#666666" },
    { name: "기타", amount: 40000, color: "#333333" },
  ];

  const days = ["전체", "24일", "25일", "26일", "27일", "28일"];
  const expenses = Array(10).fill({ name: "항목명", amount: 40000 });

  return (
    <ExpenseContainer>
      {/* 헤더 영역 */}
      <Header>
        <BackButtonWrapper>
          <BackButton src={backButtonIcon} alt="뒤로가기" onClick={handleBackClick} />
        </BackButtonWrapper>
        <TitleSection>
          <Title>전체 지출</Title>
          <SettleButton onClick={handleSettleClick}>
            <ButtonText>정산하기</ButtonText>
            <ButtonIcon src={calButtonIcon} alt="정산하기 화살표" />
          </SettleButton>
        </TitleSection>
      </Header>

      {/* BalanceSummary 컴포넌트 */}
      <BalanceSummary initialAmount={initialAmount} categories={categories} />

      {/* DailyExpenses (기존 코드 유지) */}
      <DailyExpenses>
        <h3>일자별 지출</h3>
        <TabsContainer>
          {days.map((day, index) => (
            <Tab
              key={index}
              active={activeTab === day}
              onClick={() => setActiveTab(day)}
            >
              {day}
            </Tab>
          ))}
        </TabsContainer>

        <ExpenseList>
          {expenses.map((expense, index) => (
            <ExpenseListItem key={index}>
              <span>{expense.name}</span>
              <span>{expense.amount.toLocaleString()} 원</span>
            </ExpenseListItem>
          ))}
        </ExpenseList>
      </DailyExpenses>
    </ExpenseContainer>
  );
};

export default Expense;
