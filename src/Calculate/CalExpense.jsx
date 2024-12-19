import React, { useState } from "react";
import styled from "styled-components";
import toggleIcon from "../assets/toggle.svg";

const CalculateContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const UserCard = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 343px;
  flex-shrink: 0;
  transition: max-height 0.3s ease;
  overflow: hidden;
  max-height: ${(props) => (props.expanded ? "500px" : "111px")};
  position: relative;
`;

const UserName = styled.span`
  font-size: 14px;
  color: #999;
  margin-bottom: 10px;
`;

const AmountSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AmountText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;
  transform: ${(props) => (props.expanded ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;

const DetailSection = styled.div`
  background-color: #ffffff;
  padding: 10px 20px;
  margin-top: 10px;
  border-top: 1px solid #e0e0e0;
  color: #666;
`;

const CalExpense = () => {
  const [expandedUsers, setExpandedUsers] = useState([]);

  const users = [
    { name: "김김김", type: "보낼 금액", amount: 1234, details: [] },
    { name: "이이이", type: "받을 금액", amount: 1234, details: [] },
    {
      name: "박박박",
      type: "보낼 금액",
      amount: 1234,
      details: [
        { from: "나", to: "박박박", amount: -2345 },
        { from: "박박박", to: "나", amount: 1111 },
      ],
    },
  ];

  const toggleUserCard = (userName) => {
    setExpandedUsers((prev) =>
      prev.includes(userName)
        ? prev.filter((name) => name !== userName)
        : [...prev, userName]
    );
  };

  return (
    <CalculateContainer>
      <Title>정산하기</Title>
      {users.map((user, index) => (
        <div key={index}>
          <UserCard
            onClick={() => toggleUserCard(user.name)}
            expanded={expandedUsers.includes(user.name)}
          >
            <UserName>{user.name}</UserName>
            <AmountSection>
              <AmountText>{user.type}</AmountText>
              <AmountText>{user.amount.toLocaleString()}</AmountText>
              <ArrowIcon
                src={toggleIcon}
                alt="toggle icon"
                expanded={expandedUsers.includes(user.name)}
              />
            </AmountSection>
          </UserCard>
          {expandedUsers.includes(user.name) && user.details && (
            <DetailSection>
              {user.details.map((detail, i) => (
                <div key={i}>
                  {detail.from} -&gt; {detail.to} {detail.amount.toLocaleString()}
                </div>
              ))}
            </DetailSection>
          )}
        </div>
      ))}
    </CalculateContainer>
  );
};

export default CalExpense;
