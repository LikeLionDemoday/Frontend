import styled from "styled-components";
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import TravelCreate from "../Travel/TravelCreate";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axiosInstance from '../api/axios.js'

const persons = [
    { id: 1, name: "이제원"},
    { id: 6, name: "이철우"},
    { id: 8, name: "박규영"},
];

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export function ExpAdd(){
    const navigate = useNavigate();
    const { tripId } = useParams();

    // 선택된 카테고리와 토글 상태를 관리하기 위한 state 추가
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isToggled, setIsToggled] = useState(false); //1/N 토글 스위치
    const [selectedPerson, setSelectedPerson] = useState(null); //결제자 선택
    const [what, setWhat] = useState(''); //항목명
    const [totalAmount, setTotalAmount] = useState(''); //총 금액
    const [personalAmounts, setPersonalAmounts] = useState({}); //개인 금액
    const [isValid, setIsValid] = useState(true); //총 금액 일치 여부 검사
    const [memo, setMemo] = useState(''); //메모

    const [selectedImages, setSelectedImages] = useState([]);
    const fileInputRef = useRef(null);
    const [expDate, setExpDate] = useState(getCurrentDate()); //지출 날짜

    const [members, setMembers] = useState([]);//여행 인원 목록
    const [imageFiles, setImageFiles] = useState([]);
   

    const handleExpDateChange = (e) => {
        setExpDate(e.target.value);
    }

    const handleWhatChange = (e) => {
        setWhat(e.target.value);
    }

    const handleTotalAmountChange = (e) => {
        const newTotalAmount=e.target.value;
        setTotalAmount(newTotalAmount);

        if(isToggled && newTotalAmount){
            const amount=Math.floor(Number(newTotalAmount)/persons.length);
            const newAmounts={};
            persons.forEach(person=>{
                newAmounts[person.id]=amount;
            });
            setPersonalAmounts(newAmounts);
        }
    }

    const calculateSum = () => {
        return Object.values(personalAmounts).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
    };


    const handlePersonalAmountChange = (personId, value) => {
        if (isToggled) {
            setIsToggled(false);
        }

        setPersonalAmounts(prev => ({  //prev는 이전 상태 가져오는 역할
            ...prev,  //prev를 실제로 펼침
            [personId]: value  //거기에 값을 추가
        }));
    };
    
    // 카테고리 버튼 클릭 핸들러
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    // 1/N 토글 스위치 클릭 핸들러
    const handleToggleClick = () => {
        setIsToggled(!isToggled); //여기서 바로 isToggled가 true가 되는건 아님

        if(!isToggled && totalAmount){  //그래서 여기서는 !isToggled를 사용해야 함 그래야 true값이 될 수 있음
            const amount=Math.floor(Number(totalAmount)/members.length);
            const newAmounts={};
            members.forEach(person=>{
                newAmounts[person.memberId]=amount;
            });
            setPersonalAmounts(newAmounts);
        }
        else{
            setPersonalAmounts({});
        }
    };


    const handleCheckboxClick = (personId) => {
        setSelectedPerson(personId);
    };

    // const handleImageUpload = (event) => {
    //     const files = Array.from(event.target.files);
    //     const newImages = files.map(file => URL.createObjectURL(file));
    //     setSelectedImages(prev => [...prev, ...newImages]);
    // };
    
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        // 파일 객체 저장
        setImageFiles(prev => [...prev, ...files]);
        // 미리보기용 URL 생성
        const newImages = files.map(file => URL.createObjectURL(file));
        setSelectedImages(prev => [...prev, ...newImages]);
    };


     const handleDeleteImage = (index) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        // 파일 input 초기화
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const checkValid = () => {
    
        // 토글이 켜져있을 때(1/N 상태)는 금액 검증을 건너뜀
        if (isToggled){
            setIsValid(true);
        } 
    
        // 토글이 꺼져있을 때만 금액 검증
        else{
            const sum = calculateSum();
            const total = Number(totalAmount) || 0;
            setIsValid(sum === total && total !== 0);
        }
    };

    const handleMemoChange = (e) => {
        setMemo(e.target.value);
    };

    const fetchData=async()=>{
        try{
            //const response=await axiosInstance.get(`/trip/${tripId}`);
            const response=await axiosInstance.get(`/trip/1`);
            setMembers(response.data.data.members);
             
            console.log(response);
        }catch(error){
            console.error("Error fetching travel data:", error);
        }
    }

    const handleCompleteClick=async()=>{
        
        const memberCosts = Object.entries(personalAmounts).map(([memberId, cost]) => ({
            memberId: parseInt(memberId),
            cost: parseInt(cost)
        }));

        const requestData = {
            payer: selectedPerson,  // 결제자 ID
            title: what,               // 항목명
            expenseCategory: selectedCategory,
            amount: parseInt(totalAmount),
            expenseDate: expDate,
            //image_url: selectedImages.length > 0 ? selectedImages[0] : "",  // 첫 번째 이미지 URL
            memo: memo,
            members: memberCosts
        };

       
        try{

            const formData=new FormData();

            const jsonBlob = new Blob([JSON.stringify(requestData)], { type: 'application/json' });
            formData.append('request', jsonBlob);

            //formData.append('request',JSON.stringify(requestData));
            
            if (imageFiles.length > 0) {
                imageFiles.forEach(file => {
                    formData.append('expenseImage', file);
                });
            }

            //formData.append('expenseImage',selectedImages); 
            
            // const response=await axiosInstance.post(`/trip/${tripId}/expense`,formData,{
            //     headers:{
            //         'Content-Type':'multipart/form-data'
            //     }
            // }); 이게 진짜

            const response=await axiosInstance.post(`/trip/1/expense`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                }
            });
            
            navigate(`/travel/detail/${tripId}`);
            console.log(response.data);

        }catch(error){
            console.log(error);
            console.error('Error fetching data:', error);
        }
    }


    useEffect(() => {
        checkValid();
    }, [personalAmounts, totalAmount]);

    useEffect(() => {
        fetchData();
    }, []);  //이거 해야함

   
    return(
        <ExpAddContainor>
            <TitleAndBtn>
                <div className="material-symbols-outlined" onClick={ () => {navigate(`/expense/${tripId}`)}}>
                    arrow_back_ios
                </div>
                <div className='title'>
                    <p>지출 추가</p>
                </div>
                <div className='complete' onClick={handleCompleteClick}>   {/* travel/detail 로 navigate} */}
                    <p>완료</p>
                </div>
            </TitleAndBtn>

            <SummaryContainor>
                <ExpDate>
                    <p>지출 날짜</p>
                    <input type="date" className="expDateInput" value={expDate} onChange={handleExpDateChange} required/>
                </ExpDate>
                <ExpTitle>
                    <p>항목명</p>
                    <input type="text" className="expTitleInput" placeholder="어디에서 사용하셨나요?" value={what} onChange={handleWhatChange} required/>
                </ExpTitle>
                <ExpAmount>
                    <p>금액</p>
                    <input type="text" className="expAmountInput" placeholder="얼마를 사용하셨나요?"  value={totalAmount} onChange={handleTotalAmountChange} required/>
                </ExpAmount>
                <ExpCategory>
                    <p>분류</p>
                    <div className="categoryButtons">
                        <button className={selectedCategory === '숙소' ? 'active' : ''} onClick={() => handleCategoryClick('숙소')}>숙소</button>
                        <button className={selectedCategory === '교통' ? 'active' : ''} onClick={() => handleCategoryClick('교통')}>교통</button>
                        <button className={selectedCategory === '식사' ? 'active' : ''} onClick={() => handleCategoryClick('식사')}>식사</button>
                        <button className={selectedCategory === '활동' ? 'active' : ''} onClick={() => handleCategoryClick('활동')}>활동</button>
                        <button className={selectedCategory === '기타' ? 'active' : ''} onClick={() => handleCategoryClick('기타')}>기타</button>
                    </div>
                </ExpCategory>
                <ExpDivide>
                    <p>동일 금액 분할(1/N)</p>
                    <div className={`toggleSwitch ${isToggled ? 'active' : ''}`} onClick={handleToggleClick}>

                    </div>
                </ExpDivide>
            </SummaryContainor>
            <Bar></Bar>
            <PeopleContainor>
                <PeopleTitle>
                    <p className="payPerson">결제자</p>
                    <p className="payName">이름</p>
                    <p className="payAmount">세부금액</p>
                </PeopleTitle>
                <PeopleList>
                    {members.map((person) => ( //persons대신 people 사용
                        <PersonItem key={person.memberId}>
                            <div className="leftSection">
                                <div 
                                    className={`checkbox ${selectedPerson===person.memberId ? 'checked' : ''}`}
                                    onClick={() => handleCheckboxClick(person.memberId)}
                                >
                                    {selectedPerson===person.memberId && <span>✓</span>}
                                </div>
                                <span className="name">{person.nickName}</span>
                            </div>
                            <input 
                                type="text" 
                                placeholder="금액 입력" 
                                className="personalAmountInput" 
                                value={personalAmounts[person.memberId] || ''} 
                                onChange={(e) => handlePersonalAmountChange(person.memberId, e.target.value)}
                            />
                        </PersonItem>
                    ))}
                </PeopleList>
                <Line>

                </Line>
                <TotalAmount>
                    <div className="firstRow">
                        <div className="label">총 금액</div>
                        <div className="value" style={{color: isValid ? 'black' : 'red'}}>{totalAmount ? `${Number(totalAmount).toLocaleString()}원` : ''}</div>
                    </div>
                    <div className="errorMessage">{isValid ? '' : '금액이 맞지 않아요.'}</div>
                </TotalAmount>
            </PeopleContainor>

            <PhotoContainer>
                <h3 className="photoTitle">사진 첨부하기</h3>
                <PhotoPlus>
                
                    {selectedImages.length < 3 && (
                        <AddPhotoButton onClick={() => fileInputRef.current.click()}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                style={{ display: 'none' }}
                                multiple
                            />
                        </AddPhotoButton>
                    )}
        
                    <PhotoBox>
                        {[0,1,2].map((index) => (
                            <ImageBox key={index}>
                                {selectedImages[index] ? (
                                    <>
                                        <img src={selectedImages[index]} alt={`uploaded-${index}`} />
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDeleteImage(index)}
                                        >
                                            -
                                        </button>
                                    </>
                                ) : null}
                            </ImageBox>
                        ))}
                    </PhotoBox>
                </PhotoPlus>
            </PhotoContainer>

            <MemoContainor>
                <p className="memoTitle">메모 추가하기</p>
                <input type="text" className="memoInput" value={memo} placeholder="메모를 입력해주세요." maxLength="24" onChange={handleMemoChange}/>
                <div className="memoline"></div>
                <div className="explain">(최대 24자)</div>
            </MemoContainor>

        </ExpAddContainor>
    );
}

const ExpAddContainor=styled.div`
    width:375px;
    //height:800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    //background-color: whitesmoke;
`

const TitleAndBtn=styled.div`
    width:331px;
    height:30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top:100px;
    //background-color: blue;

    .material-symbols-outlined{
        width:30px;
        height:21px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size:20px;
        color: gray;
        border: none;
        outline: none;
    }

    .title{
        width:120px;
        height:21px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 21px */
        //background-color: red;
    }

    .complete{
        width:40px;
        height:21px;
        display: flex;
        justify-content: center;
        align-items: center;
        //background-color: aqua;
        color: var(--Grayscale-9, #141414);
        text-align: right;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 24px */
    }
`

const SummaryContainor=styled.div`
    width:331px;
    height:270px;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    margin-top: 72px;
    //background-color: red;
`

const ExpDate=styled.div`
    width:331px;
    height:32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    //background-color: yellow;


    .expDateInput{
        width:200px;
        height:26px;
        border: none;
        //background-color: aqua;
        text-align: center;
        color: var(--Grayscale-9, #141414);
        text-align: right;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 24px */
        letter-spacing: 0.32px;
        
        &::-webkit-calendar-picker-indicator {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23333333' d='M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z'/%3E%3C/svg%3E");
            width: 20px;
            height: 20px;
            cursor: pointer;
            opacity: 0.6;
            margin-left: 10px;  // 아이콘 왼쪽 여백 추가
        }

    }
`

const ExpTitle=styled.div`
    width:331px;
    height:32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    //background-color: blue;
    color: var(--Grayscale-7, #474747);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
    letter-spacing: 0.32px;

    .expTitleInput{
        width:200px;
        height:24px;
        border: none;
        //background-color: aqua;
        text-align: right;
    }
`
const ExpAmount=styled.div`
   width:331px;
   height:32px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   margin-top: 24px;
   //background-color: green;
   color: var(--Grayscale-7, #474747);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
    letter-spacing: 0.32px;

    .expAmountInput{
        width:200px;
        height:24px;
        border: none;
        //background-color: aqua;
        text-align: right;

    }
`
const ExpCategory=styled.div`
   width:331px;
   height:32px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   margin-top: 24px;
   //background-color: yellow;
   color: var(--Grayscale-7, #474747);
   font-family: Pretendard;
   font-size: 16px;
   font-style: normal;
   font-weight: 500;
   line-height: 150%; /* 24px */
   letter-spacing: 0.32px;

   .categoryButtons {
        display: flex;
        gap: 4px;
        font-family: Pretendard;
    }

    button {
        padding: 6px 12px;
        border: 1px solid #ddd;
        border-radius: 20px;
        color: gray;
        background-color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
            background-color: #f0f0f0;
        }
        
        &.active {
            background-color: black;
            color: white;
            border-color: black;
        }
    }
`
const ExpDivide=styled.div`
   width:331px;
   height:32px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   margin-top: 24px;
   //background-color: purple;
   color: var(--Grayscale-7, #474747);
   font-family: Pretendard;
   font-size: 16px;
   font-style: normal;
   font-weight: 500;
   line-height: 150%; /* 24px */
   letter-spacing: 0.32px;

   .toggleSwitch {
        width: 40px;
        height: 20px;
        background-color: #ccc;
        border-radius: 10px;
        cursor: pointer;
    }

    button {
    padding: 6px 12px;
    border: 1px solid #ddd;
    border-radius: 20px;
    background-color: white;
    cursor: pointer;
    
    &:hover {
        background-color: #f0f0f0;
    }
    
}


    .toggleSwitch {
        position: relative;
        
        &::before {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            background-color: white;
            border-radius: 50%;
            top: 2px;
            left: 2px;
            transition: 0.3s;
        }
        
        &.active {
            background-color: #FF4D12;
            
            &::before {
                left: 22px;
            }
        }
    }
`
const Bar=styled.div`
    width:331px;
    height:4px;
    background-color: #EFEFEF;
`

const PeopleContainor=styled.div`
    width:331px;
    height:410px;
    margin-top: 32px;
    border-radius: 16px;
    background: #FFF;
    box-shadow: 22px 22px 22px 22px rgba(0, 0, 0, 0.06);
    //background-color: blue;
`

const PeopleTitle=styled.div`
    width:331px;
    height: 18px;
    display: flex;
    flex-direction: row;
    //justify-content: space-between;
    align-items: center;
    margin-top: 54px;
    //background-color: red;

    .payPerson{
        margin-left: 36px;
    }

    .payName{
        margin-left: 40px;
    }

    .payAmount{
        margin-left: 89px;
    }

`

const PeopleList = styled.div`
    width: 331px;
    margin-top: 22px;
    display: flex;
    flex-direction: column;
    //gap: 12px;
`;

const PersonItem = styled.div`
    width:331px;
    height: 27px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    //background-color: yellow;
    border-bottom: 1px solid #EEEEEE;

    .leftSection {
        display: flex;
        align-items: center;
        //gap: 12px;
    }
    .checkbox {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid grey;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-left: 45px;
        
        &.checked {
            background-color: #FF4D12;
            border: 2px solid #FF4D12;
            color: white;
        }

        span {
            font-size: 12px;
            font-weight: bold;
        }
    }

    .name {
        width:60px;
        flex: 1;
        margin-left: 45px;
        font-size: 16px;
        color: #333;
        white-space: nowrap; // 추가: 텍스트 한 줄로 유지
        overflow: hidden; // 추가: 넘치는 텍스트 숨김
        text-overflow: ellipsis; // 추가: 말줄임표 표시
        //background-color: red;
    }

    .personalAmountInput {
        width: 67px;
        height: 18px;
        font-size: 14px;
        color: #333;
        font-weight: 500;
        margin-left: 44px;
        border: 1px solid #EEEEEE;
        border-radius: 4px;
        padding: 4px 8px;
        //margin-right: 27px;
        text-align: center;
        border: none;
        outline: none;

        &::placeholder {
            color: #999;
            text-align: center;
        }
    }
`
const Line=styled.div`
    width:284px;
    height:1px;
    margin-left: 20px;
    background-color: grey;
`
const TotalAmount = styled.div`
    display: flex;
    flex-direction: column;
    //padding: 20px;
    //border-top: 1px solid #EEEEEE;
    margin-top: 20px;
    
    .firstRow{
        width: 331px;
        height: 20px;
        //background-color: blue;
        display: flex;
        justify-content: space-between;
        
        .label {
        font-size: 16px;
        font-weight: 600;
        margin-left: 14px;
        color: #333;
        }

        .value {
            font-size: 16px;
            font-weight: 600;
            margin-right: 14px;
            color: #FF4D12;
        }

    }

    
    .errorMessage{
        width:200px;
        height:20px;
        margin-top: 10px;
        margin-left: 230px;
        color: red;
        font-size: 12px;
        font-weight: 400;
        //background-color: green;
    }
`

const PhotoContainer = styled.div`
    width: 290px;
    margin-top: 20px;
    padding: 20px;
    background: #FFF;
    border-radius: 16px;
    box-shadow: 22px 22px 22px 22px rgba(0, 0, 0, 0.06);

    .photoTitle {
        font-size: 16px;
        margin-left: 105px;
        margin-bottom: 16px;
    }
`;

const PhotoPlus = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
`;

const PhotoBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 38px;
    margin-left: 10px;
    overflow-x: auto;  // 가로 스크롤 추가
    padding-bottom: 10px;  // 스크롤바 여유 공간
    grid-template-columns: repeat(3, 1fr);
    
    &::-webkit-scrollbar {
        height: 4px;
    }
    
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 2px;
    }
`;

const ImageBox = styled.div`
    position: relative;
    width: 76px;
    height: 108px;
    border: 2px dashed #ddd;
    border-radius: 8px;
    overflow: hidden;
    
    img{
        width: 100%;
        height: 100%;
        object-fit: cover; 
    }

    
    .delete-btn {
        position: absolute;
        top: 4px;
        right: 4px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const AddPhotoButton = styled.div`
    position: relative;
    width: 20px;
    height: 20px;
    //padding-bottom: 100%;
    border: 2px solid #FF4D12;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 135px;
    background-color: #FF4D12;

    &::before {
        content: '+';
        position: absolute;
        top: 45%;
        left: 50%;
        font-size: 24px;
        color: white;
        transform: translate(-50%, -54%);

    }
`;

const MemoContainor=styled.div`
    width: 290px;
    height: 209px;
    margin-top: 20px;
    padding: 20px;
    background: #FFF;
    border-radius: 16px;
    box-shadow: 22px 22px 22px 22px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    align-items: center;

    .memoTitle{
        color: var(--Grayscale-9, #141414);
        font-family: Pretendard;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 27px */
        margin-top:48px
    }

    .memoInput{
        width: 250px;
        height: 90px;
        border: 1px solid #EEEEEE;
        border-radius: 4px;
        padding: 10px;
        margin-top: 70px;
        border: none;
        outline: none;
    }

    .memoline{
        width: 248px;
        height: 1px;
        margin-bottom: 10px;
        background-color: grey;
    }

    .explain{
        width: 100px;
        height: 16px;
        //margin-top: 10px;
        margin-left: 155px;
        color: var(--Grayscale-2, #C7C7C7);
        text-align: right;
        font-family: "Pretendard Variable";
        font-size: 10px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 15px */
    }

`

