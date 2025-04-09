import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 0) {
      navigate(path.startsWith("/") ? path : `/${path}`, {
        state: { from: location.pathname },
      });
    }
  }, [count, navigate, location, path]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <motion.h1
        className="text-2xl mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Redirecting you in {count} second{count !== 1 ? "s" : ""}...
      </motion.h1>
      <motion.div
        className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};
