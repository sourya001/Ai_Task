import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import user_group from "../assets/user_group.png";
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
          Craft powerful content <br /> using{" "}
          <span className="text-primary">AI tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          Elevate content creation with our premium AI tools — write articles,
          generate images, and streamline your workflow.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition-cursor-pointer"
        >
          Begin Creating Now
        </button>
        <button className="bg-white px-10 py-3  rounded-lg  border border-gray-300hover:scale-102 active:scale-95 transition-cursor-pointer">
          Watch Demo
        </button>
      </div>
      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600">
        <img src={user_group} alt="User Group" className="h-8" />
        Trusted by thousands worldwide
      </div>
    </div>
  );
};

export default Hero;
