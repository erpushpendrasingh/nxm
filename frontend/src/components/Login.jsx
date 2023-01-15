import React from "react";
import { useState } from "react";

const Login = () => {
     const [email, setEmail] = useState("");
     const [pass, setPass] = useState("");
     const register = () => {
          const payload = {
               email,
               pass,
          };
          console.log(payload);
          fetch("http://localhost:8080/user/login", {
               method: "POST",
               body: JSON.stringify(payload),
               headers: {
                    "Content-type": "application/json",
               },
          })
               .then((res) => res.json())
               .then((res) => {
                    console.log("res:", res);
                    localStorage.setItem("token", res.token);
               })

               .catch((err) => console.log(err));
     };
     return (
          <>
               <div>Login</div>
               <input
                    type="text"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
               />
               <input
                    type="password"
                    placeholder="Enter Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
               />
               <button onClick={register}>Submit</button>
          </>
     );
};

export default Login;
