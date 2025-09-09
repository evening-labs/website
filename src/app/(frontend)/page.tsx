import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8 font-mono">
      <MainContent />
    </div>
  );
}


function MainContent() {
  return (
    <div>
      <h1>Evening Labs.</h1>
    </div>
  );
}

