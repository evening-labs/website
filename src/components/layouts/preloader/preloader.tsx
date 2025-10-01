'use client';

import React from 'react';
import { Typewriter } from "motion-plus/react"

import { motion } from 'motion/react';

export default function Preloader() {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0% 0 0 0)' }}
      animate={{ clipPath: 'inset(100% 0 0 0)' }}
      transition={{ 
        delay: 2.5, 
        duration: 2, 
        ease: [.095, .82, .165, 1] 
      }}
      className="fixed inset-0 z-[99999] bg-background flex justify-center items-center pointer-events-auto"
    >
      <div className="relative">
        <div className="relative border-background/20 flex flex-col items-center gap-10 select-none">
          <Sunset />
          <Type />
        </div>
      </div>
    </motion.div>
  );
}

//// COMPONENTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Type({
  text = "Good Evening.",
}: {
  text?: string
}) {
  return (
    <Typewriter className="text-foreground text-3xl font-medium">{text}</Typewriter>
  );
}

function Sunset() {
  return (
    <div className="relative w-[300px] h-[180px]">

      {/* SETTING SUN ELEMENT */}
      <div className="relative w-[300px] h-[180px] overflow-hidden">
        <motion.div
          initial={{ 
            y: 0,
            opacity: 0.25,
          }} 
          animate={{ 
            y: 100,
            opacity: 1,
          }}
          transition={{ duration: 5, ease: [.2, .82, .25, 1] }}
          className="w-[160px] h-[160px] bg-primary rounded-full mx-auto"
        />
      </div>

      {/* HORIZON LINE ELEMENT */}
      <motion.div 
        initial={{ 
          scaleX: 0.65,
          opacity: 0.25,
        }} 
        animate={{ 
          scaleX: 1,
          opacity: 1,
        }}
        transition={{ duration: 2, ease: [.25, .82, .165, 1] }}
        className="absolute left-0 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-foreground/12 to-transparent" 
      />
      
      {/* SUN REFLECTION ELEMENT */}
      <motion.div
        initial={{ 
          scaleY: 0,
          opacity: 0,
        }} 
        animate={{ 
          scaleY: 1,
          opacity: 1,
        }}
        transition={{ duration: 3, ease: [.25, .82, .165, 1] }}
        className="w-[160px] h-[12px] bg-primary/60 rounded-b-full mx-auto blur-lg"
      />

    </div>
  );
}