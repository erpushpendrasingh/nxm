import React, { useEffect } from "react";
import { useState } from "react";

const Notes = () => {
     const [notes, setNotes] = useState("");

     useEffect(() => {
          fetch("http://localhost:8080/notes", {
               headers: {
                    Authorization: localStorage.getItem("token"),
               },
          })
               .then((res) => res.json())
               .then((res) => {
                    console.log(res);
                    setNotes(res);
               })
               .catch((err) => console.log(err));
     }, []);

     const deleteNote = (noteID) => {
          fetch(`http://localhost:8080/notes/delete/${noteID}`, {
               method: "DELETE",
               headers: {
                    "Authorization":localStorage.getItem("token")
               }
          });
     }

     return (
          <>
               <div>Note</div>
               {notes ? (
                    notes.map((item) => {
                         return (
                              <>
                                   <h3>Title:{item.title}</h3>
                                   <p>Note:{item.note}</p>
                                   <p>Category:{item.category}</p>
                                   <p>Author:{item.author}</p>
                                   <button onClick={()=>deleteNote(item._id)} >Delete</button>
                              </>
                         );
                    })
               ) : (
                    <h1>No Notes</h1>
               )}
          </>
     );
};

export default Notes;
