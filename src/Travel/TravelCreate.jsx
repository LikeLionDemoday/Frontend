import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackwardIcon } from "../icons/backward.svg";
import axiosInstance from "../api/axios";


const newToken = localStorage.getItem("access_token");



const TravelCreate = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    tripName: "",
    startDate: "",
    endDate: "",
    place: "",
    budget: ""
  });

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post('/trip', userData, {
        headers: {
          Authorization: `Bearer ${newToken}` // 실제 토큰으로 교체하세요
        }
      });

      if (response.data.isSuccess) {
        const { tripId } = response.data.data;
        navigate('/trip/join', { state: { tripId } });
      } else {
        console.error('여행 생성 실패:', response.data.message);
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
    }
  };

  return (
    <Container>
      <Header>
        <Button><BackwardIcon onClick={() => navigate("/tripMain")} /></Button>
        <Title>여행 추가</Title>
      </Header>
      <InnerBox userData={userData} setUserData={setUserData} />
    </Container>
  );
};

export default TravelCreate;




const InnerBox = ({ userData, setUserData }) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <CreateBox>
        <Circle />
        <Input name="tripName" placeholder="여행명을 입력해주세요." onChange={handleChange} />
         <DateContainer>  
          <DateInput
            name="startDate"
            type="date"
            onChange={handleChange}
            value={userData.startDate}
          />
          <DateInput
            name="endDate"
            type="date"
            onChange={handleChange}
            value={userData.endDate}
          />
        </DateContainer>
      <Input name="place" placeholder="여행지를 입력해주세요." onChange={handleChange} />
      <Target>목표 금액</Target>
      <Input name="budget" type="number" placeholder="목표 금액을 설정해주세요." onChange={handleChange} />
      {/* <SubmitButton/> */}
    </CreateBox>
  )
}



  const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 331px;
  margin-top: 48px;
`;


const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 72px;
  position: relative;
`;


const CreateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 610px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.00);
`


const Button = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: var(--Grayscale-9, #141414);
  font-weight: 600;
  top: 0;
`;

const Title = styled.h1`
  color: var(--Grayscale-7, #474747);
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Circle = styled.div`
  width: 207px;
  height: 207px;
  border-radius: 50%;
  background-color: #ddd;
  margin-bottom: 40px;
`;

const Input = styled.input`
  width: 248px;
  padding: 10px 0;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid #ccc;
  background: none;
  outline: none;
  text-align: center;
  color: var(--Grayscale-3, #ADADAD);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.36px;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 248px;
  margin-bottom: 10px;
  position: relative;

  &::before {
    content: "~";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #aaa;
    //margin-bottom: 10px;
  }
`;



const DateInput = styled.input`
  width: 108px;
  padding: 3px;
  text-align: center;
  background: none;
  outline: none;
  color: #333;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  color: var(--Grayscale-3, #ADADAD);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 200%;
  letter-spacing: 0.12px;
`;

const Target = styled.div`
    color: var(--Grayscale-5, #7A7A7A);
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-top: 10px;
`;

// const DateWrapper = styled.div`
//   position: relative;
//   width: 40%;
// `;
