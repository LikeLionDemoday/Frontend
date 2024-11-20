import styled from "styled-components";
import React, { useState } from "react";

const EditContainor=styled.div`
    width:375px;
    height:900px;
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

const TravelInfoEdit=styled.div`
    width:331px;
    margin-top: 60px;
    background-color: gray;

    .travelTitle{
        width:331px;
        height:32px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #ddd;

        //background-color: aqua;
    }
    
    .travelDate{
        width:331px;
        height:32px;
        margin-top: 38px;
        border-bottom: 1px solid #ddd;
    }

    .travelPlace{
        width:331px;
        height:32px;
        margin-top: 38px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #ddd;
    }

    .goalExp{
        width:331px;
        height:52px;
        margin-top: 18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #ddd;
        //background-color: aqua;

        .goalExpText{
            color: #000;
            font-family: Pretendard;
            font-size: 9px;
            font-style: normal;
            font-weight: 600;
            //line-height: 150%; 
            opacity: 0.3;
            margin: 0;
        }

        .goalExpNum{
            color: #000;
            text-align: center;
            font-family: Pretendard;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            //line-height: 150%;
            margin: 0;
            margin-top: 10px;
        }
    }

    .realExp{
        width:375px;
        height:52px;
        margin-top: 18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #ddd;
        //background-color: aqua;

        .realExpText{
            color: #000;
            font-family: Pretendard;
            font-size: 9px;
            font-style: normal;
            font-weight: 600;
            line-height: 150%; 
            opacity: 0.3;
            margin: 0;
        }

        .realExpNum{
            color: #000;
            text-align: center;
            font-family: Pretendard;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 150%;
            margin: 0;
            margin-top: 10px;
        }
    }
`



const MembersSection = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    //align-items: center;
    margin-top:30px;
    background-color: aqua;
`;

const MemberItem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    font-size: 14px;

    .remove {
        color: red;
        cursor: pointer;
        margin-right: 10px;

        .minusCircle{
            width: 14px;
            height: 14px;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
            background-color: red;

            p{
                color: white;
                margin-top: 11px;
            }
        }
    }

    .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: lightgray;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: white;
    }

    .memberName{
        color: #000;
        font-family: Pretendard;
        font-size: 9px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%;
        margin-left: 10px;
    }
`;

const AddMemberButton = styled.div`
    width: 200px;
    height:30px;
    display: flex;
    flex-direction: row;
    //padding: 10px 0;
    cursor: pointer;
    margin-top: 30px;
    background-color: beige;

    .plusCircle{
            width: 14px;
            height: 14px;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
            background-color: black;
            margin:0;
            .plusLogo{
                color: white;
                margin-top: 13px;
            }
    }

    .plusText{
        width:100px;
        height:30px;
        background-color: red;
        margin: 0;
        margin-left: 10px;
        color: #000;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
        opacity:0.5;
    }
`;

export function TravelDetailEdit(){

    const [members, setMembers] = useState([
        "김김김",
        "이이이",
        "박박박",
        "최최최",
    ]);

    // const handleAddMember = () => {
    //     setMembers([...members, `새 멤버 ${members.length + 1}`]);
    // };

    const handleRemoveMember = (index) => {
        const updatedMembers = members.filter((_, i) => i !== index);
        setMembers(updatedMembers);
    };

    return(
        <EditContainor>
            <TitleAndBtn>
                <div className="material-symbols-outlined">
                    arrow_back_ios
                </div>
                <div className='title'>
                    <p>여행 정보 수정</p>
                </div>
                <div className='complete'>
                    <p>완료</p>
                </div>
            </TitleAndBtn>

            <TravelInfoEdit>
                <div className='travelTitle'>
                    <p>매드 크리스마스</p>
                </div>
                <div className='travelDate'>

                </div>
                <div className='travelPlace'>
                    <p>제주도</p>
                </div>
                <div className='goalExp'>
                    <p className='goalExpText'>목표금액</p>
                    <p className='goalExpNum'>600,000</p>
                </div>
                {/* <div className='realExp'>
                    <p className='realExpText'>지출금액</p>
                    <p className='realExpNum'>600,000</p>
                </div> */}

                <MembersSection>
                    {members.map((member, index) => (
                        <MemberItem key={index}>
                            <span className="remove" onClick={() => handleRemoveMember(index)}>
                                <div className='minusCircle'>
                                    <p>-</p>
                                </div>
                            </span>
                            <div className='avatar'>

                            </div>
                            <span className='memberName'>{member}</span>
                        </MemberItem>
                    ))}
                    <AddMemberButton>
                        <div className='plusCircle'>
                            <p className='plusLogo'>+</p>
                        </div>
                        <p className='plusText'>구성원 추가</p>
                    </AddMemberButton>
                </MembersSection>
            </TravelInfoEdit>
        </EditContainor>
    );
}