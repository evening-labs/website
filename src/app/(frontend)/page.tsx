'use client';

import { Sidebar } from "@/components/layouts";

export default function Home() {
  return(
    <div className="w-full">
      <div className="relative w-full max-w-7xl h-full min-h-screen mx-auto grid xl:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main className="bg-primary-foreground m-4 min-h-[200vh]">
          We are closed.
        </main>
      </div>
    </div>
  );
}
