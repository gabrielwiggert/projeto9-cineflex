import Sessao from "../Sessao";
import Assento from "../Assento";
import Sucesso from "../Sucesso";
import Inicio from "../Inicio";
import Header from '../Header';


import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Sessao/:idMovie" element={<Sessao />} />
        <Route path="/Assento/:idSession" element={<Assento />} />
        <Route path="/Sucesso" element={<Sucesso />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;