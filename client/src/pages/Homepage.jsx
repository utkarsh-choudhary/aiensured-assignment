import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Homepage = () => {
  const containerVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.3,
      },
    },
  };

  const childVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <>
      <motion.div
        className="flex flex-col items-center justify-center h-screen text-center gap-7"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-6xl max-md:text-4xl font-bold leading-tight"
          variants={childVariant}
        >
          <span className="bg-pink-700 text-white px-4 rounded-md">aiensured</span>{" "}
          The simplest way to
          <br />
          keep notes
        </motion.h1>
        <motion.p
          className="text-xl w-1/2 max-md:w-11/12"
          variants={childVariant}
        >
          All your notes, synced on all your devices. Get Simplenote now for
          iOS, Android, Mac, Windows, Linux, or in your browser.
        </motion.p>
        <motion.button
          className="bg-pink-700 text-white px-7 py-2 hover:bg-pink-800 rounded-md text-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/register">Sign up now</Link>
        </motion.button>
      </motion.div>

      <motion.div
        className="flex justify-around items-center h-[50vh] px-8 bg-gray-50 max-md:flex-col max-md:text-center max-md:gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col w-[40%] max-md:w-11/12">
          <motion.h2
            className="text-4xl font-bold mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Why is <span className="text-pink-700">aiensured</span> a great
            note-taking app for you?
          </motion.h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            aiensured simplifies note-taking with powerful features that let you
            capture ideas, organize thoughts, and refine your workflow with
            ease.
          </p>
          <motion.div
            className="mt-6 flex gap-4 max-md:justify-center"
            variants={containerVariant}
          >
            <motion.button
              className="bg-pink-700 text-white px-6 py-3 rounded-md hover:bg-pink-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
            <motion.button
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="w-[20%] flex justify-center max-md:w-11/12"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="/ai.png"
            alt="aiensured logo"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="flex h-screen bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="w-1/2 flex justify-center items-center bg-gray-100">
          <motion.iframe
            className="w-11/12 h-4/6 rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/F7s3s_bUqsM"
            title="YouTube Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            whileHover={{ scale: 1.05 }}
          ></motion.iframe>
        </div>

        <div className="w-1/2 flex flex-col justify-center items-start px-12">
          <motion.h1
            className="text-4xl font-bold text-neutral-800 mb-6"
            variants={childVariant}
          >
            Welcome to aiensured
          </motion.h1>
          <p className="text-lg text-neutral-600 mb-4 leading-relaxed">
            aiensured is your ultimate solution for organizing your ideas and
            managing your tasks effortlessly. Whether you are a student,
            professional, or creative thinker, aiensured provides a user-friendly
            platform to jot down your thoughts, collaborate with teams, and stay
            productive.
          </p>
          <p className="text-lg text-neutral-600 mb-4 leading-relaxed">
            Our powerful tools, seamless integrations, and intuitive design help
            you stay on top of your game, ensuring that you never miss a
            brilliant idea or a crucial detail. Join us and transform the way
            you work, plan, and think!
          </p>
          <motion.button
            className="mt-6 bg-pink-700 text-white py-3 px-6 rounded-lg hover:bg-pink-800"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default Homepage;
