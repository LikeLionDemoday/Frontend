import React from "react";
import styled from "styled-components";

const ExpBS = ({ initialAmount, categories }) => {
  const totalUsed = categories.reduce((sum, category) => sum + category.cost, 0);
  const balance = initialAmount - totalUsed;

  const maxBarLength = 180; // 최대 바 길이(px)

  const categoriesWithWidth = categories.map((category) => ({
    ...category,
    barLength: Math.min((category.cost / initialAmount) * maxBarLength, maxBarLength),
  }));

  const balanceBarLength = Math.min((balance / initialAmount) * maxBarLength, maxBarLength);

  // 숙소 + 교통비 계산
  const 숙소교통비 = categories
    .filter((cat) => cat.expenseCategory === "숙소" || cat.expenseCategory === "교통")
    .reduce((sum, cat) => sum + cat.cost, 0);

  return (
    <Wrapper>
      <BalanceSection>
        <BalanceTitle>총 지출액</BalanceTitle>
        <BalanceAmount>{totalUsed.toLocaleString()} 원</BalanceAmount>
        <ProgressBarWrapper>
          <ProgressBarContainer>
            {categoriesWithWidth.map((category, index) => (
              <ProgressBarSegment
                key={index}
                color={category.color}
                width={`${(category.cost / initialAmount) * 100}%`}
              />
            ))}
            <ProgressBarSegment color="#FF5234" width={`${(balance / initialAmount) * 100}%`} />
          {/* 눈금 추가 */}
          <Tick style={{ left: `${(숙소교통비 / initialAmount) * 100}%` }} /> 
          <Tick style={{ left: `${(totalUsed / initialAmount) * 100}%` }} /> 
          <Tick style={{ left: `100%` }} /> 
          
          </ProgressBarContainer>
          <ProgressLabels>
            {/* 각 텍스트를 정확히 배치 */}
            <Label style={{ left: `${(숙소교통비 / initialAmount) * 100}%` }}>
              {숙소교통비.toLocaleString()}
            </Label>
            <Label style={{ left: `${(totalUsed / initialAmount) * 100}%` }}>
              {totalUsed.toLocaleString()}
            </Label>
            <Label style={{ left: `100%` }}>{initialAmount.toLocaleString()}</Label>
          </ProgressLabels>
        </ProgressBarWrapper>
      </BalanceSection>

      <CategoryList>
        {categoriesWithWidth.map((category, index) => (
          <CategoryItem key={index}>
            <CategoryLabel>{category.expenseCategory}</CategoryLabel>
            <CategoryProgressBar>
              <ProgressBarFill
                color={category.color}
                width={`${category.barLength}px`}
              />
            </CategoryProgressBar>
            <CategoryAmount>{category.cost.toLocaleString()}</CategoryAmount>
          </CategoryItem>
        ))}
        <CategoryItem>
          <CategoryLabel>잔액</CategoryLabel>
          <CategoryProgressBar>
            <ProgressBarFill color="#FF5234" width={`${balanceBarLength}px`} />
          </CategoryProgressBar>
          <CategoryAmount>{balance.toLocaleString()}</CategoryAmount>
        </CategoryItem>
      </CategoryList>
    </Wrapper>
  );
};

export default ExpBS;

// 스타일 컴포넌트 정의
const Wrapper = styled.div`
  width: 95%;
  flex-shrink: 0;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 0 auto; 
  display: flex;
  flex-direction: column;
`;

const BalanceSection = styled.div`
  text-align: left;
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
  position: relative;
`;

const Tick = styled.div`
  position: absolute;
  bottom: -2px; 
  width: 1px;
  height: 10px;
  background-color: #000; 
  z-index: 10;
  transform: translateX(-50%);
`;

const ProgressBarSegment = styled.div`
  height: 100%;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
`;

const ProgressLabels = styled.div`
  position: relative;
  width: 100%;
  height: 15px;
`;

const Label = styled.span`
  position: absolute;
  font-size: 9px;
  color: #141414;
  transform: translateX(-100%);
`;

const CategoryList = styled.div`
  margin-top: 20px;
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 16px;
`;

const CategoryLabel = styled.div`
  font-size: 14px;
  color: #141414;
  flex: 1;
`;

const CategoryProgressBar = styled.div`
  flex: 2;
  height: 24px;
  border-radius: 12px;
  background-color: #e0e0e0;
  overflow: hidden;
  margin: 0 10px;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
`;

const CategoryAmount = styled.div`
  font-size: 14px;
  color: #141414;
  text-align: right;
  flex: 1;
`;
