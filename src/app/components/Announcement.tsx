"use client";

import { motion } from "framer-motion";
import Link from "next/link";

//64
export function Announcement({ setShow }: { setShow: () => void }) {
  return (
    <motion.div
      layout
      initial={{
        opacity: 1,
        height: "auto",
        paddingTop: 16,
        paddingBottom: 16,
        // scaleY: 1,
      }}
      animate={{
        opacity: 1,
        height: "auto",
        paddingTop: 16,
        paddingBottom: 16,
        // scaleY: 1,
      }}
      exit={{
        // opacity: 0,
        paddingBottom: 1,
        height: 0, // collapse height
        paddingTop: 0, // remove vertical padding
        // scaleY: 0,
        transformOrigin: "top",
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ transformOrigin: "top" }}
      className="w-full overflow-hidden bg-orange-950 text-white"
    >
      <div className=" max-w-7xl mx-auto flex justify-between items-center px-5 md:px-6">
        {/* contact */}
        <div className="flex text-xs md:text-sm items-center gap-2">
          <div
            // style={{ fontFamily: "var(--font-playfair)" }}
            className="font-medium  text-white"
          >
            Support
          </div>
          <p>+0123456789</p>
        </div>

        {/* Main Text */}
        <ul className="flex">
          <li className="hidden md:flex cursor-pointer">
            Sign up and <span className="font-medium mx-1">GET 25% OFF </span>
            for your first order.
          </li>
          <Link href="/login" className="text-xs md:text-sm underline ml-1 text-[#F6BE63] underline-offset-4">
            Sign in up now
          </Link>
        </ul>

        <div className="cursor-pointer">
          <span className="text-lg font-bold" onClick={setShow}>
            ✕
          </span>
        </div>
      </div>
    </motion.div>
  );
}
