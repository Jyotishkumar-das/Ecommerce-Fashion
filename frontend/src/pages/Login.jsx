import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ShopContext } from "../context/ShopContextProvider";

const Login = () => {
  const navigate = useNavigate();

  const { setToken } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    // Backend URL
    const backendUrl = import.meta.env.VITE_API_URL;

    // Select API endpoint
    const endpoint =
      currentState === "Sign Up"
        ? "/api/user/register"
        : "/api/user/login";

    // Select request body
    const body =
      currentState === "Sign Up"
        ? {
          name: name,
          email: email,
          password: password,
        }
        : {
          email: email,
          password: password,
        };

    try {
      const response = await fetch(
        `${backendUrl}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      console.log("Server Response:", data);

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (data.success) {
        localStorage.setItem("token", data.token);

        setToken(data.token);

        navigate("/");

        alert(
          currentState === "Sign Up"
            ? "Account created successfully"
            : "Login successful"
        );
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Connection Error:", error);

      alert("Unable to connect to server.");
    }
  };

  return (
    <div className="login-page">
      <form
        className="login-form"
        onSubmit={submitHandler}
      >
        <h1>
          {currentState}
          <span> —</span>
        </h1>

        {currentState === "Sign Up" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="login-links">
          <span>Forgot your password?</span>

          <span
            onClick={() => {
              setCurrentState(
                currentState === "Sign Up"
                  ? "Login"
                  : "Sign Up"
              );

              setName("");
              setEmail("");
              setPassword("");
            }}
          >
            {currentState === "Sign Up"
              ? "Login Here"
              : "Create Account"}
          </span>
        </div>

        <button type="submit">
          {currentState}
        </button>
      </form>
    </div>
  );
};

export default Login;