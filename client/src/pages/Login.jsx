import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../stores/auth";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [msg, setMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { storeTokenInLS } = useAuth();

  const onSubmit = async (data) => {
    try {
      let response = await fetch(`http://localhost:9000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      let resdata = await response.json();
      if (!response.ok) {
        setMsg(resdata.message);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      } else {
        storeTokenInLS(resdata.token);
        setMsg(resdata.msg);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate("/dashboard/your-notes");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/ai.png"
            alt=" ai Logo"
            className=" w-12 h-12 sm:w-20 sm:h-20"
          />
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Sign In</h2>
          <p className="text-gray-500 text-center text-sm sm:text-base">
            Login to stay connected.
          </p>
        </div>

        {/* Message Display */}
        {showMessage && (
          <p className="bg-neutral-600 text-white text-center py-2 rounded-md mb-4">
            {msg}
          </p>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="Enter your email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid Email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-pink-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-pink-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Remember Me</span>
            </label>
            <Link
              to="/forgot-pass"
              className="text-sm text-pink-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-700 text-white font-medium py-2 px-4 rounded-md hover:bg-pink-800 transition"
          >
            Sign In
          </button>

          {/* Signup Redirect */}
          <p className="text-gray-500 text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-pink-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
