import React, { useState } from "react";
import styled from "styled-components";
import backButtonIcon from "../assets/backbutton.svg";
import calButtonIcon from "../assets/calbutton.svg";
import { useNavigate } from "react-router-dom";
import ExpBS from "../Components/ExpBS"; // ExpBS 컴포넌트 import

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

const AddExpenseButton = styled.button`
  display: flex;
  width: 331px;
  padding: 16px 106px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  background: var(--main-red, #FF5234);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin: 40px auto; /* 버튼 간격 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #e04b30;
  }
`;

const Expense = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/travel/detail/${tripId}`);
  };

  const handleAddExpense = () => {
    navigate("/expAdd");
  };


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
          <SettleButton onClick={() => navigate(`/calculate/detail/${tripId}`)}>
            <ButtonText>정산하기</ButtonText>
            <ButtonIcon src={calButtonIcon} alt="정산하기 화살표" />
          </SettleButton>
        </TitleSection>
      </Header>

      {/* ExpBS 컴포넌트 사용 */}
      <ExpBS
  initialAmount={1000000}
  categories={[
    { name: "숙소", amount: 200000, color: "#d9d9d9" },
    { name: "교통", amount: 100000, color: "#c0c0c0" },
    { name: "식사", amount: 150000, color: "#999999" },
    { name: "활동", amount: 50000, color: "#666666" },
    { name: "기타", amount: 50000, color: "#333333" },
  ]}
/>


      {/* 지출 추가하기 버튼 */}
      <AddExpenseButton onClick={handleAddExpense}>
        지출 추가하기
      </AddExpenseButton>

      {/* DailyExpenses */}
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
