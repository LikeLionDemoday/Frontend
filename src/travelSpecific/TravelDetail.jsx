import styled from "styled-components";
import React, { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";

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
    width:375px;
    height:800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: whitesmoke;
    position: relative;

   
        
    .material-symbols-outlined.back-icon  {
        width:30px;
        height:20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
        margin-right: 310px;
        font-size:20px;
        color: gray;
        border: none;
    }
    
`;

const TravelInfoContainor=styled.div`
    width:375px;
    height:202px;
    background-color: #D9D9D9;
    opacity:0.3;
    margin-top:10px;

    .material-symbols-outlined.more-icon  {
        width:30px;
        height:20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 340px;
        font-size:20px;
        color:black;
        border: none;
    }

    .date{
        width:200px;
        height:13px;
        margin-top: 20px;
        background-color: blue;
    }

    .travelTitle{
        width:300px;
        height:31px;
        background-color:blue;
        margin-top: 10px;
    }

    .place{
        width:340px;
        height:21px;
        background-color: blue;
        margin-top: 10px;
    }
`;

const PeopleContainor=styled.div`
    width: 375px;
    height: 80px;
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    gap:10px;
    align-items: center;
    background-color:green;
`;

const PersonCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    

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

    .name {
        margin-top: 5px;
        font-size: 12px;
        color: black;
    }
`;

const PictureContainor=styled.div`
    width:345px;
    height:400px;
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px; 
    background-color: aqua;
`;

const PictureCard=styled.div`
    width:108px;
    height:108px;
    background-color: beige;
`;

const ModalContainer = styled.div`
    position: absolute;
    top: 160px;
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

export function TravelDetail(){
    const [isModalOpen, setModalOpen] = useState(false);
    const modalRef = useRef(null);
    const navigate=useNavigate();

    const toggleModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleItemClick=(path)=>{
        navigate(path);
    }
    
    return(
        <TravelDetailContainor onClick={closeModal}>
            <div className="material-symbols-outlined back-icon">
                arrow_back_ios
            </div>
        
            <TravelInfoContainor onClick={(e) => e.stopPropagation()}>
                <span class="material-symbols-outlined more-icon" onClick={toggleModal}>
                     more_horiz
                </span>
                <div className='date'>

                </div>
                <div className='travelTitle'>

                </div>
                <div className='place'>

                </div>
                <PeopleContainor>
                    {peopleResults.map((person, index) => (
                        <PersonCard key={index}>
                            <div className="avatar">{person.name.charAt(0)}</div>
                            <div className="name">{person.name}</div>
                        </PersonCard>
                    ))}
                </PeopleContainor>
               
            </TravelInfoContainor>

            <PictureContainor>
                {pictureResults.map((picture,index) => (
                    <PictureCard key={index}>
                        <p>{picture.name}</p>
                    </PictureCard>
                ))}
               
            </PictureContainor>

            <ModalContainer isOpen={isModalOpen} ref={modalRef}>
                <ModalItem onClick={()=>handleItemClick("/travel/detail/edit")}>편집</ModalItem>
                <ModalItem onClick={() => alert('삭제 기능')}>삭제</ModalItem>
                <ModalItem onClick={() => alert('공유 기능')}>공유</ModalItem>
            </ModalContainer>
        </TravelDetailContainor>
       
    );

}