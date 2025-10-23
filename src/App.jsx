import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Sports from "./Pages/Sports";
import Members from "./Pages/Members";
import Subscriptions from "./Pages/Subscriptions";
import Addsport from "./componnents/Sport/Addsport";
import AddMemper from "./componnents/Member/AddMember";
import EditSport from "./componnents/Sport/EditSport";
import EditMember from "./componnents/Member/EditMember";

export default function App() {
  return (
    <BrowserRouter>
      <nav className=" fixed  text-amber-100 px-17 py-3 flex justify-center items-center gap-7 w-full ">
        <Link to="/sports">Sports</Link>
        <Link to="/members">Members</Link>
        <Link to="/subscriptions">Subscriptions</Link>
      </nav>
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
