import React from "react";
import { useState } from "react";

const CreateNotes = () => {
     const [title, setTitle] = useState("");
     const [note, setNotes] = useState("");
     const [category, setCategory] = useState("");
     const [author, setAuthor] = useState("");
     const register = () => {
          const payload = {
               title,
               note,
               category,
               author,
          };
          console.log(payload);
          fetch("http://localhost:8080/notes/create", {
               method: "POST",
               body: JSON.stringify(payload),
               headers: {
                    "Content-type": "application/json",
                    Authorization: localStorage.getItem("token"),
               },
          })
               .then((res) => res.json())
               .then((res) => console.log(res))
               .catch((err) => console.log(err));
     };

     return (
          <>
               <div>Create Note</div>
               <input
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
               />
               <input
                    type="text"
                    placeholder="Enter Notes"
                    value={note}
                    onChange={(e) => setNotes(e.target.value)}
               />

               <input
                    type="text"
                    placeholder="Enter Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
               />
               <input
                    type="text"
                    placeholder="Enter Author Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
               />
               <button onClick={register}>Add Notes</button>
          </>
     );
};

export default CreateNotes;
