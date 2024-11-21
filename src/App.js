

import React from "react";
import { useEffect } from "react";
import { reset } from "styled-reset";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./fonts/Pretendard.css";
import { createGlobalStyle } from "styled-components";

import { DayCost } from "./Components/DayCost";
import { DummyData } from "./Components/DummyData";
import TravelCreate from "./Travel/TravelCreate";
import TravelMain from "./Travel/TravelMain";
import TravelSearch from "./Travel/TravelSearch";
import { TravelDetail } from "./travelSpecific/TravelDetail";
import { TravelDetailEdit } from "./travelSpecific/TravelDetailEdit";
import { AnalysisExp } from "./expAdd/AnalysisExp";

function App() {

  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <>
    <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/trip" element={<TravelCreate />} />
          <Route path="/tripSearch" element={<TravelSearch />} />
          <Route path="/tripMain" element={<TravelMain />} />
          <Route path="/DummyData" element={<DummyData />} />
          <Route path='/travel/detail' element={<TravelDetail />} />
          <Route path='/travel/detail/edit' element={<TravelDetailEdit />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;

const GlobalStyle = createGlobalStyle`
  ${reset}
  #root{
    max-width: 375px;
    height: var(--app-height, 100vh);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Pretendard";
    padding: 20px 20px 0;
    background-color: #fff;
    border: 2px solid #f4f4f4;
  }
`

