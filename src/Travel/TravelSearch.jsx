import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackwardIcon } from "../icons/backward.svg";
import { ReactComponent as SearchIcon } from "../icons/search.svg";

const TravelSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
  

    // 여행 더미 데이터
    const travelList = [
      { name: "여행명1", startDate: "12.15", endDate: "12.16" },
      { name: "여행명2", startDate: "12.15", endDate: "12.16" },
      { name: "여행명3", startDate: "12.15", endDate: "12.16" },
      { name: "여행명4", startDate: "12.15", endDate: "12.16" },
      { name: "여행명5", startDate: "12.15", endDate: "12.16" },
    ];
  
    // 검색 함수, Enter 눌렀을 때 검색, 클릭할때 검색
    const handleSearch = () => {
        const filteredResults = travelList.filter((travel) =>
          travel.name.includes(query)
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
        <SearchBar>
          <BackButton>
            <BackwardIcon />
          </BackButton>
          <Input
            placeholder="여행명, 날짜, 구성원으로 검색하세요."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        <SearchButton onClick={handleSearch}>
          <SearchIcon />
        </SearchButton>
        </SearchBar>
        <List>
          {results.map((travel, index) => (
            <ListItem key={index} travel={travel} />
          ))}
        </List>
      </Container>
    );
  };
  
  const ListItem = ({ travel }) => (
    <Item>
      <span>{travel.name}</span>
      <span>
        {travel.startDate} - {travel.endDate}
      </span>
    </Item>
  );
  
  const Container = styled.div`
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    padding: 0px;
    background-color: #fff;
    border: none;
  `;
  
  const SearchBar = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 8px;
    margin-bottom: 20px;
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
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  `;
  
export default TravelSearch;