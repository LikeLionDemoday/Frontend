import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../api/axios";
import TransactionCard from "../Components/TransactionCard";

const CalTotal = () => {
  const navigate = useNavigate();
  const [settlements, setSettlements] = useState([]);
  const [selectedSettlement, setSelectedSettlement] = useState(null);

  // 최근 정산 목록 조회
  const fetchRecentSettlements = async () => {
    try {
      const response = await axiosInstance.get("/dutch");
      setSettlements(response.data.data.dutch.slice(0, 5)); // 상위 5개만 가져오기
    } catch (error) {
      console.error("Error fetching settlement list:", error);
    }
  };

  // 정산 상태 변경 (토글 ON/OFF)
  const updateSettlementStatus = async (tripId, dutchId, isCompleted) => {
    try {
      await axiosInstance.patch(`/trip/${tripId}/dutch/${dutchId}`, {
        isCompleted: isCompleted,
      });
      fetchRecentSettlements(); // 변경 후 목록 새로고침
    } catch (error) {
      console.error("Error updating settlement status:", error);
    }
  };

  // 정산 세부 내역 조회
  const fetchSettlementDetails = async (tripId, dutchId) => {
    try {
      const response = await axiosInstance.get(`/trip/${tripId}/dutch/${dutchId}`);
      setSelectedSettlement(response.data.data);
    } catch (error) {
      console.error("Error fetching settlement details:", error);
    }
  };

  // 정산 계산 요청
  const calculateSettlements = async (tripId) => {
    try {
      const response = await axiosInstance.post(`/trip/${tripId}/dutch/calculate`);
      console.log("Settlement Calculation Result:", response.data.data);
      fetchRecentSettlements(); // 계산 후 목록 새로고침
    } catch (error) {
      console.error("Error calculating settlements:", error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchRecentSettlements();
  }, []);

  // 토글 상태 변경 핸들러
  const handleToggleChange = (tripId, dutchId, currentStatus) => {
    updateSettlementStatus(tripId, dutchId, !currentStatus);
  };

  // 카드 클릭 핸들러 (세부 내역 조회)
  const handleCardClick = (tripId, dutchId) => {
    fetchSettlementDetails(tripId, dutchId);
  };

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate(`/expense`)}>←</BackButton>
        <Title>정산 내역</Title>
      </Header>
      <TransactionCardWrapper>
        {settlements.map((settlement) => (
          <TransactionCard
            key={settlement.id}
            name={settlement.payeeName}
            amount={settlement.perCost}
            date={`${settlement.startDate} - ${settlement.endDate}`}
            transactions={[
              { from: "나", to: settlement.payeeName, amount: -settlement.perCost },
              { from: settlement.payeeName, to: "나", amount: settlement.perCost },
            ]}
            isToggleOn={settlement.isCompleted}
            onToggleChange={() =>
              handleToggleChange(settlement.tripId, settlement.id, settlement.isCompleted)
            }
            onCardClick={() => handleCardClick(settlement.tripId, settlement.id)}
          />
        ))}
      </TransactionCardWrapper>
    </>
  );
};

export default CalTotal;

// Styled Components

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 16px;
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

const TransactionCardWrapper = styled.div`
  width: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
