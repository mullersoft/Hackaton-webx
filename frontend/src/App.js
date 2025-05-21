import { Form } from "react-router-dom";
import "./App.css";
import { useRef } from "react";
import axios from "axios";

function App() {
  const userNameDom = useRef(),
    emailDom = useRef(),
    passwordDom = useRef();
  const signUpHandling = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000", {
        username: userNameDom.current.value,
        email: emailDom.current.value,
        password: passwordDom.current.value,
      });
      alert("User registered successfully!");
      console.log(data);
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed.");
    }
  };
  return (
    <>
      <Form onSubmit={signUpHandling}>
        <div>
          <input
            name="userName"
            ref={userNameDom}
            type="text"
            placeholder="User name"
          />
        </div>
        <div>
          <input
            name="email"
            ref={emailDom}
            type="email"
            placeholder="User name"
          />
        </div>
        <div>
          <input
            name="password"
            ref={passwordDom}
            type="password"
            placeholder="User name"
          />
        </div>
      </Form>
    </>
  );
}

export default App;
