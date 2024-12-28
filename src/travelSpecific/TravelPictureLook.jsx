import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import styled from "styled-components"; 
import { useNavigate } from "react-router-dom";
import dummyImage1 from '../asset/dummy1.png'; 
import dummyImage2 from '../asset/dummy2.png';
import dummyImage3 from '../asset/dummy3.png';

const dummyImages = [
    { url: dummyImage1 },
    { url: dummyImage2 },
    { url: dummyImage3 }
];


export function TravelPictureLook(){
    const navigate = useNavigate();
    const { tripId } = useParams();
    const initialIndex=2;
    const navigate = useNavigate();
    const [tripData,setTripData]=useState([]);
    const [images,setImages]=useState([]);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // const fetchTripData=async()=>{
    //     try{
    //         const response=await axios.get(`/trip/${tripId}`);
    //         setTripData(response.data);
    //         setImages(response.data.photos);
    //         console.log(response);
    //     }catch(error){
    //         console.error("Error fetching travel data:", error);
    //     }
    // }
    
    // useEffect(()=>{
    //     fetchTripData();
    // },[]);

    useEffect(() => {
        // API 호출 대신 더미 데이터 사용
        setImages(dummyImages);
    }, []);

    return(
        <TravelPictureLookContainor>
            <Title>
                <div className="tripName">여행명</div>
                <div className="cancelBtn">
                   <div className="x" onClick={() => {navigate(`/travel/detail/${tripId}`)}}>X</div>  
                </div>
            </Title>

            <PictureContainor>
                {images.length > 0 && (
                        <MainImage src={images[currentIndex].url} alt="Main travel" />
                    )}
            </PictureContainor>

            <PictureListContainor>
                {images.map((image, index) => (
                        <Thumbnail 
                            key={index}
                            src={image.url}
                            isSelected={index === currentIndex}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
            </PictureListContainor>
        </TravelPictureLookContainor>
    )
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
    //justify-content: center;
    //align-items: center;
    
    .tripName{
        width:100px;
        color: var(--Grayscale-9, #141414);
        text-align: center;
        font-family: "Pretendard Variable";
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 24px */
        margin-left: 135px;
        //background-color: blue;
    }

    .cancelBtn{
        width:40px;
        height:30px;
        .x{
            width: 24px;
            height: 24px;
            color: black;
            text-align: center;
            font-family: "Pretendard Variable";
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 150%; /* 24px */
        }

        margin-left: 100px;
        //background-color: blue;
    }
`

const PictureContainor=styled.div`
    width:100%;
    height:550px;
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
`

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
