import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ title, value, pillText, trend, period }) => {
  return (
    <div className="flex flex-col justify-between bg-gray-200 p-4 h-40 w-60 rounded border border-stone-300">
      <div>
        <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
        <p className="text-3xl font-semibold">{value}</p>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <TrendingUp /> : <TrendingDown />} {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};

export default StatCard;
