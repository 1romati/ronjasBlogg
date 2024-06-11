import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../firebase/authFunctions";
import { useAuth } from "../AuthContext";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signInUser(email, password);
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      setError("Det gick inte att logga in");
    }
  };

  return (
    <div className="authForm">
      <h2>Logga in</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
};

export default LoginComponent;
