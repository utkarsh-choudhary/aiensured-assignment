import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [msg, setMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:9000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resdata = await response.json();
      if (!response.ok) {
        console.error("Error occurred");
      }
      console.log("Success! You are registered.");
      setMsg(resdata.msg);
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      reset();
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-1/2 shadow-lg p-6 rounded-lg bg-white max-sm:w-3/4 max-[431px]:w-11/12">
        <div className="flex justify-center items-center gap-3">
          <img
            src="/ai.png"
            alt="aiensured Logo"
            className="w-12"
          />
          <span className="font-medium text-2xl">aiensured</span>
        </div>
        <div className="text-center my-6">
          <h1 className="font-semibold text-2xl">Sign Up</h1>
          <p className="text-slate-400">
            Create your account to access all the features of NotePlus.
          </p>
        </div>
        {showMessage && (
          <p className="bg-pink-600 text-white text-center py-2 rounded-md mb-4">
            {msg}
          </p>
        )}
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap gap-7">
            <div className="flex-1">
              <input
                type="text"
                {...register("firstname", {
                  required: "First name is required",
                  minLength: {
                    value: 5,
                    message: "Minimum 5 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum 20 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Alphabets only",
                  },
                })}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring focus:ring-pink-200"
                placeholder="First Name"
              />
              {errors.firstname && (
                <p className="text-pink-500 text-sm">
                  {errors.firstname.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <input
                type="text"
                {...register("lastname", {
                  required: "Last name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum 20 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Alphabets only",
                  },
                })}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring focus:ring-pink-200"
                placeholder="Last Name"
              />
              {errors.lastname && (
                <p className="text-pink-500 text-sm">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring focus:ring-pink-200"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-pink-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-7">
            <div className="flex-1">
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Maximum 15 characters",
                  },
                  validate: (value) =>
                    /[a-zA-Z]/.test(value) && /\d/.test(value)
                      ? true
                      : "Must include letters and numbers",
                })}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring focus:ring-pink-200"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-pink-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <input
                type="password"
                {...register("cpassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring focus:ring-pink-200"
                placeholder="Confirm Password"
              />
              {errors.cpassword && (
                <p className="text-pink-500 text-sm">
                  {errors.cpassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="agreecheck"
              {...register("agreecheck", {
                required: "You must agree to the terms",
              })}
            />
            <label
              htmlFor="agreecheck"
              className="text-slate-400 text-sm"
            >
              I agree to the terms and conditions.
            </label>
          </div>
          {errors.agreecheck && (
            <p className="text-pink-500 text-sm">
              {errors.agreecheck.message}
            </p>
          )}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-3 bg-pink-700 text-white rounded-lg hover:bg-pink-800 focus:ring focus:ring-pink-300 disabled:opacity-50"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-700 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
