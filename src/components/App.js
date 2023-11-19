import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import TopBar from "./TopBar";
import MoviesView from "./MoviesView";
import SeatsView from "./SeatsView";
import SucessView from "./SucessView";
import Teste from "./teste";

export default function App() {
  const [buyerData, setBuyerData] = useState({});
  const [sessionData, setSessionData] = useState({});

  function restartData() {
    setBuyerData({});
    setSessionData([]);
  }

  return (
    <main>
      <GlobalStyle />
      <TopBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoviesView />} />
          <Route path="/teste" element={<Teste />} />
          <Route
            path="/assentos/1"
            element={
              <SeatsView
                setBuyerData={setBuyerData}
                sessionData={sessionData}
                setSessionData={setSessionData}
              />
            }
          />
          <Route
            path="/sucesso"
            element={
              <SucessView
                buyerData={buyerData}
                sessionData={sessionData}
                restartData={restartData}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
