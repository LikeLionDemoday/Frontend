import styled from "styled-components";
import React, { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import  axiosInstance  from "../api/axios.js";
import { useParams } from "react-router-dom";
import BalanceSummaryJewon from "../Components/BalanceSummaryJewon.jsx"

const pictureResults=[
    {name: '사진1'},
    {name: '사진2'},
    {name: '사진3'},
    {name: '사진4'},
    {name: '사진5'},
    {name: '사진6'},
    {name: '사진7'},
];

const peopleResults = [
    { name: '김길동' },
    { name: '이이이' },
    { name: '박박박' },
    { name: '이이이' },
    { name: '최최최' },
    { name: '최최최' },
    { name: '오오오' },

    
];

const dummyTripData = {
    budget: 500000,
    remainingCost: 130000,
    categories: [
        {
            category: "식사",
            cost: 150000
        },
        {
            category: "간식",
            cost: 40000
        },
        {
            category: "교통",
            cost: 80000
        },
        {
            category: "숙소",
            cost: 100000
        },
        {
            category: "활동",
            cost: 60000
        },
        {
            category: "기타",
            cost: 50000
        }
    ],
    members: [
        {
            memberId: 1,
            nickName: "예송"
        },
        {
            memberId: 2,
            nickName: "홍엽"
        },
        {
            memberId: 3,
            nickName: "철우"
        }
    ]
};

const TravelDetailContainor =styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //background-color: whitesmoke;
    position: relative;

    .Btns{
        width:331px;
        height:25px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top:68px;
        //background-color: rebeccapurple;

        .material-symbols-outlined.back-icon  {
        width:30px;
        height:20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size:20px;
        color: gray;
        border: none;
    }
    
    
    
        .material-symbols-outlined.more-icon  {
            width:30px;
            height:20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-left: 290px;
            font-size:20px;
            color:black;
            border: none;
            margin-right:30px;
        }
    }
`;

const TravelInfoContainor=styled.div`
    width:331px;
    height:202px;
    //background-color: blue;
    //opacity:0.3;
    margin-top:10px;
    border-bottom: 1px solid var(--Grayscale-1, #E0E0E0);
    display: flex;
    flex-direction: row;

    .date{
        width:200px;
        height:13px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        //align-items: center;
        color: var(--Grayscale-5, #7A7A7A);
        font-family: Pretendard;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 18px */
        //background-color: blue;
    }

    .travelTitle{
        width:150px;
        height:31px;
        //background-color:blue;
        p{
            //color: var(--Grayscale-9, #141414);
            //color: black;
            font-family: Pretendard;
            font-size: 18px;
            font-weight: bold;
            color: #141414;
            line-height: 150%; /* 27px */
        }
        margin-top: 10px;
    }

    .place{
        width:187px;
        height:21px;
        //background-color: blue;
        margin-top: 10px;
        color: var(--Grayscale-5, #7A7A7A);
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 21px */
    }
`;

// const PeopleContainor=styled.div`
//     width: 200px;
//     height: auto;
//     margin-top: 20px;
//     display: grid;
//     grid-template-columns: repeat(4, 1fr); /* 4개의 동일한 크기의 열 생성 */
//     gap: 5px; /* 그리드 아이템 사이의 간격 */
//     align-items: center;
//     background-color:green;
// `;

const PeopleContainor = styled.div`
    width: 200px;  // 너비를 줄임
    height: auto;
    margin-top: 10px;  // 상단 여백 줄임
    display: flex;  // grid 대신 flex 사용
    flex-wrap: wrap;  // 여러 줄로 나누기
    gap: 5px;  // 작은 간격 설정
    align-items: center;
    justify-content: flex-start;  // 왼쪽 정렬
    //background-color:green;
`;

const PersonCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    //min-width: 60px;  // 최소 너비 설정
    //margin-right: 5px;  // 오른쪽 간격


    .name {
        margin-top: 5px;
        font-size: 12px;
        color: black;
    }
`;

const TripPic=styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-top: 20px;
    margin-left: 50px;

    img{
        width: 90px;
        height: 90px;
        border-radius: 50%;
    }
    //background-color: blue;
`;

const ExpContainor=styled.div`
    width:331px;
    height:200px;
    margin-top: 33px;
    border-bottom: 1px solid var(--Grayscale-1, #E0E0E0);
    //background-color: forestgreen;
`

const PictureContainor=styled.div`
    width:331px;
    height:auto;
    margin-top: 0px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* display: flex;
    flex-wrap: wrap; */
    column-gap:8px; //세로간격
    row-gap:12px;  //가로간격
    //background-color: aqua;

    .plusExp{
        width:77px;
        height:108px;
        margin: 0;
        border-radius: 12px;
        background-color: beige;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: black;

        .plusCircle{
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: red;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;

            p{
                margin-bottom: 2px;
            }
        }
    }

    .nothingAlert{
        width:120px;
        color: var(--Grayscale-5, #7A7A7A);
        font-family: Pretendard;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 18px */

        margin-left: 120px;
        margin-top: 100px;
    }
`;

const PictureCard=styled.div`
    width:77px;
    height:108px;
    margin: 0;
    border-radius: 12px;
    background-color: beige;

    img{
        width: 77px;
        height: 108px;
        border-radius: 12px;
    }
`;

const ModalContainer = styled.div`
    position: absolute;
    top: 100px;
    right: 5px;
    width: 120px;
    background-color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 10px 0;
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const ModalItem = styled.div`
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    color: #333;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`; //삭제 확인 창 배경

const ConfirmationModal = styled.div`
  width:331px;
  height:139px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 280px;
  text-align: center;
  z-index: 1000;

  .buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 20px;
  }

  button {
    padding: 8px 24px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
  }

  .cancel {
    background: #E0E0E0;
  }

  .confirm {
    //margin-left: 10px;
    background: #FF5C00;
    color: white;
  }
`;

export function TravelDetail(){
    const [isModalOpen, setModalOpen] = useState(false);
    const modalRef = useRef(null);
    const navigate=useNavigate();
    const [tripData,setTripData]=useState([]);
    const [tripDataExpense,setTripDataExpense]=useState([]); //여행 지출 관리
    const { tripId } = useParams();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); //삭제 확인 창 열기

    const fetchTripDataExpense=async()=>{ //이거 해야
        try{
            //const response=await axiosInstance.get(`/trip/${tripId}/expense`);
            const response=await axiosInstance.get(`/trip/1/expense`);
            setTripDataExpense(response.data.data);
            console.log(response);
        }catch(error){
            console.error("Error fetching travel data:", error);
        }
    }

    const categoryOrder = ["숙소", "교통", "식사", "활동", "기타"];

    const categoryColors = {
        "숙소": "#F0F0F0",
        "교통": "#C7C7C7",
        "식사": "#949494",
        "활동": "#616161",
        "기타": "#2E2E2E"
    };


    const formatCategories = (categories) => {
        if (!categories) return [];
        
        // 정해진 순서대로 카테고리 정렬
        const sortedCategories = categoryOrder.map(orderCat => {
            const found = categories.find(cat => cat.expenseCategory === orderCat);
            return found ? {
                name: found.expenseCategory,
                amount: found.cost,
                color: categoryColors[found.expenseCategory]
            } : {
                name: orderCat,
                amount: 0,
                color: categoryColors[orderCat]
            };
        });

        // 금액이 0인 카테고리 제외
        return sortedCategories.filter(cat => cat.amount > 0);
    };


    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleItemClick=(path)=>{
        navigate(path);
    }

    const handlePictureClick = (index) => {
        navigate(`/travel/pictureLook/${tripId}`, { 
            state: { selectedIndex: index } // 선택된 인덱스만 전달
        });
    };

   

    const fetchTripData=async()=>{ 
        try{
            //const response=await axiosInstance.get(`/trip/${tripId}`);
            const response=await axiosInstance.get(`/trip/1`);
            setTripData(response.data);
            console.log(response);
        }catch(error){
            console.error("Error fetching travel data:", error);
        }
    }

    const handleDeleteConfirm=async()=>{
        try{
            const response=await axiosInstance.delete(`/trip/5`);
            handleItemClick("/tripMain");
            console.log(response);
        }catch(error){
            console.error("Error deleting travel data:", error);
        }
    }
    
    useEffect(()=>{
        fetchTripData();
        fetchTripDataExpense();
    },[]);

    // useEffect(() => {
    //     // 데이터 확인용 콘솔 로그
    //     console.log("Formatted Categories:", formatCategories(tripDataExpense.categories));
    // }, []);


    return( //만약 다른곳 눌러서 모달창 없애고 싶으면 TravelDetailContainor onClick={closeModal} 추가 
        <TravelDetailContainor> 
            <div className="Btns">
                <div className="material-symbols-outlined back-icon" onClick={ () => {navigate(`/tripMain`)}}>
                    arrow_back_ios
                </div>

                <span class="material-symbols-outlined more-icon" onClick={(e) => {
                    e.stopPropagation(); // 부모로 이벤트 전파 방지
                    toggleModal();
                }}>
                    more_horiz
                </span>
            </div>

            <TravelInfoContainor>
                <div className="left">
                    <div className='date'>
                        <p>{tripData.data?.startDate} ~ {tripData.data?.endDate}</p>
                    </div>
                    <div className='travelTitle'>
                        <p>{tripData.data?.tripName}</p>
                    </div>
                    <div className='place'>
                        <p>{tripData.data?.place}</p>
                    </div>
                    <PeopleContainor>
                        {tripData.data?.members?.map((person, index) => (
                            <PersonCard key={index}>
                                {/* <div className="avatar">{person.name.charAt(0)}</div> */}
                                <div className="name">{person.nickName}</div>
                            </PersonCard>
                        ))}
                    </PeopleContainor>
                </div>
                <div className="right">
                  <TripPic>
                    <img src={tripData.data?.tripImageUrl}/>
                  </TripPic>
                </div>
            </TravelInfoContainor>
            

            <ExpContainor>
                <BalanceSummaryJewon 
                  initialAmount={tripDataExpense.budget}
                  categories={formatCategories(tripDataExpense.categories)}
                />
            </ExpContainor>

            <PictureContainor>
    
            {tripData.data?.photos?.length > 0 ? (
                tripData.data?.photos?.map((picture, index) => (
                    <PictureCard key={index} onClick={()=>handlePictureClick(index)}>
                        <img src={picture.photoUrl} alt={`Picture ${index}`} />
                    </PictureCard>
                ))
            ) : (
                <div className='nothingAlert'>사진 기록이 없습니다</div>
            )}
               
            </PictureContainor>

            <ModalContainer isOpen={isModalOpen} ref={modalRef}>
                <ModalItem onClick={()=>handleItemClick(`/travel/detail/edit/${tripId}`)}>편집</ModalItem>
                {/* <ModalItem onClick={()=>handleItemClick(`/travel/detail/edit`)}>편집</ModalItem> */}  
                <ModalItem onClick={() => setShowDeleteConfirm(true)}>삭제</ModalItem>
                <ModalItem onClick={ () => {navigate(`/trip/join/${tripId}`)}}>공유</ModalItem>
            </ModalContainer>

            {showDeleteConfirm && (
                <>
                <Overlay/>
                <ConfirmationModal>
                    <p>정말로 삭제하시겠습니까?</p>

                    <div className="buttons">
                        <button className="cancel" onClick={() => setShowDeleteConfirm(false)}>취소</button>
                        {/* <button className="confirm">확인</button> */}
                        <button className="confirm" onClick={handleDeleteConfirm}>확인</button>
                    </div>
                    
                </ConfirmationModal>
                </>
            )}
        </TravelDetailContainor>
       
    );

}