import React from "react";
import styled from "styled-components";

const SummaryContainer = styled.div`
  //width: 331px;
  height: 102px; 
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 25px rgba(0, 0, 0, 0.1);
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

const CategoryLabel = styled.span`
  position: absolute;
  font-size: 10px;
  color: #666;
  transform: translateX(-50%);
  left: ${props => props.position}%;
  top: -20px;
  white-space: nowrap;
`;

const ProgressBarWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 0;
  margin-top: 20px;
`;

const ProgressBarContainer = styled.div`
   position: relative;
    display: flex;
    align-items: center;
    height: 10px;
    border-radius: 5px;
    overflow: visible; // 변경: 라벨이 보이도록 overflow를 visible로 설정
    background-color: #e0e0e0;
    width: 100%;
    margin: 25px 0 10px 0;
`;

const ProgressBarSegment = styled.div`
    width: ${props => props.width};
    height: 100%;
    background-color: ${props => props.color};
    position: relative; // 추가
`;

const ProgressLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
  width: 100%;

  span{
    margin-top: 10px;
  }
`;

const BalanceSummaryJewon = ({ initialAmount, categories }) => {
  const totalUsed = categories.reduce((sum, category) => sum + category.amount, 0);

    // 누적 위치 계산
    let accumulatedWidth = 0;
    const segments = categories.map((category) => {
        const width = (category.amount / initialAmount) * 100;
        const segment = {
            ...category,
            width,
            endPosition: accumulatedWidth + width // 끝 위치만 계산
        };
        accumulatedWidth += width;
        return segment;
    });

    //console.log("Segments:", segments); // 디버깅용 로그

    return (
        <SummaryContainer>
            <BalanceSection>
                <BalanceTitle>총 지출액</BalanceTitle>
                <BalanceAmount>{totalUsed.toLocaleString()} 원</BalanceAmount>
                <ProgressBarWrapper>
                    <ProgressBarContainer>
                        {segments.map((segment, index) => (
                            <React.Fragment key={index}>
                                <ProgressBarSegment
                                    color={segment.color}
                                    width={`${segment.width}%`}
                                >
                                    <CategoryLabel position={100}>
                                        {segment.name}
                                    </CategoryLabel>
                                </ProgressBarSegment>
                            </React.Fragment>
                        ))}
                    </ProgressBarContainer>
                    <ProgressLabels>
                        <span>0원</span>
                        <span>{initialAmount?.toLocaleString()}원</span>
                    </ProgressLabels>
                </ProgressBarWrapper>
            </BalanceSection>
        </SummaryContainer>
    );
};

export default BalanceSummaryJewon;
