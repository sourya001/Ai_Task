import React, { useEffect } from "react";
import { useState } from "react";
import { dummyCreationData } from "../assets/assets";
import { Gem, Sparkles } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import customToast from "../utils/toast";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        customToast.error(data.message || "Failed to fetch creations.");
      }
    } catch (error) {
      customToast.error(error.message || "Failed to fetch creations.");
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6 bg-tertiary-custom text-primary-custom smooth-transition">
      <div className="flex justify-start gap-4 flex-wrap">
        {/*total creations card*/}
        <div className="flex justify-between items-center w-72 p-4 px-6 card-bg-custom rounded-xl border border-custom smooth-transition">
          <div className="text-secondary-custom">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold text-primary-custom">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        {/*Active Plan card*/}
        <div className="flex justify-between items-center w-72 p-4 px-6 card-bg-custom rounded-xl border border-custom smooth-transition">
          <div className="text-secondary-custom">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold text-primary-custom">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="mt-6 mb-4 text-primary-custom">Recent Creations</p>
          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
