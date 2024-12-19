import React, { useState } from "react";
import styled from "styled-components";
import backButtonIcon from "../assets/backbutton.svg";

// 전체 컨테이너
const ExpenseContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const BalanceSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const BalanceAmount = styled.p`
  font-size: 18px;
  color: #666;
`;

const BalanceNumber = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

const ProgressBarContainer = styled.div`
  background-color: #e0e0e0;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 0;
`;

const ProgressBar = styled.div`
  background-color: ${(props) => props.color || "#4caf50"};
  height: 100%;
  width: ${(props) => props.width || "0%"};
`;

const ExpenseItemsContainer = styled.div`
  margin: 20px 0;
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CategoryColor = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
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

  const categories = [
    { name: "숙소", amount: 40000, color: "#ff6f61" },
    { name: "교통", amount: 40000, color: "#ffa600" },
    { name: "식사", amount: 40000, color: "#bc5090" },
    { name: "활동", amount: 40000, color: "#58508d" },
    { name: "기타", amount: 40000, color: "#003f5c" },
    { name: "잔액", amount: 1000000, color: "#dd5182" },
  ];

  const days = ["전체", "24일", "25일", "26일", "27일", "28일"];

  const expenses = Array(10).fill({ name: "항목명", amount: 40000 });

  return (
    <ExpenseContainer>
      <Header>
        <BackButton src={backButtonIcon} alt="뒤로가기" />
        <Title>전체 지출</Title>
        <button>정산하기</button>
      </Header>

      <BalanceSection>
        <BalanceAmount>잔액</BalanceAmount>
        <BalanceNumber>130,000 원</BalanceNumber>
        <ProgressBarContainer>
          <ProgressBar color="#ff6f61" width="20%" />
        </ProgressBarContainer>
        <p>(숙소 + 교통비) (총 지출액)</p>
      </BalanceSection>

      <ExpenseItemsContainer>
        {categories.map((category, index) => (
          <ExpenseItem key={index}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CategoryColor color={category.color} />
              <span>{category.name}</span>
            </div>
            <span>{category.amount.toLocaleString()} 원</span>
          </ExpenseItem>
        ))}
      </ExpenseItemsContainer>

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
