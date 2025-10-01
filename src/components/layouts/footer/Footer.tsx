'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import 'react-clock/dist/Clock.css';

import { links, legal } from './data';

import { Separator } from '@/components/ui';
import Clock from 'react-clock';

export default function Footer() {
  return (
    <footer className="px-[1.275rem] sm:px-[2.75rem] py-[2.125rem] select-none">
      <div className="grid grid-cols-[auto_1fr] gap-[5vw]">
        <div className="flex flex-col gap-4">
          <FooterLogo />
          <FooterClock />
        </div>
        <div className="flex flex-row gap-4">
          <FooterNav />
        </div>
        <div className="flex flex-col gap-4 bg-gray-100 w-full h-24 col-span-2"></div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between text-[9px] tracking-[0.05rem] text-muted-foreground font-medium mt-12">
        <FooterCopyright />
        <Separator className="block sm:hidden my-2" />
        <FooterLegal />
      </div>
    </footer>
  );
}

///////////////////////////////////////////////////////////////////////////////////////

function FooterNav() {
  return (
    <div className="grid grid-cols-3 gap-[3vw] space-x-4 sm:space-x-0">
      <div className="col-span-1 h-full w-full bg-black" />
      <div className="col-span-1 h-full w-full bg-black" />
      <div className="col-span-1 h-full w-full bg-black" />
    </div>
  );
}

///////////////////////////////////////////////////////////////////////////////////////

function FooterLegal() {
  return (
    <div className="space-x-4 sm:space-x-0 pb-4">
      {legal.map((link) => (
        <Link
          className="hover:text-primary transition-all duration-300 sm:py-1 sm:px-2"
          key={link.href}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

///////////////////////////////////////////////////////////////////////////////////////

function FooterCopyright() {
  return (
    <p>
      © Copyright {new Date().getFullYear()} lugo:design. All Rights Reserved.
    </p>
  );
}

///////////////////////////////////////////////////////////////////////////////////////

function FooterLogo() {
  return (
    <Link
      className="flex-inline items-center text-[3rem] font-regular hover:text-black/40 transition-all duration-300"
      href="/"
      data-cursor="none"
    >
      lugo:design
    </Link>
  );
}

///////////////////////////////////////////////////////////////////////////////////////

function FooterClock() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-row items-center gap-2 text-[14px] tracking-[0.05rem] text-muted-foreground font-medium">
      <Clock
        className="opacity-60"
        value={value}
        size={16}
        locale="en-US"
        hourHandWidth={1}
        minuteHandWidth={1}
        secondHandWidth={1}
        hourHandLength={42}
        minuteHandLength={70}
        minuteMarksLength={0}
        hourMarksLength={0}
        renderSecondHand={false}
      />
      {`${value.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} PST`}{' '}
      • California, United States
    </div>
  );
}
