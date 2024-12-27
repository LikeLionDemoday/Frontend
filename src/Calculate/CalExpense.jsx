import React, { useState } from "react";
import styled from "styled-components";
import toggleIcon from "../assets/toggle.svg";

// 전체 컨테이너
const Container = styled.div`
  padding: 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

// 제목 스타일링
const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 20px;
`;

// 정산 카드 스타일링
const Card = styled.div`
  width: 343px;
  height: ${(props) => (props.expanded ? "186px" : "111px")};
  flex-shrink: 0;
  background-color: ${(props) => (props.completed ? "var(--Grayscale-3, #ADADAD)" : "#F4F4F4")};
  border: ${(props) => (props.completed ? "none" : "1px solid #e0e0e0")};
  padding: 20px;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

// 카드의 헤더 (이름, 날짜, 금액, 토글 아이콘)
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => (props.expanded ? "10px" : "0")};
`;

// 이름과 날짜를 담는 컨테이너
const NameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// 이름 스타일링
const Name = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

// 날짜 스타일링
const Date = styled.span`
  font-size: 12px;
  color: #888;
`;

// 금액 스타일링
const Amount = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

// 토글 아이콘 스타일링
const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;
  transform: ${(props) => (props.expanded ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;

// 카드가 확장되었을 때의 상세 정보 컨테이너
const Details = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e0e0e0;
  color: #666;
`;

// 상세 정보 아이템 (보낸 사람, 받은 사람, 금액)
const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
  color: #888;
`;

const CalDetail = () => {
  // 현재 확장된 카드의 인덱스를 관리하는 상태
  const [expandedCard, setExpandedCard] = useState(null);

  // 카드 데이터 배열
  const cards = [
    { name: "김김김", date: "2024.12.25", type: "보낼 금액", amount: 1234, completed: false },
    { name: "이이이", date: "2024.12.25", type: "받을 금액", amount: 1234, completed: false },
    {
      name: "박박박",
      date: "2024.12.25",
      type: "보낼 금액",
      amount: 1234,
      completed: false,
      details: [
        { from: "나", to: "박박박", amount: -2345 },
        { from: "박박박", to: "나", amount: 1111 },
      ],
    },
    { name: "이이이", date: "2024.12.25", type: "받을 금액", amount: 1234, completed: true },
    { name: "이이이", date: "2024.12.25", type: "받을 금액", amount: 1234, completed: true },
  ];

  // 카드 확장 상태를 토글하는 함수
  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <Container>
      {/* 제목 표시 */}
      <Title>정산 내역</Title>
      {/* 카드 리스트 렌더링 */}
      {cards.map((card, index) => (
        <Card
          key={index}
          completed={card.completed}
          expanded={expandedCard === index}
          onClick={() => toggleCard(index)}
        >
          <CardHeader expanded={expandedCard === index}>
            <NameAndDate>
              {/* 카드의 이름과 날짜 */}
              <Name>{card.name}</Name>
              <Date>{card.date}</Date>
            </NameAndDate>
            {/* 카드의 금액 */}
            <Amount>{card.amount.toLocaleString()}</Amount>
            {/* 토글 아이콘 */}
            <ArrowIcon
              src={toggleIcon}
              alt="toggle icon"
              expanded={expandedCard === index}
            />
          </CardHeader>
          {/* 카드 확장 시 상세 정보 표시 */}
          {expandedCard === index && card.details && (
            <Details>
              {card.details.map((detail, i) => (
                <DetailItem key={i}>
                  <span>{detail.from} -&gt; {detail.to}</span>
                  <span>{detail.amount.toLocaleString()}</span>
                </DetailItem>
              ))}
            </Details>
          )}
        </Card>
      ))}
    </Container>
  );
};

export default CalDetail;

