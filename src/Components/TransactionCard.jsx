import React from "react";
import styled from "styled-components";
import toggleOn from "../assets/toggleon.svg";
import toggleOff from "../assets/toggleoff.svg";
import arrowIcon from "../assets/arrow.svg";

const TransactionCard = ({
  name,
  amount,
  date,
  transactions,
  isToggleOn,
  onToggleChange,
  isExpanded,
  onCardClick,
}) => {
  return (
    <CardContainer onClick={onCardClick} isExpanded={isExpanded}>
      <Header>
        <Info>
          <Title isInactive={!isToggleOn}>보낼 금액</Title>
          <Name isInactive={!isToggleOn}>{name}</Name>
        </Info>
        <Amount isInactive={!isToggleOn}>{amount.toLocaleString()} 원</Amount>
      </Header>
      {isExpanded && (
        <>
          <Divider /> {/* 날짜 위의 선 */}
          <Content>
            <Date isInactive={!isToggleOn}>{date}</Date>
            <Toggle
              onClick={(e) => {
                e.stopPropagation(); // 카드 확장/축소 방지
                onToggleChange();
              }}
            >
              <img src={isToggleOn ? toggleOn : toggleOff} alt="Toggle" />
            </Toggle>
          </Content>
          <TransactionList>
            {transactions.map((transaction, index) => (
              <Transaction key={index} isInactive={!isToggleOn}>
                <span>{transaction.from}</span>
                <Arrow src={arrowIcon} alt="arrow" />
                <span>{transaction.to}</span>
                <AmountText>
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount.toLocaleString()}
                </AmountText>
              </Transaction>
            ))}
          </TransactionList>
        </>
      )}
    </CardContainer>
  );
};

export default TransactionCard;

// Styled Components

const CardContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  height: ${(props) => (props.isExpanded ? "auto" : "100px")}; /* 접힌 상태에서 높이 고정 */
  padding: 16px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  cursor: pointer;
  overflow: hidden; 
  transition: height 0.3s ease; 
`;


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 12px;
  color: ${(props) => (props.isInactive ? "#ADADAD" : "#888")};
  margin-top: 20px;
  margin-left: 15px;
`;

const Name = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 14px;
  color: ${(props) => (props.isInactive ? "#ADADAD" : "#000")};
`;

const Amount = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-top: 38px;
  margin-right: 15px;
  color: ${(props) => (props.isInactive ? "#ADADAD" : "#000")};
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Date = styled.span`
  font-size: 12px;
  color: ${(props) => (props.isInactive ? "#ADADAD" : "#888")};
  margin-left: 15px
`;

const Toggle = styled.div`
  cursor: pointer;

  img {
    width: 50px;
    height: 30px;
  }
  margin-right: 15px
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 25px 0;
`;

const TransactionList = styled.div`
  margin-top: 10px;
`;

const Transaction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  margin-left: 15px;
  font-size: 14px;
  color: ${(props) => (props.isInactive ? "#ADADAD" : "#000")};
`;

const Arrow = styled.img`
  margin: 0 5px;
  width: 50px;
  height: 50px;
`;

const AmountText = styled.span`
  font-size: 14px;
  margin-right: 15px
`;
