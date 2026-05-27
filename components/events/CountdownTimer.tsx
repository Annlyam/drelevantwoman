"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: string;
  targetTime: string;
  className?: string;
}

export default function CountdownTimer({
  targetDate,
  targetTime,
  className = "",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(`${targetDate}T${targetTime}`).getTime();
      const difference = target - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isExpired: false,
      };
    };

    // Calculate immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  if (timeLeft.isExpired) {
    return (
      <div className={`text-sm font-semibold text-[#fc98ac] ${className}`}>
        Event Ended
      </div>
    );
  }

  const baseTextSize = className.includes("text-xl") ? "text-2xl" : "text-lg";
  const labelSize = className.includes("text-xl") ? "text-sm" : "text-xs";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="flex items-center gap-2">
        {timeLeft.days > 0 && (
          <motion.div
            key={timeLeft.days}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="flex items-baseline gap-1"
          >
            <span className={`${baseTextSize} font-bold text-[#f9f871]`}>
              {timeLeft.days}
            </span>
            <span className={`${labelSize} text-white/70 font-medium`}>d</span>
          </motion.div>
        )}
        {timeLeft.days > 0 && <span className="text-white/50 text-lg">:</span>}
        <motion.div
          key={`${timeLeft.hours}-${timeLeft.minutes}-${timeLeft.seconds}`}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="flex items-baseline gap-1"
        >
          <span className={`${baseTextSize} font-bold text-[#f9f871]`}>
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className={`${labelSize} text-white/70 font-medium`}>h</span>
        </motion.div>
        <span className="text-white/50 text-lg">:</span>
        <motion.div
          key={`${timeLeft.minutes}-${timeLeft.seconds}`}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="flex items-baseline gap-1"
        >
          <span className={`${baseTextSize} font-bold text-[#f9f871]`}>
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className={`${labelSize} text-white/70 font-medium`}>m</span>
        </motion.div>
        <span className="text-white/50 text-lg">:</span>
        <motion.div
          key={timeLeft.seconds}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="flex items-baseline gap-1"
        >
          <span className={`${baseTextSize} font-bold text-[#f9f871]`}>
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className={`${labelSize} text-white/70 font-medium`}>s</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
