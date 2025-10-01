'use client'

import { motion, animate, hover } from 'motion/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import Clock from 'react-clock'
import '@/styles/clock.css';


export default function Sidebar() {
  return (
    <aside className='sticky top-0 h-screen flex flex-col items-start justify-between pt-10 pb-4 px-4 '>
      <Header />
      <div className="hidden md:block w-full">
        <Nav />
      </div>
      <Footer />
    </aside>
  )
}

/// COMPONENTS ////////////////////////////////////////////////////////////////////////////////////////////

function Logo() {
  
  const [isHovered, setIsHovered] = useState(false)
  const text = "Evening Labs."
  const characters = text.split('')
  
  return (
    <motion.a 
      href='/#top'
      className='relative w-full flex flex-row items-center gap-2'
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className='absolute top-0 left-0 flex flex-row items-center gap-2 z-10'>
        <motion.div 
          animate={isHovered ? {
            y: 9, 
          } : { 
            y: 0, 
          }}
          transition={{ 
            type: 'spring',
            stiffness: 200,
            damping: 12,
          }} 
          className='size-6 bg-primary rounded-full'/>
        <span className='text-foreground text-2xl font-medium flex'>
          {characters.map((char, index) => (
            <motion.span
              key={index}
              animate={isHovered ? {
                y: 9, 
              } : { 
                y: 0, 
              }}
              transition={{ 
                type: 'spring',
                stiffness: 200,
                damping: 12,
                delay: index * 0.015
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </div>
      <motion.div
        className='absolute -left-8 pl-8 top-8 bg-background z-20 w-full h-8 overflow-hidden'
      >
        <motion.div 
          animate={isHovered ? {
            y: 2,
            opacity: 1,
          } : { 
            y: 0,
            opacity: 0.05,
          }}
          transition={{ 
            duration: 2, 
            ease: [.095, .82, .165, 1]
          }}
          className='w-6 h-1.5 blur-sm bg-primary rounded-full' 
        />
        <motion.span 
          className='relative -top-7 left-8 text-sidebar-primary-foreground text-2xl font-medium blur-sm'
          animate={isHovered ? {
            y: 2,
            opacity: 1,
          } : { 
            y: 12, 
            opacity: 0.05,
          }}
          transition={{ 
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
        >
          Evening Labs.
        </motion.span>
      </motion.div>
    </motion.a>
  )
}

function Header() {
  return (
    <header className='w-full flex flex-col gap-2'>
      <Logo />
    </header>
  )
}

function Nav() {

  const navItems = [
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
    { href: "/#contact", label: "Contact" },
  ]

  return (
    <nav className='w-full flex flex-col gap-2'>
      {navItems.map((item) => (
        <NavItem key={item.href} href={item.href} label={item.label} />
      ))}
    </nav>
  )
}

function NavItem({ href, label }: { href: string, label: string }) {
  return (
    <Link 
      href={href}
      className='text-foreground text-sm font-medium hover:text-primary transition-colors duration-300'
    >
      {label}
    </Link>
  )
}

function Footer() {
  return (
    <footer className='w-full flex flex-col gap-6 max-w-[36ch]'>
      <p>
        We&apos;re a passionate + thoughtful team of digital creatives who enjoy building great things.
      </p>
      <FooterClock />
      <p className="text-[8px] text-muted-foreground">
        © {new Date().getFullYear()} Evening Labs. All rights reserved.
      </p>
    </footer>
  )
}

function FooterClock() {
  const [value, setValue] = useState(() => {
    const now = new Date();
    const pstTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
    );
    return pstTime;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const pstTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
      );
      setValue(pstTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-row items-center gap-2 text-[10px] tracking-[0.05rem] text-muted-foreground font-regular">
      <Clock className="opacity-60" value={value} size={20} locale="en-US" hourHandWidth={1} minuteHandWidth={1} secondHandWidth={1} hourHandLength={48} minuteHandLength={70} minuteMarksLength={0} hourMarksLength={0} renderSecondHand={false} />
      {value.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })}{' '}
      PST{' '}
      • California, United States
    </div>
  );
}
