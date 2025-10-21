import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Sports from "./Pages/Sports";
import Members from "./Pages/Members";
import Subscriptions from "./Pages/Subscriptions";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/sports">Sports</Link> |
        <Link to="/members">Members</Link> |
        <Link to="/subscriptions">Subscriptions</Link>
      </nav>
      <Routes>
        <Route path="/sports" element={<Sports/>} />
        <Route path="/members" element={<Members />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
    </BrowserRouter>
  );
}
