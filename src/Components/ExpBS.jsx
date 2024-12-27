import React from "react";
import styled from "styled-components";

const ExpBS = ({ initialAmount, categories }) => {
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
      color: "#FF5234",
      width: (balance / initialAmount) * totalBarLength,
    });
  }

  return (
    <Container>
      <BalanceSection>
        <BalanceTitle>잔액</BalanceTitle>
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
            <span>(숙소 + 교통비)</span>
            <span>(총 지출액)</span>
            <span>(초기 설정 금액)</span>
          </ProgressLabels>
        </ProgressBarWrapper>
      </BalanceSection>

      <CategoryList>
        {categories.map((category, index) => (
          <CategoryItem key={index}>
            <CategoryLabel>
              <CategoryColor color={category.color} />
              <span>{category.name}</span>
            </CategoryLabel>
            <span>{category.amount.toLocaleString()} 원</span>
          </CategoryItem>
        ))}
        <CategoryItem>
          <CategoryLabel>
            <CategoryColor color="#FF5234" />
            <span>잔액</span>
          </CategoryLabel>
          <span>{balance.toLocaleString()} 원</span>
        </CategoryItem>
      </CategoryList>
    </Container>
  );
};

export default ExpBS;

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
`;

const BalanceSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const BalanceTitle = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
`;

const BalanceAmount = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #141414;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const ProgressBarContainer = styled.div`
  display: flex;
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
  width: ${(props) => props.width};
`;

const ProgressLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
  width: 100%;
`;

const CategoryList = styled.div`
  margin-top: 20px;
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
`;

const CategoryLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CategoryColor = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
