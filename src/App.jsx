import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Sports from "./Pages/Sports";
import Members from "./Pages/Members";
import Subscriptions from "./Pages/Subscriptions";
import Addsport from "./componnents/Sport/Addsport";
import AddMemper from "./componnents/Member/AddMember";
import EditSport from "./componnents/Sport/EditSport";
import EditMember from "./componnents/Member/EditMember";
import Nav from "./componnents/Nav";

export default function App() {
  return (
    <BrowserRouter>
    < Nav/>
      <Routes>
        <Route path="/sports" element={<Sports />} />
        <Route path="/members" element={<Members />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/Addsport" element={<Addsport />} />
        <Route path="/AddMember" element={<AddMemper />} />
        <Route path="/edit-sport/:id" element={<EditSport />} />
        <Route path="/edit-member/:id" element={<EditMember />} />
      </Routes>
    </BrowserRouter>
  );
}
