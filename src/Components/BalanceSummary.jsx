import React from "react";
import styled from "styled-components";

const SummaryContainer = styled.div`
  width: 331px;
  height: 176px;
  flex-shrink: 0;
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
`;

const BalanceSection = styled.div`
  margin-bottom: 20px;
`;

const BalanceTitle = styled.p`
  font-size: 12px;
  color: #7a7a7a;
  margin-bottom: 8px;
`;

const BalanceAmount = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #141414;
  margin: 0;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  overflow: visible;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  border-radius: 12px;
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

const BalanceSummary = ({ initialAmount, categories }) => {
  const totalUsed = categories.reduce((sum, category) => sum + category.amount, 0); // 전체 사용 금액
  const balance = initialAmount - totalUsed; // 잔액

  const 숙소교통비 = categories
    .filter((cat) => cat.name === "숙소" || cat.name === "교통")
    .reduce((sum, cat) => sum + cat.amount, 0);

  const totalBarLength = 100; // 진행 바의 총 길이 (%)
  const segments = categories.map((category) => ({
    ...category,
    width: (category.amount / initialAmount) * totalBarLength,
  }));

  if (balance >= 0) {
    segments.push({
      name: "잔액",
      amount: balance,
      color: "#FF5234",
      width: (balance / initialAmount) * totalBarLength,
    });
  }

  return (
    <SummaryContainer>
      <BalanceSection>
        <BalanceTitle>총 지출액</BalanceTitle>
        <BalanceAmount>{balance.toLocaleString()} 원</BalanceAmount>
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
            <span>{숙소교통비.toLocaleString()} 원</span> {/* 숙소 + 교통비 */}
            <span>{totalUsed.toLocaleString()} 원</span> {/* 총 지출액 */}
            <span>{initialAmount.toLocaleString()} 원</span> {/* 초기 설정 금액 */}
          </ProgressLabels>
        </ProgressBarWrapper>
      </BalanceSection>
    </SummaryContainer>
  );
};

export default BalanceSummary;
