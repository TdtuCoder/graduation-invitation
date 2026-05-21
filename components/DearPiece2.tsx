"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DearPiece2({ name }: { name: string }) {
  const text = `Gửi ${name}`;

  return (
    <div className="pointer-events-none fixed inset-0 z-40" aria-hidden="true">
      <motion.div
        initial={{ x: "-110vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 78, damping: 18 }}
        className="absolute -left-3 top-[10%] w-[260px] sm:-left-3 sm:top-[10%] sm:w-[360px]"
      >
        <div className="relative w-full">
          <Image
            src="/piece2.png"
            alt="Paper"
            width={900}
            height={750}
            priority
            className="h-auto w-full object-contain drop-shadow-2xl sm:drop-shadow-[0_26px_70px_rgba(0,0,0,0.35)]"
          />

          <div className="absolute left-[12%] top-[60%] w-[84%] -translate-y-1/2">
            <span
              className="handwritten-dear handwritten-write block text-left"
              style={{ animationDelay: "650ms" }}
            >
              {text}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
