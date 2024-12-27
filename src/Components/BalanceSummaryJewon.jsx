import React from "react";
import styled from "styled-components";

const SummaryContainer = styled.div`
  //width: 331px;
  height: 102px; 
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const BalanceSection = styled.div`
  margin-bottom: 20px;
`;

const BalanceTitle = styled.p`
  font-size: 10px;
  color: #666;
  margin-bottom: 8px;
`;

const BalanceAmount = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #141414;
  margin: 0;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #e0e0e0;
  width: 100%;
  margin: 10px 0;
`;

const ProgressBarSegment = styled.div`
  height: 100%;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width || "0%"};
`;

const ProgressLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
  width: 100%;
`;

const BalanceSummaryJewon = ({ initialAmount, categories }) => {
  const totalUsed = categories.reduce((sum, category) => sum + category.amount, 0);
  const balance = initialAmount - totalUsed;

  const totalBarLength = 100; // 진행 바의 총 길이 (%)
  const segments = categories.map((category) => ({
    ...category,
    width: (category.amount / initialAmount) * totalBarLength,
  }));

  if (balance >= 0) {
    segments.push({
      name: "잔액",
      amount: balance,
      color: "#ff6f61",
      width: (balance / initialAmount) * totalBarLength,
    });
  }

  return (
    <SummaryContainer>
      <BalanceSection>
        <BalanceTitle>총 지출액</BalanceTitle>
        <BalanceAmount>
          {balance.toLocaleString()} 원
        </BalanceAmount>
        <ProgressBarWrapper>
          <ProgressBarContainer>
            {segments.map((segment, index) => (
              <ProgressBarSegment
                key={index}
                color={segment.color}
                width={`${segment.width}%`}
              />
            ))}
          </ProgressBarContainer>
          <ProgressLabels>
            <span>(숙소 + 교통비)</span>
            <span>(총 지출액)</span>
            <span>(초기 설정 금액)</span>
          </ProgressLabels>
        </ProgressBarWrapper>
      </BalanceSection>
    </SummaryContainer>
  );
};

export default BalanceSummaryJewon;
