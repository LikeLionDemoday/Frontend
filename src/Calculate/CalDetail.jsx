import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TransactionCard from "../Components/TransactionCard";
import axiosInstance from "../api/axios";

const CalDetail = ({ memberId }) => {
  const navigate = useNavigate();
  const { tripId } = useParams(); 

  const [isExpanded, setIsExpanded] = useState(false);
  const [transactions, setTransactions] = useState([]); 
  const [selectedDutchId, setSelectedDutchId] = useState(null); 

  // 정산 목록 조회 API 호출
  const fetchSettlementList = async () => {
    try {
      const response = await axiosInstance.get(`/trip/${tripId}/dutch`);
      const allDutchData = response.data.data.dutch;

      // 내 ID를 기준으로 필터링????
      const filteredTransactions = allDutchData
        .map((item) => {
          if (item.payer.payerId.toString() === memberId) {
            // 내가 돈을 보내야 하는 경우
            return {
              id: item.id,
              name: item.payee.payeeNickName,
              amount: item.perCost,
              isCompleted: item.isCompleted,
              type: "send", // 보낼 금액
            };
          } else if (item.payee.payeeId.toString() === memberId) {
            // 내가 돈을 받아야 하는 경우
            return {
              id: item.id,
              name: item.payer.payerNickName,
              amount: item.perCost,
              isCompleted: item.isCompleted,
              type: "receive", // 받을 금액
            };
          }
          return null; // 빼야대나
        })
        .filter(Boolean); 

      setTransactions(filteredTransactions); 
    } catch (error) {
      console.error("Error fetching settlement list:", error);
    }
  };

  // 정산 세부 내역 조회 API 호출
  const fetchSettlementDetails = async (dutchId) => {
    try {
      const response = await axiosInstance.get(`/trip/${tripId}/dutch/${dutchId}`);
      console.log("Settlement Details:", response.data.data);
    } catch (error) {
      console.error("Error fetching settlement details:", error);
    }
  };

  // 정산 완료 표기 API 호출 (토글 ON)
  const markSettlementComplete = async (dutchId) => {
    try {
      await axiosInstance.patch(`/trip/${tripId}/dutch/${dutchId}`, {
        isCompleted: true,
      });
      fetchSettlementList(); // 리 로드
    } catch (error) {
      console.error("Error marking settlement complete:", error);
    }
  };

  // 정산 취소 표기 API 호출 (토글 OFF)
  const cancelSettlement = async (dutchId) => {
    try {
      await axiosInstance.patch(`/trip/${tripId}/dutch/${dutchId}`, {
        isCompleted: false,
      });
      fetchSettlementList(); // 리 로드
    } catch (error) {
      console.error("Error cancelling settlement:", error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchSettlementList();
  }, [tripId, memberId]);

  const handleToggleChange = (dutchId, currentStatus) => {
    if (currentStatus) {
      cancelSettlement(dutchId);
    } else {
      markSettlementComplete(dutchId);
    }
  };

  const handleCardClick = (dutchId) => {
    setSelectedDutchId(dutchId);
    setIsExpanded(!isExpanded);
    fetchSettlementDetails(dutchId); // 세부 내역 로드
  };

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate(`/expense/${tripId}`)}>←</BackButton>
        <Title>정산 내역</Title>
      </Header>
      <TransactionCardWrapper>
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            name={transaction.name}
            amount={transaction.amount}
            date={`정산 ID: ${transaction.id}`}
            transactions={[
              transaction.type === "send"
                ? { from: "나", to: transaction.name, amount: transaction.amount }
                : { from: transaction.name, to: "나", amount: transaction.amount },
            ]}
            isToggleOn={transaction.isCompleted}
            isExpanded={isExpanded && selectedDutchId === transaction.id}
            onToggleChange={() =>
              handleToggleChange(transaction.id, transaction.isCompleted)
            }
            onCardClick={() => handleCardClick(transaction.id)}
          />
        ))}
      </TransactionCardWrapper>
    </>
  );
};

export default CalDetail;

// 스타일 컴포넌트 정의
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
