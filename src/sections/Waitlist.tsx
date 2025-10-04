"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

export default function WaitlistSection() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const offsetX = useMotionValue(-100);
  const offsetY = useMotionValue(-100);
  const maskImage = useMotionTemplate`radial-gradient(120px 120px at ${offsetX}px ${offsetY}px, black, transparent)`;

  const updateMousePosition = useCallback(
    (e: MouseEvent) => {
      if (!formRef.current) return;
      const rect = formRef.current.getBoundingClientRect();
      offsetX.set(e.clientX - rect.left);
      offsetY.set(e.clientY - rect.top);
    },
    [offsetX, offsetY]
  );

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    el.addEventListener("mousemove", updateMousePosition);
    return () => el.removeEventListener("mousemove", updateMousePosition);
  }, [updateMousePosition]);

  const handleSubmit = async (e: { preventDefault: () => void; currentTarget: any }) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
    };

    if (!data.name || !data.email || !data.phone) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.result === "success") {
        form.reset();
        alert("You're on the list! We'll be in touch soon.");
      } else {
        alert("Something went wrong: " + (result.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist-id" className="relative isolate w-full overflow-hidden bg-black py-16 sm:py-24">
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-base font-medium text-white/70 sm:text-lg">
            Enrolment&apos;s are already open
          </span>

          <h2 className="mt-6 text-center font-bold text-white leading-tight text-5xl md:text-6xl max-w-full sm:max-w-[900px] mx-auto">
            Be first in line for classes
          </h2>

          <p className="mt-4 text-lg leading-8 text-white/70 max-w-prose">
            Seats are limited. Join the waitlist to get early access, priority updates, and a launch-day bonus for our next cohort{" "}
            <strong className="text-white">starting soon.</strong>
          </p>
        </div>

        <div className="mx-auto max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div
              ref={formRef}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl ring-1 ring-white/10 backdrop-blur"
            >
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl border-2 border-purple-400"
                style={{ maskImage, WebkitMaskImage: maskImage }}
              />

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-2 block w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/40 outline-none"
                    placeholder="Jaspreet Singh"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 block w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/40 outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    pattern="[0-9\+\-\(\) ]{7,}"
                    required
                    className="mt-2 block w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/40 outline-none"
                    placeholder="+91 12345 67890"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black shadow-lg transition hover:opacity-90 active:scale-[.99] disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Join the waitlist"}
                </button>

                <p className="text-center text-xs text-white/60">
                  No spam—just key updates. You can opt out anytime.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
