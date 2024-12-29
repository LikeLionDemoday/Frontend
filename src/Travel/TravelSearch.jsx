import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackwardIcon } from "../icons/backward.svg";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import axiosInstance from "../api/axios.js";

const TravelSearch = () => {

    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [travelList, setTravelList] = useState([]);
  
  //   // 여행 더미 데이터
  //   const travelList = [
  //     {
  //       "tripId": 1,
  //       "name": "우정 여행",
  //       "startDate": "2024-11-15",
  //       "endDate": "2024-11-17"
  //   },
  //   {
  //       "tripId": 2,
  //       "name": "우정 여행2",
  //       "startDate": "2023-11-15",
  //       "endDate": "2023-11-17"
  //   },
  //   {
  //     "tripId": 3,
  //     "name": "우정 여행3",
  //     "startDate": "2024-11-15",
  //     "endDate": "2024-11-17"
  // },
  // ];


    useEffect(() => {
        // 데이터 가져오기
        axiosInstance.get("/trip/search")
          .then(response => {
            if (response.status === 200) {
              setTravelList(response.data.data);
            }
          })
          .catch(error => {
            console.error("Error fetching travel data:", error);
          });
      }, []);
  
    // 검색 함수, Enter 눌렀을 때 검색, 클릭할때 검색
    const handleSearch = () => {
        const filteredResults = travelList.filter((travel) =>
          travel.tripName.includes(query) || travel.startDate.slice(0, 4) === query
        );
        setResults(filteredResults);
      };
    
      const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      };
  
    return (
      <Container>
        <Header>
          <BackButton onClick={ () => {navigate(`/tripMain`)}}>
              <BackwardIcon />
          </BackButton>
          <SearchBar>
            <Input
              placeholder="여행명,여행년도(YYYY)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          <SearchButton onClick={handleSearch}>
            <SearchIcon />
          </SearchButton>
          </SearchBar>
        </Header>

        <List>
          {results.map((travel, index) => (
            <ListItem key={index} travel={travel} />
          ))}
        </List>
      </Container>
    );
  };
  
  const ListItem = ({ travel }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/travel/detail/${travel.tripId}`);
    };

    return (
      <Item onClick={handleClick}>
        <ListName>{travel.tripName}</ListName>
        <ListDate>
          {travel.startDate} - {travel.endDate}
        </ListDate>
      </Item>
    );
  };
  
  const Container = styled.div`
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    padding: 0px;
    background-color: #fff;
    border: none;
  `;
  

  const Header = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    background: #fff;
  `;

  const SearchBar = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 8px;
    margin-bottom: 20px;
    margin-top: 26px;
  `;

  const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

  
  const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  padding: 0;
  display: flex;
  align-items: center;
    `;

  
  const Input = styled.input`
    width: 100%;
    border: none;
    background: none;
    outline: none;
    font-size: 16px;
  `;
  
  const List = styled.div`
    display: flex;
    flex-direction: column;
  `;
  
  const Item = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    width: 331px;
    height: 52px;
    padding: 0px 6px ;
    align-items: center;
  `;
  

 const ListName = styled.span`
  color: var(--Grayscale-7, #474747);
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  `;

const ListDate = styled.span`
  color: var(--Grayscale-5, #7A7A7A);
  text-align: right;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
`;



export default TravelSearch;
