import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../api/axios";
import TransactionCard from "../Components/TransactionCard";

const CalTotal = () => {
  const navigate = useNavigate();
  const [settlements, setSettlements] = useState([]);

  // 최근 정산 목록 조회
  const fetchRecentSettlements = async () => {
    try {
      const response = await axiosInstance.get("/dutch");
      const dutchData = response.data.data.dutch.slice(0, 5); // 상위 5개만 가져오기
      const mappedSettlements = dutchData.map((item) => ({
        id: item.id,
        payerName: item.payer.payerNickName,
        payeeName: item.payee.payeeNickName,
        perCost: item.perCost,
        isCompleted: item.isCompleted,
      }));
      setSettlements(mappedSettlements);
    } catch (error) {
      console.error("Error fetching settlement list:", error);
    }
  };

  // 정산 상태 변경 (토글 ON/OFF)
  const updateSettlementStatus = async (dutchId, isCompleted) => {
    try {
      await axiosInstance.patch(`/dutch/${dutchId}`, {
        isCompleted: isCompleted,
      });
      fetchRecentSettlements(); // 변경 후 목록 새로고침
    } catch (error) {
      console.error("Error updating settlement status:", error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchRecentSettlements();
  }, []);

  // 토글 상태 변경 핸들러
  const handleToggleChange = (dutchId, currentStatus) => {
    updateSettlementStatus(dutchId, !currentStatus);
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
            date={`정산 ID: ${settlement.id}`}
            transactions={[
              { from: settlement.payerName, to: settlement.payeeName, amount: settlement.perCost },
              { from: settlement.payeeName, to: settlement.payerName, amount: -settlement.perCost },
            ]}
            isToggleOn={settlement.isCompleted}
            onToggleChange={() =>
              handleToggleChange(settlement.id, settlement.isCompleted)
            }
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
