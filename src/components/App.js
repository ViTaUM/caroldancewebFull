import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import TopBar from "./TopBar";
import MoviesView from "./MoviesView";
import SeatsView from "./SeatsView";
import SucessView from "./SucessView";
import Relatorio from "./Relatorio";
import Qrcode from "./qrcode1";

export default function App() {
  const [buyerData, setBuyerData] = useState({});

  function restartData() {
    setBuyerData({});
  }

  return (
    <main>
      <GlobalStyle />
      <TopBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoviesView />} />
          <Route path="/relatorio" element={<Relatorio />} />
          <Route
            path="/assentos/1"
            element={<SeatsView setBuyerData={setBuyerData} overview={1} />}
          />
          <Route
            path="/assentos/2"
            element={<SeatsView setBuyerData={setBuyerData} overview={2} />}
          />
          <Route
            path="/avulso"
            element={<SeatsView setBuyerData={setBuyerData} avulso={true} />}
          />
          <Route
            path="/sucesso"
            element={
              <SucessView buyerData={buyerData} restartData={restartData} />
            }
          />
          <Route path="/qrcode" element={<Qrcode />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
