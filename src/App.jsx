import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./Home";
import Servicos from "./Servicos";
import Projetos from "./Projetos";
import ProjetoDetalhes from "./ProjetoDetalhes";
import Contato from "./Contato";
import AnaliseConsumo from "./AnaliseConsumo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles.css";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* OCULTO TEMPORARIAMENTE */}
              {/* <Route path="/servicos" element={<Servicos />} /> */}
              <Route path="/projetos" element={<Projetos />} />
              <Route path="/projetos/:id" element={<ProjetoDetalhes />} />
              <Route path="/contato" element={<Contato />} />
              {/* OCULTO TEMPORARIAMENTE */}
              {/* <Route path="/analise" element={<AnaliseConsumo />} /> */}
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;

