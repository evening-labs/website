'use client';

import { Sidebar } from "@/components/layouts";

export default function Home() {
  return(
    <div className="w-full">
      <div className="relative w-full max-w-7xl h-full min-h-screen mx-auto grid xl:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main 
          className="bg- m-4 min-h-[200vh]"
          id="top"
        >
          <About />
          <Services />
          <Contact />
        </main>
      </div>
    </div>
  );
}


function About() {
  return (
    <div
      id="about"
      className="h-screen flex items-center px-8"
    >
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-light text-foreground mb-8 tracking-tight">
          Evening Labs
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
          We craft digital experiences that matter. Our team brings together the perfect blend of creativity and technical expertise to build solutions that not only look beautiful but perform flawlessly.
        </p>
      </div>
    </div>
  )
}

function Services() {
  return (
    <div
      id="services"
      className="min-h-screen flex items-center px-8"
    >
      <div className="max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-light text-foreground mb-12 tracking-tight">
          What We Do
        </h2>
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column: sticky explanation */}
          <div className="md:sticky md:top-24 self-start">
            <p className="text-base md:text-lg text-foreground leading-relaxed max-w-2xl">
              Every project is unique, and so is our approach. We carefully curate the right creative minds and technical experts for each challenge, ensuring your vision comes to life with precision and innovation.
            </p>
          </div>
          {/* Right column: list of services */}
          <div className="space-y-2">
            {[
              "Web Development",
              "Mobile Apps",
              "UI/UX Design",
              "Brand Identity",
              "E-commerce Solutions",
              "API Development",
              "Database Design",
              "Cloud Architecture",
              "Performance Optimization",
              "Security Audits",
              "Content Management Systems",
              "Progressive Web Apps",
              "React Applications",
              "Next.js Development",
              "TypeScript Implementation",
              "Node.js Backends",
              "Python Development",
              "Machine Learning Integration",
              "Data Visualization",
              "Analytics Implementation",
              "SEO Optimization",
              "Accessibility Compliance",
              "Cross-platform Development",
              "Microservices Architecture",
              "DevOps Automation",
              "CI/CD Pipelines",
              "Docker Containerization",
              "AWS Cloud Services",
              "Google Cloud Platform",
              "Azure Solutions",
              "Firebase Integration",
              "Stripe Payment Processing",
              "Third-party Integrations",
              "Custom Software Development",
              "Legacy System Modernization",
              "Technical Consulting",
              "Code Reviews",
              "Team Training",
              "Project Management",
              "Agile Development",
              "Quality Assurance",
              "Testing Automation",
              "Performance Monitoring",
              "User Research",
              "Market Analysis",
              "Competitive Analysis",
              "Product Strategy",
              "Feature Planning",
              "Technical Documentation",
              "System Architecture",
              "Scalability Planning",
              "Maintenance & Support"
            ].map((service) => (
              <span
                key={service}
                className="relative opacity-40 text-lg md:text-xl text-muted-foreground leading-relaxed mb-1 block"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
    </div>
  </div>
  )
}

function Contact() {
  return (
    <div
      id="contact"
      className="h-screen flex items-center px-8"
    >
      <div>
        <h2 className="text-3xl md:text-5xl font-light text-foreground mb-12 tracking-tight">
          Looking to Chat?
        </h2>
        <div className="space-y-6">
          <div>
            <a 
              href="mailto:hello@eveninglabs.io"
              className="text-xl md:text-2xl text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
            >
              hello@eveninglabs.io
            </a>
          </div>
          <div>
            <a 
              href="tel:+1234567890"
              className="text-lg md:text-xl text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
            >
              +14159185765
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}