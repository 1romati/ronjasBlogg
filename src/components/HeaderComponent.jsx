import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { signOutUser } from "../firebase/authFunctions";

const HeaderComponent = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <header>
      <nav className="header">
        {currentUser ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/my-posts">Nytt inlägg</Link>
            <button onClick={handleLogout}>Logga ut</button>
            <span>Logged in as: {currentUser.email}</span>
          </>
        ) : (
          <>
            <Link to="/login">Logga in</Link>
            <Link to="/register">Registera dig</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default HeaderComponent;
