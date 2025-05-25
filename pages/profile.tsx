import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Cek login (dummy logic, bisa diganti dengan cek token, context, dll.)
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  if (!isLoggedIn) return null;

  return <div>Welcome to your profile!</div>;
};

export default Profile;
