import { Eraser, Sparkles } from "lucide-react";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import customToast from "../utils/toast";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const RemoveBackground = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const [content, setContent] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!input) {
      customToast.error("Please select an image file.");
      return;
    }
    
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", input);

      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) {
        setContent(data.content);
        customToast.success("Background removed successfully!");
      } else {
        customToast.error(data.message || "Failed to remove background.");
      }
    } catch (error) {
      console.error("Error removing background:", error);
      customToast.error(error.response?.data?.message || error.message || "Failed to remove background.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/*left side*/}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Background Remover</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          accept="image/*"
          type="file"
          className="text-gray-600 w-full p-2 mt-2 outline-none text-sm rounded-md border border-gray-300"
          required
        />
        <p className="text-xs text-gray-500 font-light mt-1">
          Supports JPG, PNG, and other image formats.
        </p>
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Eraser className="w-5" />
          )}
          Remove Background
        </button>
      </form>

      {/*right side*/}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 ">
        <div className="flex items-center gap-3">
          <Eraser className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
        {
          !content?(<div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Eraser className="w-9 h-9" />
            <p>Please upload an image to remove the background.</p>
          </div>
        </div>): (
          <img src={content} alt="image" className="mt-3 w-full h-full"/>
        )
        }
        
      </div>
    </div>
  );
};

export default RemoveBackground;
