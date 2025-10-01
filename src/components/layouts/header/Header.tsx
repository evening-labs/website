'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLenis } from 'lenis/react';
import { Button } from '@/components/ui';
import { links } from './data';
import { useMenuKeyboard, useMenuToggleKeyboard, useInView } from './hooks';

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalType = 'menu' | 'contact' | null;

const ANIMATIONS = {
  contact: {
    backdrop: {
      duration: 0.6,
      ease: [0.5, 0.1, 0.2, 1],
    },
    panel: {
      duration: 0.6,
      ease: [0.5, 0.1, 0.2, 1],
    },
  },
  menu: {
    duration: 0.6,
    ease: [0.6, 0.1, 0.2, 1],
  },
} as const;

////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Header() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const lenis = useLenis();
  const { isInView, setRef } = useInView();

  const isMenuOpen = activeModal === 'menu';
  const isContactOpen = activeModal === 'contact';

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const toggleMenu = useCallback(() => {
    setActiveModal(activeModal === 'menu' ? null : 'menu');
  }, [activeModal]);

  const openContact = useCallback(() => {
    setActiveModal('contact');
  }, []);

  useMenuKeyboard(isMenuOpen, closeModal);
  useMenuKeyboard(isContactOpen, closeModal);
  useMenuToggleKeyboard(toggleMenu);

  useEffect(() => {
    if (activeModal) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [activeModal, lenis]);

  return (
    <div className="relative z-[1000]">
      
      <div ref={setRef} className="absolute top-12 left-0 w-full h-1 pointer-events-none" />
      
      <motion.header 
        className="px-[1.275rem] sm:px-[2.75rem] py-[1.125rem] fixed top-0 left-0 right-0 z-20 select-none bg-white text-black"
        initial={false}
        animate={{
          clipPath: isInView ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
        }}
        transition={{ 
          duration: 0.3, 
          ease: [.215, .61, .355, 1]
        }}
      >
        <div className="flex justify-between items-center z-[100]">
          <NavMenu isOpen={isMenuOpen} onClose={closeModal} />
          
          <Link href="/" data-cursor="none">
            <Logo variant="full" color="dark" />
          </Link>
          <nav className="flex items-center gap-4">
            <NavOpenButton isOpen={isMenuOpen} onToggle={toggleMenu} />
            <Button asChild className="hidden sm:block" variant="default">
              <button aria-label="Open Contact Form" data-cursor="pointer" onClick={openContact}>
                Contact
              </button>
            </Button>
          </nav>
        </div>
      </motion.header>

      <header className="px-[1.275rem] sm:px-[2.75rem] py-[1.125rem] fixed top-0 left-0 right-0 z-10 select-none text-white">
        <div className="flex justify-between items-center">
          <NavMenu isOpen={isMenuOpen} onClose={closeModal} />
          <Link
            className="text-[1.75rem] font-regular hover:opacity-80 transition-opacity"
            href="/"
            prefetch={true}
            data-cursor="none"
          >
            lugo:design
          </Link>
          <nav className="flex items-center gap-4 z-[100]">
            <NavOpenButton isOpen={isMenuOpen} onToggle={toggleMenu} />
            <Button asChild className="hidden sm:block" variant="secondary">
              <button aria-label="Open Contact Form" data-cursor="pointer" onClick={openContact}>
                Contact
              </button>
            </Button>
          </nav>
        </div>
      </header>

      <ContactForm isOpen={isContactOpen} onClose={closeModal} />

    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function ContactForm({ isOpen, onClose }: NavMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={ANIMATIONS.contact.backdrop}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-[90]"
          />
          <motion.div
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            animate={{ clipPath: 'inset(0 0 0 60%)' }}
            exit={{ clipPath: 'inset(0 0 0 100%)' }}
            transition={ANIMATIONS.contact.panel}
            className="fixed inset-0 bg-background z-[100]"
          >
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function NavOpenButton({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <Button 
      variant="ghost"
      onClick={onToggle}
      aria-label="Toggle menu"
      className="p-2"
    >
      <HamburgerIcon isOpen={isOpen} />
    </Button>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-6 h-6 flex flex-col justify-center items-center gap-2">
      <span
        className={`w-full h-0.5 block bg-current transition-all duration-200`}
        style={{
          transform: isOpen ? 'rotate(45deg) translateY(6px)' : 'none',

        }}
      />
      
      <span
        className={`w-full h-0.5 block bg-current transition-all duration-200`}
        style={{
          transform: isOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
        }}
      />
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function NavMenu({ isOpen, onClose }: NavMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          exit={{ clipPath: 'inset(0 100% 0 0)' }}
          transition={{
            duration: 0.6,
            ease: [.215, .61, .355, 1],
          }}
          className="fixed inset-0 z-[60] bg-background"
        >
          <NavMenuContent onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [.215, .61, .355, 1] as const,
    },
  },
};


////////////////////////////////////////////////////////////////////////////////////////////////////////

function Lines({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <div className="fixed inset-0 -z-[1] pointer-events-none">
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-muted-foreground"
        style={{
          left: mousePosition.x,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.2 }}
      />
      
      <motion.div
        className="absolute left-0 right-0 h-px bg-muted-foreground"
        style={{
          top: mousePosition.y,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

function NavMenuContent({ onClose }: { onClose: () => void }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col justify-center items-start h-full px-[8rem] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <Lines mousePosition={mousePosition} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start"
      >
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-start text-foreground/10 font-semibold text-sm font-mono uppercase mb-4"
        >
          Index
        </motion.div>
        <nav className="flex flex-col items-start">
          {links.map((item, index) => {
            if (item.label.toLowerCase() === 'projects') {
              return (
                <motion.div 
                  key={item.href}
                  variants={itemVariants}
                  className="flex flex-row text-foreground items-start"
                >
                  
                  <NavMenuItem
                  key={item.href}
                  item={item}
                    index={index}
                    onClose={onClose}
                  />

                  <span className="text-foreground font-semibold text-sm uppercase">
                  [ 10 ]
                  </span>
                </motion.div>
              );
            }
            return (
              <motion.div key={item.href} variants={itemVariants}>
                <NavMenuItem
                  item={item}
                  index={index}
                  onClose={onClose}
                />
              </motion.div>
            );
          })}
        </nav>
      </motion.div>
    </div>
  );
}

function NavMenuItem({
  item,
  index,
  onClose,
}: {
  item: (typeof links)[number];
  index: number;
  onClose: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div className="relative text-4xl md:text-6xl font-light pr-3">

      {/* Wrapper for line that grows from left to right */}
      <div className="absolute -left-[20rem] bottom-0 w-[calc(20rem+100%)] overflow-hidden">
        <motion.div 
          className="h-[3px] bg-foreground"
          animate={{
            width: isHovered ? "100%" : "0%"
          }}
          transition={{ 
            duration: 1, 
            ease: [.075, .82, .165, 1]
          }}
        />
      </div>
      
      <motion.span className="text-foreground/10 font-mono flex items-center gap-4">
        {'0' + (index + 1)}
        <Link
          href={item.href}
          className="font-sans font-light text-foreground hover:text-foreground/70 transition-colors duration-300 py-2"
          onClick={onClose}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {item.label}
        </Link>
      </motion.span>
    </motion.div>
  );
}


////////////////////////////////////////////////////////////////////////////////////////////////////////

import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const logoVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      small: "w-6 h-6",
      full: "w-32 h-8",
    },
    color: {
      dark: "text-black fill-black",
      light: "text-white fill-white",
    },
  },
  defaultVariants: {
    variant: "full",
    color: "dark",
  },
});

type LogoProps = VariantProps<typeof logoVariants> & {
  className?: string;
};

function Logo({ variant = "full", color = "dark", className }: LogoProps) {
  if (variant === "small") {
    return (
      <svg
        className={clsx(logoVariants({ variant, color }), className)}
        viewBox="0 0 24 24"
        aria-label="Logo"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="24" height="24" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <span className={clsx(logoVariants({ variant, color }), className)}>
      <svg
        className="mr-2 w-6 h-6 shrink-0"
        viewBox="0 0 24 24"
        aria-label="Logo"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="3" width="16" height="16" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span className="font-normal text-2xl tracking-tight select-none">lugo</span>
    </span>
  );
}