import styled from "styled-components";
import { useState } from 'react';


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
    

    const handleWhatChange = (e) => {
        setWhat(e.target.value);
    }

    const handleTotalAmountChange = (e) => {
        setTotalAmount(e.target.value);
    }

    const handlePersonalAmountChange = (e) => {
        setPersonalAmounts(e.target.value);
    }
    
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
                            <input 
                                type="text" 
                                placeholder="금액 입력" 
                                className="personalAmountInput" 
                                value={personalAmounts[person.id] || ''} 
                                onChange={(e) => handlePersonalAmountChange(person.id, e.target.value)}
                            />
                        </PersonItem>
                    ))}
                </PeopleList>
                <Line>

                </Line>
                <TotalAmount>
                    <div className="label">총 금액</div>
                    <div className="value">{totalAmount ? `${Number(totalAmount).toLocaleString()}원` : ''}</div>
                </TotalAmount>
            </PeopleContainor>


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
    justify-content: space-between;
    padding: 20px;
    //border-top: 1px solid #EEEEEE;
    margin-top: 7px;

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
`


