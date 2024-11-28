import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [msg, setMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`https://aiensured-assignment-5fa6.onrender.com/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (!response.ok) {
        setMsg(resData.message);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      } else {
        setMsg("Message sent successfully!");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        reset();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (<>
  <div className="flex flex-col items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Contact Us :</h2>
          <p className="text-gray-500 text-center text-sm sm:text-base">
          Our advisors are available around the clock to answer questions and support your educational journey. Connect with us today to explore how upGrad can help you meet your career goals.
          </p>
        </div>
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
        

        {showMessage && (
          <p className="text-center bg-green-100 text-green-700 text-sm py-2 px-3 rounded-md mb-4">
            {msg}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 5, message: "Minimum 5 characters required" },
                maxLength: { value: 20, message: "Maximum 20 characters allowed" },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-sm bg-pink-700">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-sm bg-pink-700">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numeric values allowed",
                },
                minLength: { value: 10, message: "Minimum 10 digits required" },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="Your Phone"
            />
            {errors.phone && (
              <p className="text-sm bg-pink-700">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              {...register("subject", {
                required: "Subject is required",
                minLength: {
                  value: 5,
                  message: "Minimum 5 characters required",
                },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Subject"
            />
            {errors.subject && (
              <p className="text-sm bg-pink-700">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register("message", {
                required: "Message is required",
              })}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="Your Message"
            ></textarea>
            {errors.message && (
              <p className="text-sm text-pink-500">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-700 text-white font-medium py-2 px-4 rounded-md hover:bg-pink-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Contact;
