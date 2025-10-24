import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Cadastrar from "./pages/Cadastrar/Cadastrar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Historico from "./pages/Historico/Historico";
import Tickets from "./pages/ComprarTickets/Tickets";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/comprar_tickets" element={<Tickets />} />
    </Routes>
  );
}
