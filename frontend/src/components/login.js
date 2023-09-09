import React, { useState } from "react";
import { useAuth } from "../authcontext";

const Login = () => {
  const { setLoggedIn, setToken } = useAuth();
  const [password, setPassword] = useState("");
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Send login credentials to the backend
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.status === 401) {
        setIncorrectGuesses(incorrectGuesses + 1);
      }

      if (!response.ok) {
        // Handle login error
        throw new Error("Login failed");
      }

      const data = await response.json();
      setToken(data.token);
      setLoggedIn(true);
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error);
    }
  };

  return (
    <label>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <input type="submit" value="Login" />
        {incorrectGuesses > 0 ? (
          <p className="form-error">{incorrectGuesses} incorrect guesses</p>
        ) : null}
      </form>
    </label>
  );
};

export default Login;
