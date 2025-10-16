import React from "react";
import Container from "react-bootstrap/Container";
import "../../Assets/CSS/style.css";
import hero from "../../Assets/images/hero-img.png";
import About from "./About";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div>
      {/* <Navbar /> */}

      <Container className="main_container">
        <section className="text-gray-700 body-font">
          <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
            {/* Left - Hero Illustration */}
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 drop-shadow-xl">
              <img
                className="object-cover object-center rounded-xl"
                alt="hero"
                src={hero}
              />
            </div>

            {/* Right - Text Section */}
            <div className="lg:flex-grow md:w-1/2 lg:pl-20 md:pl-14 flex flex-col md:items-start md:text-left items-center text-left">
              <h1 className="title-font sm:text-5xl text-3xl mb-4 font-bold text-gray-900 leading-tight">
                Citizen Grievance Redressal Portal
              </h1>
              <p className="mb-8 leading-relaxed text-gray-600 text-lg">
                Report civic issues like waste management, roads, lighting, or
                water supply — all in one place. <br /> Track updates, get
                transparent responses, and be part of a responsive governance
                system that listens to you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center">
                <Link to="/register">
                  <button className="inline-flex text-white bg-[#8338ec] border-0 py-2 px-6 focus:outline-none hover:bg-[#6f2cd0] rounded text-lg shadow-md hover:shadow-lg transition duration-300">
                    Register Complaint
                  </button>
                </Link>
                <Link to="/login">
                  <button className="ml-0 sm:ml-4 mt-4 sm:mt-0 inline-flex text-[#8338ec] bg-gray-100 border-2 border-[#8338ec] py-2 px-6 focus:outline-none hover:bg-[#f3e8ff] rounded text-lg transition duration-300">
                    Track Status
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Container>

      {/* About Section */}
      <About />
    </div>
  );
}

export default Hero;
