import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../firebase/authFunctions";
import { useAuth } from "../AuthContext";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUser(email, password);
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      setError("Det gick inte att skapa ett konto");
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
        <button type="submit">Registrera dig</button>
      </form>
    </div>
  );
};

export default RegisterComponent;
