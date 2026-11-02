"use client";

import React from "react";
import { motion } from "framer-motion";

// Fades and slides a section in once it scrolls into view
export const Reveal: React.FC<{
  children: React.ReactNode;
  id?: string;
  delay?: number;
}> = ({ children, id, delay = 0 }) => (
  <motion.div
    id={id}
    className="scroll-mt-24"
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default Reveal;
