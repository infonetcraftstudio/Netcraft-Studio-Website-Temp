"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStudio } from "@/context/StudioContext";

export interface Member {
  id: string | number;
  name: string;
  role: string;
  department?: string;
  bio?: string;
  avatar?: string;
  skills?: string[];
  email?: string;
}

export interface MemberSliderProps {
  members?: Member[];
  className?: string;
}

/**
 * NetCraft Studio Team Member Showcase Slider.
 * - Shows EVERY member in the thumbnail grid without filtering out any specialist
 * - Clearly highlights the currently active member with blue ring & indicator
 * - Aligned with the website's clean technical blueprint pattern
 * - High contrast, visible navigation controls
 */
export const MemberSlider: React.FC<MemberSliderProps> = ({
  members: propMembers,
  className,
}) => {
  const { members: contextMembers, contactInfo } = useStudio();
  const members = propMembers || contextMembers;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  if (!members || members.length === 0) return null;

  const safeIndex = currentIndex >= members.length ? 0 : currentIndex;
  const activeMember = members[safeIndex];

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  const handleThumbnailClick = (index: number) => {
    if (index === safeIndex) return;
    setDirection(index > safeIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Animation variants for image
  const imageVariants = {
    enter: (direction: "left" | "right") => ({
      y: direction === "right" ? "100%" : "-100%",
      opacity: 0,
      scale: 0.97,
    }),
    center: { y: 0, opacity: 1, scale: 1 },
    exit: (direction: "left" | "right") => ({
      y: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      scale: 0.97,
    }),
  };

  // Animation variants for text
  const textVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 35 : -35,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -35 : 35,
      opacity: 0,
    }),
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-white text-[#101c38] p-4 sm:p-7 md:p-12 border border-[#cfd8e5] shadow-lg rounded-sm",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(207, 216, 229, 0.35) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(207, 216, 229, 0.35) 1px, transparent 1px),
          radial-gradient(circle at 95% 10%, rgba(37, 99, 235, 0.06) 0%, transparent 60%)
        `,
        backgroundSize: "36px 36px, 36px 36px, auto",
      }}
    >
      {/* Corner Technical Telemetry Stamp */}
      <div className="absolute top-4 right-6 font-mono text-[9px] text-[#818ba2] tracking-widest uppercase hidden md:flex items-center gap-2 pointer-events-none">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
        <span>{contactInfo?.systemCode || "SYSTEM 01.26"} // CORE LEADERSHIP</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 h-full items-stretch">
        {/* === Left Column: Specialist Index & Collective Label (Desktop) / Header (Mobile) === */}
        <div className="md:col-span-3 flex flex-col justify-between order-1 md:order-1">
          <div>
            {/* Pagination & Status */}
            <div>
              <span className="text-xs font-mono tracking-widest text-[#2563eb] uppercase font-semibold">
                // SPECIALIST {String(safeIndex + 1).padStart(2, "0")} OF{" "}
                {String(members.length).padStart(2, "0")}
              </span>
              <div className="h-[2px] w-10 bg-[#2563eb] mt-2" />
            </div>

            <div className="mt-2.5">
              <span className="text-[11px] font-mono text-[#818ba2] uppercase tracking-wider block">
                NetCraft Collective
              </span>
            </div>
          </div>

          {/* All Members Thumbnails Grid Widget (Hidden on mobile here, rendered at bottom on mobile) */}
          <div className="hidden md:block mt-6 pt-4 border-t border-[#cfd8e5]/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#667085] font-semibold">
                All Specialists ({members.length})
              </span>
              <span className="text-[9px] font-mono text-[#2563eb]">
                Click to switch
              </span>
            </div>

            {/* Grid displaying EVERY member */}
            <div className="grid grid-cols-3 gap-2">
              {members.map((member: Member, index: number) => {
                const isActive = index === safeIndex;
                return (
                  <button
                    key={member.id}
                    onClick={() => handleThumbnailClick(index)}
                    className={cn(
                      "group relative rounded-sm overflow-hidden aspect-[4/5] transition-all duration-200 focus:outline-none cursor-pointer",
                      isActive
                        ? "border-2 border-[#2563eb] ring-2 ring-[#2563eb]/25 shadow-md opacity-100 scale-102"
                        : "border border-[#cfd8e5] opacity-65 hover:opacity-100 hover:border-[#2563eb] bg-[#f8fafc]"
                    )}
                    aria-label={`Select ${member.name}`}
                    title={`${member.name} (${member.role})`}
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-300",
                        isActive
                          ? "scale-105 filter-none"
                          : "grayscale group-hover:grayscale-0 group-hover:scale-105"
                      )}
                      onError={(e: any) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";
                      }}
                    />

                    {/* Active member indicator badge */}
                    {isActive && (
                      <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2563eb] ring-2 ring-white shadow-xs" />
                    )}

                    {/* Name tag */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101c38]/90 via-[#101c38]/60 to-transparent p-1 pt-3">
                      <span className="text-[8px] font-mono text-white block truncate font-medium leading-none">
                        {member.name.split(" ")[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* === Center Column: Main Animated Portrait === */}
        <div className="md:col-span-4 relative h-72 sm:h-80 md:h-[440px] order-2 md:order-2">
          {/* Architectural offset shadow border */}
          <div className="absolute inset-0 border border-[#2563eb]/25 rounded-sm translate-x-2.5 translate-y-2.5 pointer-events-none" />

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={safeIndex}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full overflow-hidden rounded-sm border border-[#cfd8e5] shadow-md bg-[#eef2f8]"
            >
              <img
                src={activeMember.avatar}
                alt={activeMember.name}
                className="w-full h-full object-cover"
                onError={(e: any) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101c38]/40 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-[#101c38] text-white text-[9px] font-mono px-2.5 py-1 tracking-wider uppercase rounded-xs shadow-sm border border-white/10">
                  {activeMember.department || "Core Studio"}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* === Right Column: Member Details, Bio & High-Contrast Controls === */}
        <div className="md:col-span-5 flex flex-col justify-between md:pl-6 order-3 md:order-3">
          <div className="relative overflow-hidden pt-2 md:pt-6 min-h-[220px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={safeIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Department & Role */}
                <p className="text-xs font-mono font-semibold text-[#2563eb] tracking-wider uppercase">
                  {activeMember.role}
                </p>

                {/* Member Name in NetCraft Deep Ink with Space Grotesk */}
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#101c38] font-['Space_Grotesk'] mt-1.5">
                  {activeMember.name}
                </h3>

                {/* Bio / Philosophy Quote */}
                <blockquote className="mt-5 text-base md:text-[17px] font-normal leading-relaxed text-[#475569] border-l-2 border-[#2563eb] pl-4 italic bg-[#f8fafc]/70 py-2.5 rounded-r-sm">
                  "{activeMember.bio}"
                </blockquote>

                {/* Skills tags matching website .tech-tag pattern */}
                {activeMember.skills && activeMember.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {activeMember.skills.map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono text-[#101c38] bg-[#eef2f8] px-2.5 py-1 rounded-sm border border-[#cfd8e5]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation & Action Controls */}
          <div className="flex items-center justify-between mt-8 md:mt-0 pt-5 border-t border-[#cfd8e5]">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #101c38',
                  color: '#101c38',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(16, 28, 56, 0.08)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#101c38';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#101c38';
                }}
                onClick={handlePrev}
                aria-label="Previous specialist"
                title="Previous Specialist (Left Arrow)"
              >
                <ArrowLeft size={20} strokeWidth={2.5} />
              </button>

              <button
                type="button"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#101c38',
                  border: '1.5px solid #101c38',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(16, 28, 56, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#101c38';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#101c38';
                }}
                onClick={handleNext}
                aria-label="Next specialist"
                title="Next Specialist (Right Arrow)"
              >
                <ArrowRight size={20} strokeWidth={2.5}  />
              </button>
            </div>

            {activeMember.email && (
              <a
                href={`mailto:${activeMember.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#2563eb] hover:text-[#101c38] transition-colors border-b border-[#2563eb]/50 pb-0.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact {activeMember.name.split(" ")[0]} ↗</span>
              </a>
            )}
          </div>

          {/* Mobile All Specialists Thumbnails Grid (Visible only on mobile) */}
          <div className="block md:hidden mt-6 pt-5 border-t border-[#cfd8e5]/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#667085] font-semibold">
                All Specialists ({members.length})
              </span>
              <span className="text-[9px] font-mono text-[#2563eb]">
                Tap to switch
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {members.map((member: Member, index: number) => {
                const isActive = index === safeIndex;
                return (
                  <button
                    key={member.id}
                    onClick={() => handleThumbnailClick(index)}
                    className={cn(
                      "group relative rounded-sm overflow-hidden aspect-[4/5] transition-all duration-200 focus:outline-none cursor-pointer",
                      isActive
                        ? "border-2 border-[#2563eb] ring-2 ring-[#2563eb]/25 shadow-md opacity-100 scale-102"
                        : "border border-[#cfd8e5] opacity-65 hover:opacity-100 hover:border-[#2563eb] bg-[#f8fafc]"
                    )}
                    aria-label={`Select ${member.name}`}
                    title={`${member.name} (${member.role})`}
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-300",
                        isActive
                          ? "scale-105 filter-none"
                          : "grayscale group-hover:grayscale-0 group-hover:scale-105"
                      )}
                      onError={(e: any) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";
                      }}
                    />

                    {isActive && (
                      <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2563eb] ring-2 ring-white shadow-xs" />
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101c38]/90 via-[#101c38]/60 to-transparent p-1 pt-3">
                      <span className="text-[8px] font-mono text-white block truncate font-medium leading-none">
                        {member.name.split(" ")[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberSlider;
