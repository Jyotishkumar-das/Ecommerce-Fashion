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

    const backendUrl =
      import.meta.env.VITE_API_URL || "http://localhost:4000";

    const endpoint =
      currentState === "Sign Up"
        ? "/api/user/register"
        : "/api/user/login";

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
      console.log("Sending Authentication:", body);

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

      // Read response as text first
      const responseText = await response.text();

      console.log("Login HTTP Status:", response.status);
      console.log("Login Raw Response:", responseText);

      let data = {};

      // Convert response to JSON only if something was returned
      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error(
            "Invalid JSON from server:",
            parseError
          );

          alert(
            `Server returned an invalid response. HTTP Status: ${response.status}`
          );

          return;
        }
      }

      console.log("Login API Response:", data);

      // Check HTTP status
      if (!response.ok) {
        alert(
          data.message ||
          `Authentication failed. HTTP Status: ${response.status}`
        );
        return;
      }

      // Check API success
      if (!data.success) {
        alert(
          data.message ||
          "Authentication failed"
        );
        return;
      }

      // Make sure token exists
      if (!data.token) {
        console.error("Token missing from server response");

        alert("Login successful, but token was not received.");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Update context
      setToken(data.token);

      console.log("Token saved successfully");

      // Go home
      navigate("/");

      alert(
        currentState === "Sign Up"
          ? "Account created successfully"
          : "Login successful"
      );
    } catch (error) {
      console.error("Connection Error:", error);

      alert(
        error.message ||
        "Unable to connect to server."
      );
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
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
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