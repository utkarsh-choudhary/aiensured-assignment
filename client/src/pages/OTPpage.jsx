import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const OTPPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  // const [newemail, setEmail] = useState("");
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const email = queryParams.get("email");
  // setEmail(email);
  const onSubmit = async (data) => {
    console.log(email);
    // await delay(2); // simulate server latency
    console.log("before sending data to backend", data.otp);

    // sending data to backend using fetch api
    try {
      let response = await fetch(
        `http://localhost:9000/api/auth/otp-verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp: data.otp, email: email }),
        }
      );
      let resdata = await response.json();
      if (!response.ok) {
        console.log("error occured");
        setMsg(resdata.message);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
        setShowMessage(true);
      } else {
        console.log(`Success! You are Verify.`);
        console.log("After sending data to backend", resdata);

        setMsg(resdata.message);
        setTimeout(() => {
          setShowMessage(false);
          navigate(`/update-pass?email=${email}`);
        }, 3000);
        setShowMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 shadow-[0_0px_40px_rgb(0,0,0,5%)] p-5 rounded-lg bg-white max-lg:w-1/2 max-sm:w-11/12">
        <div className="w-full flex justify-center items-center gap-3">
          <img
            src="/upgrad.png"
            alt="upgrad logo"
            className="w-16 h-16"
          />
          <span className="font-medium text-2xl">UpGrad</span>
        </div>
        <div className="flex flex-col items-center gap-4 my-6">
          <h1 className="font-semibold text-2xl">Enter OTP</h1>
          <p className="font-medium text-base text-slate-400 text-center">
            Please enter the OTP sent to your Registered Email.
          </p>
        </div>
        {showMessage && (
          <p className="bg-neutral-600 text-white text-center py-2 rounded-md mb-4">
            {msg}
          </p>
        )}
        <div className="form flex justify-center items-center gap-3">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="w-full outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
              {...register("otp", {
                required: {
                  value: true,
                  message: "OTP is required",
                },
                pattern: {
                  value: /^\d{6}$/,
                  message: "Enter 6 Digit Number",
                },
              })}
              placeholder="Enter OTP"
            />
            {errors.otp && (
              <p className="text-base ms-1 text-pink-400">
                {errors.otp.message}
              </p>
            )}
            <div className="w-full btn text-center mt-3">
              <input
                value="Verify OTP"
                type="submit"
                className="w-fit bg-pink-700 py-2 px-6 rounded-lg hover:bg-pink-800 text-white text-lg cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
