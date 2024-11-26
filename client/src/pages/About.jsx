import React from "react";
import AboutImg from "../images/about.png";
import Team from "../images/itachi.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="about flex justify-around items-center h-screen max-md:flex-col-reverse px-6"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="content w-[40%] max-md:w-11/12 text-center md:text-left"
        >
          <h1 className="text-6xl max-md:text-4xl font-bold leading-tight mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-700">
            We're passionate about empowering individuals and teams to capture
            ideas, organize thoughts, and boost productivity. Born from the
            frustration of limited note-taking options, NotePlus was designed to
            be the one-stop shop for all your note-taking needs.
          </p>
          <Link to="/">
            <button className="mt-6 px-6 py-2 bg-pink-700 text-white rounded-full shadow-md hover:bg-pink-800 transition duration-300">
              Explore Features
            </button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="img w-[40%] max-md:w-10/12"
        >
          <img
            src={AboutImg}
            alt="About"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </motion.div>

      {/* Owner Section */}
      <div className="mt-9">
        <div className="text-center flex flex-col items-center gap-4 px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            Meet the Creator
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl w-[60%] max-md:w-11/12 text-gray-700"
          >
            At UpGrad, exceptional tools are created by dedicated and
            passionate individuals. Meet the brilliant mind behind UpGrad,
            committed to transforming the way you capture, organize, and manage
            your notes seamlessly.
          </motion.p>
        </div>
        <div className="flex justify-center mt-11 px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl w-96 max-md:w-80 shadow-lg overflow-hidden text-center flex flex-col gap-3 items-center py-6 px-5"
          >
            <div className="profile w-fit">
              <img
                src={Team}
                alt="Team Member"
                className="w-16 h-16 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Utkarsh Chaudhary
            </h3>
            <span className="text-slate-500 text-sm">Full Stack Developer</span>
            <hr className="border-t border-gray-300 my-4 border-[1px] w-11/12" />
            <p className="text-gray-700 text-sm leading-relaxed">
              As a Full Stack Developer, I designed and developed an intuitive
              user interface for seamless note-taking. I built a secure backend
              architecture and implemented rich text editing features, enabling
              users to express ideas creatively.
            </p>
            <Link to="/contact">
              <button className="mt-4 px-4 py-2 bg-pink-700 text-white rounded-full shadow-md hover:bg-pink-800 transition duration-300">
                Contact Me
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;
