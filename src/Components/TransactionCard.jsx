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
          <Divider />
          <Content>
            <Date isInactive={!isToggleOn}>{date}</Date>
            <Toggle onClick={(e) => {
              e.stopPropagation(); // 카드 확장/축소 방지
              onToggleChange();
            }}>
              <img src={isToggleOn ? toggleOn : toggleOff} alt="Toggle" />
            </Toggle>
          </Content>
          <Divider />
          <TransactionList>
            {transactions.map((transaction, index) => (
              <Transaction key={index} isInactive={!isToggleOn}>
                <span>{transaction.from}</span>
                <Arrow src={arrowIcon} alt="arrow" />
                <span>{transaction.to}</span>
                <AmountText>
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount.toLocaleString()} 원
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

const CardContainer = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: ${(props) => (props.isExpanded ? "16px" : "8px 16px")};
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  cursor: pointer;
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
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-top: 4px;
  color: ${(props) => (props.isInactive ? "#ADADAD" : "#000")};
`;

const Amount = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.isInactive ? "#ADADAD" : "#000")};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 16px 0;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Date = styled.span`
  font-size: 12px;
  color: ${(props) => (props.isInactive ? "#ADADAD" : "#888")};
`;

const Toggle = styled.div`
  cursor: pointer;

  img {
    width: 40px;
    height: 20px;
  }
`;

const TransactionList = styled.div`
  margin-top: 16px;
`;

const Transaction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: ${(props) => (props.isInactive ? "#ADADAD" : "#000")};
`;

const Arrow = styled.img`
  margin: 0 8px;
  width: 50px;
  height: 50px;
`;

const AmountText = styled.span`
  font-size: 14px;
  font-weight: bold;
`;
