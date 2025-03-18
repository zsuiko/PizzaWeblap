import { motion } from "framer-motion";

function Contact() {
  const items = [1, 2, 3, 4, 5, 6]; // Array to represent 6 parts of the Ferris wheel

  return (
    <div className="flex h-screen items-center justify-center bg-purple-500">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 5, // Spin duration
          repeat: Infinity, // Infinite loop
          ease: "linear", // Constant speed
        }}
        className="relative flex items-center justify-center w-72 h-72 border-4 border-amber-400 rounded-full translate-x-1/2 translate-y-1/2"
      >
        {/* Loop through items to create the "Ferris wheel cabins" */}
        {items.map((item, index) => {
          const angle = (360 / items.length) * index;
          const x = Math.cos((angle * Math.PI) / 180) * 120; // X position based on the angle
          const y = Math.sin((angle * Math.PI) / 180) * 120; // Y position based on the angle

          return (
            <motion.div
              key={item}
              className="absolute flex items-center justify-center bg-amber-400 w-12 h-12 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`, // Position each item in the circle
              }}
            >
              <span>{item}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default Contact;
