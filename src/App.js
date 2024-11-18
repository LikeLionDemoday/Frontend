import React from "react";
import { useEffect } from "react";
import { reset } from "styled-reset";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./fonts/Pretendard.css";
import { createGlobalStyle } from "styled-components";

import { DayCost } from "./Components/DayCost";
import { DummyData } from "./Components/DummyData";

function App() {
  return (
    <>
    <GlobalStyle />
      <Router>
        <Routes>
          <DummyData/>
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
