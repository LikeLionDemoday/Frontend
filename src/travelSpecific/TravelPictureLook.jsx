import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import styled from "styled-components"; 
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios.js";



export function TravelPictureLook(){
    const { tripId } = useParams();
    const initialIndex=2;
    
    const [tripData,setTripData]=useState([]);
    const [images,setImages]=useState([]);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const navigate = useNavigate();
    const fetchTripData=async()=>{
        try{
            //const response=await axios.get(`/trip/${tripId}`);
            const response=await axiosInstance.get(`/trip/1`);
            setTripData(response.data);
            setImages(response.data.data.photos);
            console.log(response);
        }catch(error){
            console.error("Error fetching travel data:", error);
        }
    }
    
    useEffect(()=>{
        fetchTripData();
    },[]);


    return (
        <TravelPictureLookContainor>
            <Title>
                <div className="tripName">{tripData.data?.tripName}</div>
                <div className="cancelBtn">
                    <div className="x" onClick={() => navigate(`/travel/detail/${tripId}`)}>X</div>  
                </div>
            </Title>

            <PictureContainor>
                {images.length > 0 && (
                    <>
                        <MainImage src={images[currentIndex].photoUrl} alt="Main travel" />
                        <ImageOverlay>
                            <div className="date">{images[currentIndex].expenseDate}</div>
                            <div className="description">
                                <div className="expenseName">{images[currentIndex].title}</div>
                                <div className="expensePrice">{images[currentIndex].amount?.toLocaleString()}원</div>
                            </div>
                            <div className="memo">{images[currentIndex].memo}</div>
                        </ImageOverlay>
                    </>

                )}
            </PictureContainor>

            <PictureListContainor>
                {images.map((image, index) => (
                        <Thumbnail 
                            key={index}
                            src={image.photoUrl}
                            isSelected={index === currentIndex}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
            </PictureListContainor>
        </TravelPictureLookContainor>
    );
}

const TravelPictureLookContainor=styled.div`
    width:100%;
    height:800px;
    //background-color:red;
`
const Title=styled.div`
    width:100%;
    height:30px;
    margin-top:68px;
    //background-color: beige;
    display: flex;
    /* flex-direction: row;
    justify-content: center;
    align-items: center; */
    //background-color: red;
    
    .tripName{
        width:160px;
        color: var(--Grayscale-9, #141414);
        text-align: center;
        font-family: "Pretendard Variable";
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 24px */
        margin-left: 120px;

        //background-color: blue;
    }

    .cancelBtn {
        width: 40px;
        height: 30px;
        .x {
            width: 24px;
            height: 24px;
            color: black;
            text-align: center;
            font-family: "Pretendard Variable";
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 150%;
        }

        margin-left: 80px;
        //background-color: blue;
    }
`;

const PictureContainor = styled.div`
    width: 100%;
    height: 550px;
    margin-top: 20px;
    border-radius: 25px;
    box-shadow: 22px 22px 22px 22px rgba(0, 0, 0, 0.06);
    //background-color: blue;
`

const PictureListContainor=styled.div`
    width:100%;
    height:45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 30px;
    border-radius: 25px;
    box-shadow: 22px 22px 22px 22px rgba(0, 0, 0, 0.06);
    //background-color: green;
`

const MainImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 25px;
`;

const Thumbnail = styled.img`
    width: 30px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-right: 10px;
    
    ${props => props.isSelected && `
        transform: scale(1.4);
        border: 2px solid #007AFF;
    `}

`

const ImageOverlay = styled.div`
    width:240px;
    height:72px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 157px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 20px;
    border-radius: 20px;
    text-align: center;
    //background-color: red;

    .date{
        width:200px;
        height:15px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--Grayscale-9, #141414);
        text-align: center;
        font-family: Pretendard;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 15px */
    }
    .description{
        width:200px;
        height:15px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        //background-color: red;
        color: var(--Grayscale-9, #141414);
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%;
        margin-top: 3px;
        gap: 2px;

        .expenseName{
            width:60px;
            height:15px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 20px;
            //background-color: blue;
        }

        .expensePrice{
            width:80px;
            height:15px;
            display: flex;
            //justify-content: center;
            align-items: center;
            //background-color: green;
        }
    }

    .memo{
        width:260px;
        //height:15px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--Grayscale-9, #141414);
        text-align: center;
        font-family: Pretendard;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 165%; /* 16.5px */
        margin-top: 3px;
        //background-color: blue;
    }

`
