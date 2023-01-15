import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateNotes from "../components/CreateNotes";
import Login from "../components/Login";
import Notes from "../components/Notes";
import Register from "../components/Register";

const MainRoutes = () => {
     return (
          <>
               <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/createnote" element={<CreateNotes />} />
                    <Route path="/notes" element={<Notes />} />
               </Routes>
          </>
     );
};

export default MainRoutes;
