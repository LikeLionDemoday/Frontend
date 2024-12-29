import React, { useState, useEffect } from "react";
import styled from "styled-components";
import backButtonIcon from "../assets/backbutton.svg";
import calButtonIcon from "../assets/calbutton.svg";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import ExpBS from "../Components/ExpBS";

const Expense = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const [totalAmount, setTotalAmount] = useState(0); // 총 지출 금액
  const [categories, setCategories] = useState([]); // 카테고리별 지출
  const [days, setDays] = useState([]); // 날짜별 탭
  const [expenses, setExpenses] = useState([]); // 지출 내역
  
  const navigate = useNavigate();
  const { tripId } = useParams(); // URL에서 tripId 가져오기


  // 정산 버튼 클릭 시 POST API 호출
const handleSettleCalculate = async () => {
  try {
    const response = await axiosInstance.post(`/trip/${tripId}/dutch/calculate`);

    if (response.data.isSuccess) {
      // 정산 상세 페이지 ㄱㄱㄱ
      navigate(`/calculate/detail/${tripId}`);
    }
  } catch (error) {
    if (error.response?.status === 404) {
      console.error("해당 여행을 찾을 수 없습니다.");
    } else {
      console.error("정산 계산 실패:", error);
    }
  }
};


  // 뒤로가기 버튼 클릭 핸들러
  const handleBackClick = () => {
    navigate(`/travel/detail/${tripId}`);
  };

  // 지출 추가 버튼 클릭 핸들러
  const handleAddExpense = () => {
    navigate(`/expAdd/${tripId}`);
  };

  // 전체 지출 데이터 가져오기 (총액 및 카테고리별 지출)
  const fetchTotalExpenses = async () => {
    try {
      const response = await axiosInstance.get(`/trip/${tripId}/expense`);
      const data = response.data.data;
      setTotalAmount(data.remainingCost); // 남은 금액
      setCategories(data.categories); // 카테고리별 지출
    } catch (error) {
      console.error("Error fetching total expenses:", error);
    }
  };

  // 날짜별 지출 데이터 가져오기
  const fetchDailyExpenses = async () => {
    try {
      const response = await axiosInstance.get(`/trip/${tripId}/expense/date`);
      const data = response.data.data;
      setDays(data.map((expense) => expense.date)); // 날짜 목록 생성
      setExpenses(data); // 지출 데이터 설정
    } catch (error) {
      console.error("Error fetching daily expenses:", error);
    }
  };

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    if (!tripId) {
      console.error("Error: tripId is undefined");
      return;
    }
    fetchTotalExpenses();
    fetchDailyExpenses();
  }, [tripId]);

  return (
    <>
      {/* 헤더 영역 */}
      <Header>
        <BackButtonWrapper>
          <BackButton src={backButtonIcon} alt="뒤로가기" onClick={handleBackClick} />
        </BackButtonWrapper>
        <TitleSection>
          <Title>전체 지출</Title>
          <SettleButton onClick={handleSettleCalculate}>
            <ButtonText>정산하기</ButtonText>
            <ButtonIcon src={calButtonIcon} alt="정산하기 화살표" />
          </SettleButton>
        </TitleSection>
      </Header>

      {/* ExpBS 컴포넌트 */}
      <ExpBSWrapper>
        <ExpBS initialAmount={totalAmount} categories={categories} />
      </ExpBSWrapper>

      <AddExpenseButton onClick={handleAddExpense}>지출 추가하기</AddExpenseButton>

      {/* 날짜별 지출 영역 */}
      <DailyExpenses>
        <h3>일자별 지출</h3>
        <TabsContainer>
          {days.map((day, index) => (
            <Tab
              key={index}
              active={activeTab === day}
              onClick={() => setActiveTab(day)}
            >
              {day}
            </Tab>
          ))}
        </TabsContainer>

        <ExpenseList>
          {expenses
            .filter((expense) => activeTab === "전체" || expense.date === activeTab)
            .map((expense, index) => (
              <ExpenseListItem key={index}>
                <span>{expense.title}</span>
                <span>{expense.cost.toLocaleString()} 원</span>
              </ExpenseListItem>
            ))}
        </ExpenseList>
      </DailyExpenses>
    </>
  );
};

export default Expense;

// 스타일 정의
const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const BackButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const BackButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #474747;
`;

const SettleButton = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: #888;
  font-size: 17px;
  font-weight: normal;
  cursor: pointer;
`;

const ButtonText = styled.span`
  font-size: 17px;
  color: #888;
`;

const ButtonIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const ExpBSWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  margin-top: 20px;
`;

const DailyExpenses = styled.div`
  margin-top: 30px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 6px 15px;
  justify-content: center;
  align-items: center;
  border-radius: 29px;
  border: ${(props) => (props.active ? "none" : "1px solid var(--main-gray, #F0F0F0)")};
  background: ${(props) => (props.active ? "var(--Grayscale-9, #141414)" : "#FFF")};
  color: ${(props) => (props.active ? "#FFF" : "#000")};
  display: flex;
  cursor: pointer;
`;

const ExpenseList = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ExpenseListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const AddExpenseButton = styled.button`
  display: flex;
  width: 100%;
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: var(--main-red, #FF5234);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin: 20px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #e04b30;
  }
`;