import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import maindodutch from "../asset/maindodutch.png";
import newTravelPlanIcon from "../asset/newtravplan.png";

const MainPage = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [recentExpenses, setRecentExpenses] = useState([]);
  const [pastSettlements, setPastSettlements] = useState([]);
  const [remainingCost, setRemainingCost] = useState(0);

  useEffect(() => {
    // 지난 정산 (in 여행과 관련 없는 최근 정산 목록 조회) -> 이거 홍엽이 다시 수정한다 그래서 리해야함
    const fetchPastSettlements = async () => {
      try {
        const response = await axiosInstance.get("/dutch");
        const dutchData = response.data.data.dutch;

        // 상위 2개 추출
        setPastSettlements(dutchData.slice(0, 2));
      } catch (error) {
        console.error("Error fetching past settlements:", error);
      }
    };

    // 최근 지출 (In 여행 날짜별 전체 지출 조회)
    const fetchRecentExpenses = async () => {
      try {
        const response = await axiosInstance.get(`/trip/${tripId}/expense/date`);
        const expenses = response.data.data.expenseByDate;

        // 내림차순 정렬 후 상위 3개
        const recent = expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
        setRecentExpenses(recent);
      } catch (error) {
        console.error("Error fetching recent expenses:", error);
      }
    };

    // 잔액 (In 전체 지출)
    const fetchRemainingCost = async () => {
      try {
        const response = await axiosInstance.get(`/trip/${tripId}/expense`);
        setRemainingCost(response.data.data.remainingCost); // 잔액만 저장
      } catch (error) {
        console.error("Error fetching remaining cost:", error);
      }
    };
    
    fetchPastSettlements();
    fetchRecentExpenses();
    fetchRemainingCost ();
  }, [tripId]);  



  return (
    <>
      <Header>
        <Logo>두더치</Logo>
        <MenuButton>☰</MenuButton>
      </Header>

      <ImageContainer>
        <img src={maindodutch} alt="두더지 이미지" />
      </ImageContainer>

      <TravelSection onClick={() => navigate(`/travel/detail/${tripId}`)}>
        <TravelName>여행명</TravelName>
        <TravelBalance>잔액 {remainingCost.toLocaleString()} 원</TravelBalance>
      </TravelSection>

      <RecentExpenses>
        <SectionHeader onClick={() => navigate(`/expense/${tripId}`)}>
          <span>최근 지출</span>
          <span>›</span>
        </SectionHeader>
        {recentExpenses.length > 0 ? (
          recentExpenses.map((expense, index) => (
            <ExpenseItem key={index}>
              <span>Payer ID: {expense.payerId}</span>
              <span>{expense.perCost.toLocaleString()} 원</span>
            </ExpenseItem>
          ))
        ) : (
          <p>최근 지출 데이터가 없습니다.</p>
        )}
        <AddExpenseButton onClick={() => navigate(`/expAdd/${tripId}`)}>
          + 지출 추가
        </AddExpenseButton>
      </RecentExpenses>

      <TravelManagement>
        <SectionHeader onClick={() => navigate(`/tripMain`)}>
          <span>여행 관리</span>
          <span>›</span>
        </SectionHeader>
        <NewTravelPlanImage
          src={newTravelPlanIcon}
          alt="새로운 여행 계획"
          onClick={() => navigate(`/trip`)}
        />
      </TravelManagement>

      <PastSettlement>
        <SectionHeader onClick={() => navigate(`/`)}>
          <span>지난 정산</span>
          <span>›</span>
        </SectionHeader>
        {pastSettlements.length > 0 ? (
          pastSettlements.map((settlement, index) => (
            <SettlementItem key={index}>
              <span>Payer ID: {settlement.payerId}</span>
              <span>
                {settlement.perCost > 0 ? "+" : ""}
                {settlement.perCost.toLocaleString()} 원
              </span>
            </SettlementItem>
          ))
        ) : (
          <p>지난 정산 데이터가 없습니다.</p>
        )}
      </PastSettlement>
    </>
  );
};

export default MainPage;


const Header = styled.div`
  width: 100%;
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
  width: 70%;
  display: flex;
  justify-content: center;
  margin-top: 20px;

  img {
    width: 250px;
    height: auto;
  }
`;

const TravelSection = styled.div`
  width: 100%;
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
  width: 100%;
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
  background-color: #ff5234;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 16px;
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
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const NewTravelPlanImage = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 10px;
`;

const PastSettlement = styled.div`
  width: 100%;
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
