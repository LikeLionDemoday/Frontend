import styled from "styled-components";
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';


const persons = [
    { id: 1, name: "구성원"},
    { id: 2, name: "구성원"},
    { id: 3, name: "구성원"},
    { id: 4, name: "구성원"},
    { id: 5, name: "이제원"}
];
export function ExpAdd(){
    // 선택된 카테고리와 토글 상태를 관리하기 위한 state 추가
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isToggled, setIsToggled] = useState(false);
    const [selectedPersons, setSelectedPersons] = useState([]);
    const [what, setWhat] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [personalAmounts, setPersonalAmounts] = useState({});
    const [isValid, setIsValid] = useState(true);

    const [selectedImages, setSelectedImages] = useState([]);
    const fileInputRef = useRef(null);

<<<<<<< HEAD
=======

>>>>>>> 3416bdff9f71e44deca3ad8cf2ba628622860137
    const handleWhatChange = (e) => {
        setWhat(e.target.value);
    }

    const handleTotalAmountChange = (e) => {
        setTotalAmount(e.target.value);
    }

<<<<<<< HEAD
    const handlePersonalAmountChange = (e) => {
        setPersonalAmounts(e.target.value);
    }
=======
    const calculateSum = () => {
        return Object.values(personalAmounts).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
    };


    const handlePersonalAmountChange = (personId, value) => {
        setPersonalAmounts(prev => ({
            ...prev,
            [personId]: value
        }));
    };
>>>>>>> 3416bdff9f71e44deca3ad8cf2ba628622860137
    
    // 카테고리 버튼 클릭 핸들러
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    // 토글 스위치 클릭 핸들러
    const handleToggleClick = () => {
        setIsToggled(!isToggled);
    };


    const handleCheckboxClick = (personId) => {
        setSelectedPersons(prev => {
            if (prev.includes(personId)) {
                return prev.filter(id => id !== personId);
            } else {
                return [...prev, personId];
            }
        });
    };

<<<<<<< HEAD
    //에러가 나서 임의로 함수 추가했어요!!!!
    // 금액 유효성 검사 함수
    const isAmountValid = () => {
      const personalAmountSum = Object.values(personalAmounts).reduce((acc, amount) => acc + Number(amount || 0), 0);
      return personalAmountSum === Number(totalAmount || 0);
  };

=======
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setSelectedImages(prev => [...prev, ...newImages]);
    };
    
    const handleDeleteImage = (index) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const sum = calculateSum();
        const total = Number(totalAmount) || 0;
        setIsValid(sum === total && total !== 0);
    }, [personalAmounts, totalAmount]);
>>>>>>> 3416bdff9f71e44deca3ad8cf2ba628622860137

    return(
        <ExpAddContainor>
            <TitleAndBtn>
                <div className="material-symbols-outlined">
                    arrow_back_ios
                </div>
                <div className='title'>
                    <p>지출 추가</p>
                </div>
                <div className='complete'>
                    <p>완료</p>
                </div>
            </TitleAndBtn>

            <SummaryContainor>
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
                        <button className={selectedCategory === '식사' ? 'active' : ''} onClick={() => handleCategoryClick('식사')}>식사</button>
                        <button className={selectedCategory === '교통' ? 'active' : ''} onClick={() => handleCategoryClick('교통')}>교통</button>
                        <button className={selectedCategory === '숙소' ? 'active' : ''} onClick={() => handleCategoryClick('숙소')}>숙소</button>
                        <button className={selectedCategory === '쇼핑' ? 'active' : ''} onClick={() => handleCategoryClick('쇼핑')}>쇼핑</button>
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
                    {persons.map((person) => (
                        <PersonItem key={person.id}>
                            <div className="leftSection">
                                <div 
                                    className={`checkbox ${selectedPersons.includes(person.id) ? 'checked' : ''}`}
                                    onClick={() => handleCheckboxClick(person.id)}
                                >
                                    {selectedPersons.includes(person.id) && <span>✓</span>}
                                </div>
                                <span className="name">{person.name}</span>
                            </div>
<<<<<<< HEAD
                            <input type="text" placeholder="금액 입력" className="personalAmountInput" value={personalAmounts} onChange={handlePersonalAmountChange}></input>
=======
                            
                            <input 
                                type="text" 
                                placeholder="금액 입력" 
                                className="personalAmountInput" 
                                value={personalAmounts[person.id] || ''} 
                                onChange={(e) => handlePersonalAmountChange(person.id, e.target.value)}
                            />
>>>>>>> 3416bdff9f71e44deca3ad8cf2ba628622860137
                        </PersonItem>
                    ))}
                </PeopleList>
                <Line>

                </Line>
                <TotalAmount>
<<<<<<< HEAD
                    <div className="label">총 금액</div>
                    <div className="value">{totalAmount ? `${Number(totalAmount).toLocaleString()}원` : ''}</div>
                    <div>
                    {isAmountValid() && totalAmount !== 0 && (
                    <div style={{ color: 'red' }}>금액이 맞지 않습니다.</div>
                    )}
                    </div>
=======
                    <div className="firstRow">
                        <div className="label">총 금액</div>
                        <div className="value">{totalAmount ? `${Number(totalAmount).toLocaleString()}원` : ''}</div>
                    </div>
                    <div className="errorMessage">{isValid ? '' : '금액이 맞지 않아요.'}</div>
>>>>>>> 3416bdff9f71e44deca3ad8cf2ba628622860137
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

        </ExpAddContainor>
    );
}

const ExpAddContainor=styled.div`
    width:375px;
    //height:800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: whitesmoke;
`

const TitleAndBtn=styled.div`
    width:331px;
    height:30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top:100px;
    background-color: blue;

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
        background-color: red;
    }

    .complete{
        width:40px;
        height:21px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: aqua;
        color: #000;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 21px */
    }
`

const SummaryContainor=styled.div`
    width:331px;
    height:200px;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    margin-top: 72px;
    background-color: red;
`

const ExpTitle=styled.div`
    width:331px;
    height:32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: blue;
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
        background-color: aqua;
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
   background-color: green;
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
        background-color: aqua;
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
   background-color: yellow;
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
   background-color: purple;
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
    height:12px;
    background-color: grey;
`

const PeopleContainor=styled.div`
    width:331px;
    height:410px;
    margin-top: 32px;
    border-radius: 16px;
    background: #FFF;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
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
    background-color: red;

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
    background-color: yellow;

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
        flex: 1;
        margin-left: 45px;
        font-size: 16px;
        color: #333;
    }

    .personalAmountInput {
        width: 67px;
        height: 18px;
        font-size: 14px;
        color: #333;
        font-weight: 500;
        margin-left: 64px;
        border: 1px solid #EEEEEE;
        border-radius: 4px;
        padding: 4px 8px;
        //margin-right: 27px;
        text-align: center;
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
        background-color: blue;
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
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);

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


