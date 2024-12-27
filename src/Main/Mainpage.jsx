import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom"
import maindodutch from "../asset/maindodutch.png"

const MainContainer = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;



const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

const MenuButton = styled.div`
  font-size: 24px;
  cursor: pointer;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  img {
    width: 250px;
    height: auto;
  }
`;

const TravelSection = styled.div`
  padding: 20px;
  text-align: center;
`;

const TravelName = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const TravelBalance = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

const RecentExpenses = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const AddExpenseButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff6f61;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const TravelManagement = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ManagementButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #333333;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PastSettlement = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SettlementItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;


const MainPage = () => {

  const navigate = useNavigate();

  const recentExpenses = [
    { name: "항목명", amount: "40,000원" },
    { name: "항목명", amount: "40,000원" },
  ];

  const pastSettlements = [
    { name: "구성원", amount: "+ 40,000원" },
    { name: "구성원", amount: "- 3,300원" },
    { name: "구성원", amount: "+ 40,000원" },
  ];

  return (
    <MainContainer>
      {/* 헤더 */}
      <Header>
        <Logo>두더치</Logo>
        <MenuButton>☰</MenuButton>
      </Header>

      {/* Main Image */}
      <ImageContainer>
        <img src={maindodutch} alt="두더지 이미지" />
      </ImageContainer> 

      {/* 여행 정보 */}
      <TravelSection onClick={ () => {navigate(`/travel/detail/${tripId}`)}}>
        <TravelName>여행명</TravelName>
        <TravelBalance>잔액 600,000원</TravelBalance>
      </TravelSection>

      {/* 최근 지출 */}
      <RecentExpenses>
        <SectionHeader onClick={ () =>  {navigate(`/expense/${tripId}`)}}>
          <span>최근 지출</span>
          <span>›</span>
        </SectionHeader>
        {recentExpenses.map((expense, index) => (
          <ExpenseItem key={index}>
            <span>{expense.name}</span>
            <span>{expense.amount}</span>
          </ExpenseItem>
        ))}
        <AddExpenseButton onClick={ () =>  {navigate(`/expAdd/${tripId}`)}} >+ 지출 추가</AddExpenseButton>
      </RecentExpenses>

      {/* 여행 관리 */}
      <TravelManagement>
        <SectionHeader onClick={ () =>  {navigate(`/tripMain`)}}>
          <span>여행 관리</span>
          <span>›</span>
        </SectionHeader>
        <ManagementButton onClick={ () =>  {navigate(`/trip`)}}>
          <span>새로운 여행 계획</span>
          <span>+</span>
        </ManagementButton>
      </TravelManagement>

      {/* 지난 정산 */}
      <PastSettlement>
        <SectionHeader  onClick={ () =>  {navigate(`/`)}}> {/*전체 정산내역 출력 페이지 연결} */}
          <span>지난 정산</span>
          <span>›</span>
        </SectionHeader>
        {pastSettlements.map((settlement, index) => (
          <SettlementItem key={index}>
            <span>{settlement.name}</span>
            <span>{settlement.amount}</span>
          </SettlementItem>
        ))}
      </PastSettlement>
    </MainContainer>
  );
};

export default MainPage;