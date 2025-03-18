import { useState } from "react";
import { motion } from "framer-motion";

function PizzaAd() {
  const items = [1, 2, 3, 4,5,6,7,8]; // Array to represent the button items for the Ferris wheel

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="flex-1 bg-amber-500 flex items-center justify-center relative h-full">
        {/* Large white circle (background for Ferris wheel) */}
        <div className="w-250 h-250 bg-white rounded-full absolute bottom-0 right-0 translate-x-1/2 translate-y-1/3"></div>

        {/* Spinning Ferris wheel container (1000px radius) */}
        <motion.div
          animate={{ rotate: 360 }} // Continuous rotation
          transition={{
            duration: 20, // Duration for one full rotation
            repeat: Infinity,
            ease: "linear", // Smooth constant speed
          }}
          className="absolute flex items-center justify-center w-[1000px] h-[1000px] rounded-full bottom-0 right-0 translate-x-1/2 translate-y-1/3"
        >
          {/* Map through the items to create the "cabins" */}
          {items.map((item, index) => {
            // Calculate angle and position for each dot
            const angle = (360 / items.length) * index; // Angle between the dots
           // const radius = 1000 / 2; // Radius for positioning the dots (half the size of the rotating circle)
            const x = Math.cos((angle * Math.PI) / 180) * 1000; // X position (calculated from angle)
            const y = Math.sin((angle * Math.PI) / 180) * 1000; // Y position (calculated from angle)

            return (
              <motion.div
                key={item}
                className="absolute flex items-center justify-center bg-red-500 w-50 h-50 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`, // Position each button around the rotating circle
                }}
              />
            );
          })}
        </motion.div>
        <div className="flex flex-col mr-[90%] bottom-10">
          <button className="p-2 m-2 border-2 rounded-2xl">1</button>
          <button className="p-2 m-2 border-2 rounded-2xl">2</button>
          <button className="p-2 m-2 border-2 rounded-2xl">3</button>
          <button className="p-2 m-2 border-2 rounded-2xl">4</button>
          <button className="p-2 m-2 border-2 rounded-2xl">5</button>
          <button className="p-2 m-2 border-2 rounded-2xl">6</button>
        </div>

      </div>
    </div>
  );
}

export default PizzaAd;
