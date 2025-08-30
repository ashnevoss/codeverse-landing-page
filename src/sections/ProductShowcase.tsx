"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";

export const ProductShowcase = () => {
  const borderRef = useRef<HTMLDivElement>(null);
  const offsetX = useMotionValue(-100);
  const offsetY = useMotionValue(-100);
  const maskImage = useMotionTemplate`radial-gradient(150px 150px at ${offsetX}px ${offsetY}px, rgba(255,255,255,0.8), transparent)`;

  const updateMousePosition = (e: MouseEvent) => {
    if (!borderRef.current) return;

    const rect = borderRef.current.getBoundingClientRect();
    offsetX.set(e.clientX - rect.left);
    offsetY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <section id="product-showcase" className="bg-gradient-to-b from-black to-[#5d2ca8] text-white py-28">
      <div className="container max-w-6xl mx-auto flex flex-col items-center gap-16">

        {/* Page Title */}
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight text-center text-white">
          Meet the Mind Behind the Work -
        </h1>

        {/* Content Row */}
        <div className="flex flex-col md:flex-row items-center gap-16 w-full">

          {/* Left Image with dynamic glowing border */}
          <motion.div
            ref={borderRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex-shrink-0 w-full md:w-[420px] h-[420px] rounded-2xl overflow-hidden cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "1rem",
            }}
          >
            <Image
              src="/webpic.png"
              alt="Arashdeep Gill"
              width={420}
              height={420}
              className="object-cover w-full h-full rounded-2xl"
            />

            {/* The glowing border overlay */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-2xl border-4 border-transparent"
              style={{
                borderColor: "white",
                maskImage,
                WebkitMaskImage: maskImage,
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
          </motion.div>

          {/* Right Text */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
              Your Mentor - <br />
              For Lasting Success
            </h2>

            <p className="text-lg text-white/80 mb-8">
              I’m <strong>Arashdeep Gill</strong>—a <strong>B.Tech dropout</strong> turned <strong>passionate coding coach</strong> with <strong>3+ years of experience</strong> learning and teaching programming. Having taught coding in <strong>Khanna city</strong> and mastered content and marketing strategies, I deeply understand the <strong>online space</strong> and <strong>emerging future technologies</strong>.
            </p>

            <p className="text-lg text-white/80 mb-8">
              My strength lies in combining <strong>hands-on coding knowledge</strong> with <strong>real-world industry insights</strong>, so I don’t just teach you to code—<strong>I guide you to build a meaningful career in tech</strong>. Together, we’ll create a learning experience that’s <strong>clear, focused, and tailored to your goals</strong>, helping you navigate the evolving tech landscape with confidence.
            </p>

            <div className="flex gap-4 mt-8 ">
              <a
                href="https://instagram.com/ashnevoss"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg bg-white text-black font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/9517925660"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg border border-white/70 text-white font-semibold hover:bg-white hover:text-black transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
