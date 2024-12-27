import styled from "styled-components";
import React, { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axios";
import { useParams } from "react-router-dom";
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
    { name: 'D' },
    { name: '최최최' },
    { name: '최최최' },
    { name: 'D' },

    
];

const TravelDetailContainor =styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: whitesmoke;
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
    //background-color: #D9D9D9;
    opacity:0.3;
    margin-top:10px;
    border-bottom: 1px solid var(--Grayscale-1, #E0E0E0);
    display: flex;
    flex-direction: row;

    .date{
        width:70px;
        height:13px;
        margin-top: 20px;
        background-color: blue;
    }

    .travelTitle{
        width:150px;
        height:31px;
        background-color:blue;
        margin-top: 10px;
    }

    .place{
        width:187px;
        height:21px;
        background-color: blue;
        margin-top: 10px;
    }
`;

const PeopleContainor=styled.div`
    width: 150px;
    height: auto;
    margin-top: 20px;
    /* display: flex;
    justify-content: flex-start;
    gap:10px; */
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4개의 동일한 크기의 열 생성 */
    gap: 5px; /* 그리드 아이템 사이의 간격 */
    align-items: center;
    //background-color:green;
`;

const PersonCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    

    /* .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: lightgray;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: white;
    } */

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
    margin-left: 60px;
    background-color: blue;
`;

const ExpContainor=styled.div`
    width:331px;
    height:102px;
    margin-top: 70px;
    background-color: forestgreen;
`

const PictureContainor=styled.div`
    width:331px;
    height:auto;
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* display: flex;
    flex-wrap: wrap; */
    column-gap:8px; //세로간격
    row-gap:12px;  //가로간격
    background-color: aqua;

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
    const { tripId } = useParams();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); //삭제 확인 창 열기

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
        navigate(`/travel/pictures/${tripId}`, { 
            state: { selectedIndex: index } // 선택된 인덱스만 전달
        });
    };
    
    // const fetchTripData=async()=>{
    //     try{
    //         const response=await axios.get(`/trip/${tripId}`);
    //         setTripData(response.data);
    //         console.log(response);
    //     }catch(error){
    //         console.error("Error fetching travel data:", error);
    //     }
    // }

    // const handleDeleteConfirm=async()=>{
    //     try{
    //         const response=await axiosInstance.delete(`/trip/${tripId}`);
    //         handleItemClick("/tripMain");
    //         console.log(response);
    //     }catch(error){
    //         console.error("Error deleting travel data:", error);
    //     }
    // }
    
    // useEffect(()=>{
    //     fetchTripData();
    // },[]);

    return( //만약 다른곳 눌러서 모달창 없애고 싶으면 TravelDetailContainor onClick={closeModal} 추가 
        <TravelDetailContainor> 
            <div className="Btns">
                <div className="material-symbols-outlined back-icon">
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
                        {/* <p>{tripData.startDate} ~ {tripData.endDate}</p> */}
                    </div>
                    <div className='travelTitle'>
                        {/* <p>{tripData.name}</p> */}
                    </div>
                    <div className='place'>
                        {/* <p>{tripData.place}</p> */}
                    </div>
                    <PeopleContainor>
                        {peopleResults.map((person, index) => (
                            <PersonCard key={index}>
                                {/* <div className="avatar">{person.name.charAt(0)}</div> */}
                                <div className="name">{person.name}</div>
                            </PersonCard>
                        ))}
                    </PeopleContainor>
                </div>
                <div className="right">
                  <TripPic>

                  </TripPic>
                </div>
            </TravelInfoContainor>
            

            <ExpContainor>
                
            </ExpContainor>

            <PictureContainor>
            {/* <div className="plusExp" onClick={()=>handleItemClick("/expAdd")}>
                <div className="plusCircle">
                    <p>+</p>
                </div>
            </div> */}
            {pictureResults.length > 0 ? (
                pictureResults.map((picture, index) => (
                    <PictureCard key={index} onClick={()=>handlePictureClick(index)}>
                        <p>{picture.name}</p>
                    </PictureCard>
                ))
            ) : (
                <div className='nothingAlert'>사진 기록이 없습니다</div>
            )}
               
            </PictureContainor>

            <ModalContainer isOpen={isModalOpen} ref={modalRef}>
                <ModalItem onClick={()=>handleItemClick("/travel/detail/edit")}>편집</ModalItem>
                <ModalItem onClick={() => setShowDeleteConfirm(true)}>삭제</ModalItem>
                <ModalItem onClick={() => alert('공유 기능')}>공유</ModalItem>
            </ModalContainer>

            {showDeleteConfirm && (
                <>
                <Overlay/>
                <ConfirmationModal>
                    <p>정말로 삭제하시겠습니까?</p>

                    <div className="buttons">
                        <button className="cancel" onClick={() => setShowDeleteConfirm(false)}>취소</button>
                        <button className="confirm">확인</button>
                        {/* <button onClick={handleDeleteConfirm}>확인</button> */}
                    </div>
                    
                </ConfirmationModal>
                </>
            )}
        </TravelDetailContainor>
       
    );

}