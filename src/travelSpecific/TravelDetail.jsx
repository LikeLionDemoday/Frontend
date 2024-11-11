import styled from "styled-components";
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

   
        
    .material-symbols-outlined{
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

    .date{
        width:200px;
        height:13px;
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

export function TravelDetail(){
    return(
        <TravelDetailContainor>
            <button className="material-symbols-outlined">
                arrow_back_ios
            </button>
        
            <TravelInfoContainor>
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
        </TravelDetailContainor>
       
    );

}