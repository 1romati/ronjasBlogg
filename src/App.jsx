import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MyPostsPage from "./components/MyPostsPage";
import HeaderComponent from "./components/HeaderComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { BlogProvider } from "./BlogContext";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <BlogProvider>
            <HeaderComponent />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/my-posts" element={<MyPostsPage />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/register" element={<RegisterComponent />} />
            </Routes>
          </BlogProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
