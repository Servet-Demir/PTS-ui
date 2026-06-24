import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import BirimPage from "./pages/BirimPage";
import PersonelPage from "./pages/PersonelPage";
import MesaiPage from "./pages/MesaiPage";
import MaasPage from "./pages/MaasPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Navigate to="/birim" />} />
          <Route path="/birim" element={<BirimPage />} />
          <Route path="/personel" element={<PersonelPage />} />
          <Route path="/mesai" element={<MesaiPage />} />
          <Route path="/maas" element={<MaasPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;