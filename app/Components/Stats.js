"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Happy Clients", value: 500 },
  { label: "Documents Generated", value: 1820 },
  { label: "Years of Experience", value: 5 },
  { label: "5-Star Reviews", value: 300 },
];

export default function StatsSection() {
  return (
    <div className="flex justify-center mx-auto px-6 py-28 bg-[#5d17eb15]">
      <div className=" w-max-5xl">


        <h2 className="text-3xl font-bold text-center mb-8">Our Achievements</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <StatCard key={index} label={stat.label} value={stat.value} />
          ))}
        </div>
      </div>
    </div>

  );
}

// ✅ Removed TypeScript annotations for JavaScript compatibility
function StatCard({ label, value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 3 seconds
    const stepTime = Math.abs(Math.floor(duration / value));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="p-6 bg-white shadow-lg rounded-2xl"
    >
      <h3 className="text-4xl font-bold text-[#5d17eb]">{count}+</h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
}
