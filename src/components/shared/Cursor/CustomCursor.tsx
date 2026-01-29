"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.tagName === "A"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  },[mouseX,mouseY]);
    
  if (isMobile) return null;

  return (
    <motion.div
      style={{
        left: mouseX,
        top: mouseY,
        x: "-50%",
        y: "-50%",
      }}
      animate={{
        width: isHovered ? 45 : 12,
        height: isHovered ? 45 : 12,
        backgroundColor: isHovered ? "rgba(163, 163, 128, 0.2)" : "#a3a380",
        border: isHovered ? "2px solid #a3a380" : "4px solid transparent",
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      className="fixed pointer-events-none z-9999 rounded-full"
    />
  );
};

export default CustomCursor;
