import React from "react";
import { motion } from "framer-motion";

export const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      style={{ top, left }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay, /// Este é o delay, em segundos. delay, /// Delay eu passei 0 segundos
      }}
      aria-hidden="true"//Quando você coloca aria-hidden="true" em algo, é como se você estivesse dizendo ao computador para esconder esse pedaço da página para quem usa programas que falam o que está na tela. Isso é útil quando o elemento não é importante para entender a página, como uma imagem bonita ou uma animação.
    />
  );
};
