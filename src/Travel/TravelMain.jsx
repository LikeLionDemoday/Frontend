import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReactComponent as NextButton } from "../icons/rightward.svg";
import { ReactComponent as PlusButton } from "../icons/plus.svg";
import { ReactComponent as SearchButton } from "../icons/SearchRight.svg";
import { ReactComponent as Xbutton } from "../icons/Xbutton.svg";
import Sidebar from "../Components/Sidebar";
import axiosInstance from "../api/axios.js";


const TravelList = () => {
  const navigate = useNavigate();
  const [travelList, setTravelList] = useState([]);
  //이걸로 바꿔야함

  
  //더미 데이터
  // const [travelList, setTravelList] = useState([
  //   {
  //     tripId: 1,
  //     name: "우정 여행 1",
  //     startDate: "2024-11-15",
  //     endDate: "2024-11-17",
  //   },
  //   {
  //     tripId: 2,
  //     name: "우정 여행 2",
  //     startDate: "2024-11-18",
  //     endDate: "2024-11-20",
  //   },
  //   {
  //     tripId: 3,
  //     name: "우정 여행 3",
  //     startDate: "2024-11-21",
  //     endDate: "2024-11-23",
  //   },
  //   {
  //     tripId: 4,
  //     name: "우정 여행 4",
  //     startDate: "2024-11-24",
  //     endDate: "2024-11-26",
  //   },
  //   {
  //     tripId: 5,
  //     name: "우정 여행 5",
  //     startDate: "2024-11-24",
  //     endDate: "2024-11-26",
  //   },
  // ]);

  useEffect(() => {
    const fetchTravelList = async () => {
      try {
        const response = await axiosInstance.get("/trip/search"); //PRAMS 없이 요청하면 전체
        setTravelList(response.data.data.slice(0, 5)); // 첫 5개 항목만 설정
      } catch (error) {
        console.error("해당 여행 목록 없음!", error);
      }
    };

    fetchTravelList();
  }, []);

   // 빈 항목 추가
   const filledList = [...travelList];
   while (filledList.length < 5) {
     filledList.push({ tripName: "", startDate: "", endDate: "" });
   }

  return (
    <Tripbox>
      <ListHeader>
        <Title>여행 목록</Title>
        <ButtonBox>
          <PlusButton onClick={() => navigate("/trip")} />
          <SearchButton onClick={() => navigate("/tripSearch")} />
        </ButtonBox>
      </ListHeader>
      {filledList.map((travel, index) => {
        const isEmpty = !travel.tripName && !travel.startDate && !travel.endDate;
        const formattedStartDate = travel.startDate.slice(5);
        const formattedEndDate = travel.endDate.slice(5);

        const handleClick = () => {
          if (!isEmpty) {
            navigate(`/travel/detail/${travel.tripId}`);
          }
        };

        return (
          <ListItem key={index} onClick={handleClick}
            style={{ 
              cursor: isEmpty ? 'default' : 'pointer', 
              borderBottom: isEmpty ? 'none' : '1px solid #ddd',
              height: isEmpty ? '20px' : 'auto', // 빈 항목일 때 높이 설정
              }}>
            <Name>{travel.tripName}</Name>
            {!isEmpty && <Date>{formattedStartDate} ~ {formattedEndDate}</Date>}
          </ListItem>
        );
      })}
    </Tripbox>
  );
};



const CostList = () => {
  const navigate = useNavigate();

  const memberId = localStorage.getItem('memberId');

  const [costList, setCostList] = useState([
    { id: "", payer: { payerId: "", payerNickName: "" }, payee: { payeeId: "", payeeNickName: "" }, perCost: "", isCompleted: false },
    { id: "", payer: { payerId: "", payerNickName: "" }, payee: { payeeId: "", payeeNickName: "" }, perCost: "", isCompleted: false },
    { id: "", payer: { payerId: "", payerNickName: "" }, payee: { payeeId: "", payeeNickName: "" }, perCost: "", isCompleted: false },
  ]);


  //더미 데이터
  //const memberId = "1";

  //const [costList, setCostList] = useState([
  //  { id: "1", payer: { payerId: "1", payerNickname: "규영" }, payee: { payeeId: "2", payeeNickname: "카리나" }, perCost: "10000", isCompleted: false },
  //   { id: "2", payer: { payerId: "4", payerNickname: "해원" }, payee: { payeeId: "1", payeeNickname: "규영" }, perCost: "10000", isCompleted: false },
  //  { id: "3", payer: { payerId: "3", payerNickname: "설윤" }, payee: { payeeId: "1", payeeNickname: "규영" }, perCost: "10000", isCompleted: false },
  //]);



  useEffect(() => {
    const fetchCostList = async () => {
      try {
        const response = await axios.get("/dutch");
        if (response.data.isSuccess) {
          // 상위 3개 항목만 설정
          setCostList(response.data.data.dutch.slice(0, 3));
        } else {
          console.error("데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("네트워크 오류:", error);
      }
    };

    fetchCostList();
  }, []);

  return (
    <CostBox>
      <ListHeader>
        <Title>정산 내역</Title>
        <ButtonBox onClick={() => navigate("/calculate/total")}>
          <NextButton />
        </ButtonBox>
      </ListHeader>
      {costList.map((cost, index) => {
        const isPayer = memberId === cost.payer.payerId.toString(); // memberId와 payerId 비교

        return (
          <CostItem key={index}>
            <Name>{isPayer ? cost.payee.payeeNickName : cost.payer.payerNickName}</Name>
            <Sum>
              {cost.perCost ? (isPayer ? `-${cost.perCost}` : `+${cost.perCost}`) : cost.perCost}
            </Sum>
          </CostItem>
        );
      })}
    </CostBox>
  );
};


const TravelMain = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    
    
  
    return (
      <Container>
        <Header>
          <Logo>두더치</Logo>
          <MenuButton onClick={toggleSidebar}>☰</MenuButton>
        </Header>
        {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
        <TravelList/>
        <CostList/>  
      </Container>
    );
  };


  export default TravelMain;


  
  const Container = styled.div`
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    background-color: #fff;
    border: none;
  `;
  
  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    margin-top: 28px;
  `;


  const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  `

  const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: right;
  padding: 10px 0;
`
  
  const Logo = styled.div`
    color: var(--Grayscale-9, #141414);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 30px */
  `;
  
  const MenuButton = styled.button`
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
  `;
  
  const Tripbox = styled.div`
  margin-top: 20px;
`;

  const CostBox = styled.div`
    margin-top: 20px;
  `;
  
  const Title = styled.h2`
    color: var(--Grayscale-7, #474747);
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 22.5px */
  `;
  
  const ListItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  `;

  const CostItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  `;

  const Name = styled.div`
  color: var(--Grayscale-7, #474747);
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  `;

  const Date = styled.div`
    color: var(--Grayscale-5, #7A7A7A);
    text-align: right;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
  `;


  const Sum = styled.div`
    color: var(--Grayscale-9, #141414);
    text-align: right;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
  `;
  
