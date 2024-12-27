import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as NextButton } from "../icons/rightward.svg";
import { ReactComponent as PlusButton } from "../icons/plus.svg";
import { ReactComponent as SearchButton } from "../icons/SearchRight.svg";


const TravelList = () => {
  const navigate = useNavigate();
  //더미 데이터

  const [travelList, setTravelList] = useState([
    {
      tripId: 1,
      name: "우정 여행 1",
      startDate: "2024-11-15",
      endDate: "2024-11-17",
    },
    {
      tripId: 2,
      name: "우정 여행 2",
      startDate: "2024-11-18",
      endDate: "2024-11-20",
    },
    {
      tripId: 3,
      name: "우정 여행 3",
      startDate: "2024-11-21",
      endDate: "2024-11-23",
    },
    {
      tripId: 4,
      name: "우정 여행 4",
      startDate: "2024-11-24",
      endDate: "2024-11-26",
    },
    {
      tripId: 5,
      name: "우정 여행 5",
      startDate: "2024-11-27",
      endDate: "2024-11-29",
    },
  ]);

  // const [travelList, setTravelList] = useState([]);

  // useEffect(() => {
  //   const fetchTravelList = async () => {
  //     try {
  //       const response = await axios.get("/trip/search", {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`, // access_token을 여기에 추가
  //         },
  //         params: {
  //           name: "여행명",
  //           date: "날짜",
  //           member: "구성원",
  //         },
  //       });
  //       setTravelList(response.data.trips.slice(0, 5)); // 첫 5개 항목만 설정
  //     } catch (error) {
  //       console.error("Error fetching travel list:", error);
  //     }
  //   };

  //   fetchTravelList();
  // }, []);

   // 빈 항목 추가
   const filledList = [...travelList];
   while (filledList.length < 5) {
     filledList.push({ name: "", startDate: "", endDate: "" });
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
        const formattedStartDate = travel.startDate.slice(5);
        const formattedEndDate = travel.endDate.slice(5);
        return (
          <ListItem key={index}>
            <Name>{travel.name}</Name>
            <Date>{formattedStartDate} ~ {formattedEndDate}</Date>
          </ListItem>
        );
      })}
    </Tripbox>
  );
};



const CostList = () => {

  const navigate = useNavigate();

  const costList = [
    { name: "카리나", sum: "+40,000원" },
    { name: "윈터", sum: "-3,300원" },
    { name: "장원영", sum: "-3,300원" },
  ];

    return (
      <CostBox> 
        <ListHeader>
          <Title>정산 내역</Title>
          <ButtonBox>
            <NextButton/>
          </ButtonBox>
        </ListHeader>
        {costList.map((cost, index) => (
          <CostItem key={index}>
            <Name>{cost.name}</Name>
            <Sum>{cost.sum}</Sum>
          </CostItem>
        ))}
      </CostBox>
    )
}


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
        {isSidebarOpen && (
        <Sidebar>
          <CloseButton onClick={toggleSidebar}>닫기</CloseButton>
          사이드바 내용
        </Sidebar>
        )}
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
    margin-top: 48px;
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
  
  const Sidebar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  background-color: #f4f4f4;
  padding: 20px;
`;

  const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
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
  
