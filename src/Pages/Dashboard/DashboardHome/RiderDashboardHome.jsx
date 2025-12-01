import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Loading/Loading";

// Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RiderDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: dailyDeliveries = [], isLoading } = useQuery({
    queryKey: ["delivery-per-day", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/delivery-per-day?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // 📌 Total delivery count
  const totalDeliveries = dailyDeliveries.reduce(
    (sum, item) => sum + item.deliveredCount,
    0
  );

  // 📌 Last day delivery
  const lastDay = dailyDeliveries[dailyDeliveries.length - 1];

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">📦 Rider Dashboard</h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-blue-600 text-white rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Total Deliveries</h3>
          <p className="text-4xl font-bold mt-2">{totalDeliveries}</p>
        </div>

        <div className="p-6 bg-green-600 text-white rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Todays Delivery</h3>
          <p className="text-4xl font-bold mt-2">{dailyDeliveries.length}</p>
        </div>

        <div className="p-6 bg-purple-600 text-white rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Last Day Delivery</h3>
          <p className="text-4xl font-bold mt-2">
            {lastDay?.deliveredCount || 0}
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">📅 Daily Delivery Stats</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyDeliveries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey="deliveredCount"
              fill="#4F46E5"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiderDashboardHome;
