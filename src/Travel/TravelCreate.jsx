import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackwardIcon } from "../icons/backward.svg";
import axiosInstance from "../api/axios";
import { ReactComponent as AddPhotoIcon } from "../icons/PhotoButton.svg";
import { ReactComponent as DeleteIcon } from "../icons/DeleteButton.svg";

const TravelCreate = () => {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");
  // const [userData, setUserData] = useState({});
  // 이걸로 바꿔야함

  const [userData, setUserData] = useState({
    tripName: "",
    startDate: "",
    endDate: "",
    place: "",
    budget: "",
    photo: null,
  });
  
  const [joinCode, setJoinCode] = useState();




  return (
    <Container>
      <Header>
        <Button><BackwardIcon onClick={() => navigate("/tripMain")} /></Button>
        <Title>여행 추가</Title>
      </Header>
      <TabBar>
        <TabButton
          active={activeTab === "create"}
          onClick={() => setActiveTab("create")}
        >
          새 여행 생성
        </TabButton>
        <TabButton
          active={activeTab === "join"}
          onClick={() => setActiveTab("join")}
        >
          여행 참여
        </TabButton>
      </TabBar>
      {activeTab === "create" ? (
        <InnerBox userData={userData} setUserData={setUserData} />
      ) : (
        <JoinBoxComponent joinCode={joinCode} setJoinCode={setJoinCode} />
      )}
    </Container>
  );
};

export default TravelCreate;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 331px;
  margin-top: 48px;
  background: #fff;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  background: #fff;
`;

const TabBar = styled.div`
  display: flex;
  justify-content: space-around;
  width: 311px;
  margin-bottom: 20px;

  height: auto;
  padding: 8px 10px;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 16px;
  background: var(--Grayscale-White, #FFF);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  background: ${({ active }) => (active ? "#FF5234" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;


  display: flex;
  width: 156px;
  padding: 6px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 30px;
`;

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

const InnerBox = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData(prev => ({
        ...prev,
        photo: imageUrl // 단일 이미지 URL 저장
      }));
      event.target.value = null; // 파일 입력 초기화
    }
  };

  const handleDeleteImage = () => {
    setUserData(prev => ({
      ...prev,
      photo: null // 사진 삭제
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log('userData:', userData); // userData를 콘솔에 출력
      const response = await axiosInstance.post('/trip', userData);

      if (response.data.isSuccess) {
        const { tripId } = response.data.data;
        navigate(`/trip/join/${tripId}`);
      } else {
        console.error('여행 생성 실패:', response.data.message);
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFocus = (e) => {
    e.target.placeholder = '';
  };

  const handleBlur = (e, originalPlaceholder) => {
    e.target.placeholder = originalPlaceholder;
  };

  return (
    <CreateBox>
      <CircleWrapper>
        <Circle>
          {userData.photo ? (
            <img src={userData.photo} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          ) : (
            <AddPhotoIconWrapper onClick={() => fileInputRef.current.click()}>
              <AddPhotoIcon />
            </AddPhotoIconWrapper>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </Circle>
        {userData.photo && (
          <DeleteIconWrapper onClick={handleDeleteImage}>
            <DeleteIcon />
          </DeleteIconWrapper>
        )}
      </CircleWrapper>
      <Input
        name="tripName"
        placeholder="여행명을 입력해주세요."
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={(e) => handleBlur(e, "여행명을 입력해주세요.")}
        value={userData.tripName}
      />
      <DateContainer>
        <DateInput
          name="startDate"
          type="date"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={(e) => handleBlur(e, "")}
          value={userData.startDate}
        />
        <DateInput
          name="endDate"
          type="date"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={(e) => handleBlur(e, "")}
          value={userData.endDate}
        />
      </DateContainer>
      <Input
        name="place"
        placeholder="여행지를 입력해주세요."
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={(e) => handleBlur(e, "여행지를 입력해주세요.")}
        value={userData.place}
      />
      <Target>목표 금액</Target>
      <Input
        name="budget"
        type="number"
        placeholder="목표 금액을 설정해주세요."
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={(e) => handleBlur(e, "목표 금액을 설정해주세요.")}
        value={userData.budget}
      />
      <CompleteBtn onClick={handleSubmit}>
        <p>완료</p>
      </CompleteBtn>
    </CreateBox>
  );
};

const CreateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 630px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const CircleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddPhotoIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
`;

const DeleteIconWrapper = styled.div`
  position: absolute;
  top: 45px;
  right: 10px;
  cursor: pointer;
  z-index: 1;
`;

const Circle = styled.div`
  width: 207px;
  height: 207px;
  border-radius: 50%;
  background-color: #f9f9f9;
  margin-bottom: 40px;
  margin-top: 30px;
  position: relative;
  overflow: hidden;
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
  color: ${({ value }) => (value ? "var(--Grayscale-9, #141414)" : "var(--Grayscale-3, #ADADAD)")};
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

const CompleteBtn = styled.div`
  width: 100%;
  height: 60px;
  background-color: var(--main-red, #FF5234);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: 20px;
  color: var(--Grayscale-White, #FFF);
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const JoinBoxComponent = ({ joinCode, setJoinCode }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJoinCode(e.target.value);
  };

  const handleFocus = (e) => {
    e.target.placeholder = '';
  };

  const handleBlur = (e, originalPlaceholder) => {
    e.target.placeholder = originalPlaceholder;
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post('/trip/join', { joinCode });
      const { success, code, message } = response.data;

      if (success) {
        alert('여행에 성공적으로 참여했습니다!');
        navigate('/tripMain');
      } else {
        switch (code) {
          case "404":
            alert(message);
            console.error('여행 참여 실패: 해당 여행이 존재하지 않습니다.');
            break;
          case "400":
            alert(message);
            console.error('여행 참여 실패: 멤버가 이미 여행에 추가되어 있습니다.');
            break;
          default:
            console.error('여행 참여 실패:', message);
        }
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
    }
  };

  return (
    <JoinBox>
      <JoinTitle>링크로 참여하기</JoinTitle>
      <JoinInput
        placeholder="참여 코드를 입력해주세요."
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={(e) => handleBlur(e, "참여 코드를 입력해주세요.")}
        value={joinCode}
      />
      <CompleteBtn onClick={handleSubmit}>
        <p>완료</p>
      </CompleteBtn>
    </JoinBox>
  );
};

const JoinBox = styled.div`
  width: 100%;
  height: 220px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const JoinTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const JoinInput = styled.input`
  width: 70%;
  padding: 10px;
  margin-bottom: 12px;
  border: none;
  border-bottom: 1px solid #ccc;
  background: none;
  outline: none;

  color: ${({ value }) => (value ? "var(--Grayscale-9, #141414)" : "var(--Grayscale-3, #ADADAD)")};
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 30px */
  letter-spacing: 0.4px;
`;
