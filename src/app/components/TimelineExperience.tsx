'use client';

import { motion } from 'framer-motion';
import { type Experience } from '../data/experiences';
import { useState } from 'react';
import Image from 'next/image';

interface TimelineExperienceProps {
  experience: Experience;
  index: number;
  isLast: boolean;
  onClick: () => void;
  isSelected: boolean;
}

export default function TimelineExperience({ experience, index, isLast, onClick, isSelected }: TimelineExperienceProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isTechnical = experience.category === 'technical';

  // Gestion des touches clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex items-start gap-6 md:gap-8 pb-12"
    >
      {/* Timeline line and dot - Mobile: à gauche, Desktop: centré */}
      <div className="relative flex flex-col items-center md:items-center">
        {/* Enhanced Dot with Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className={`relative z-10 group cursor-pointer`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Pulsing ring for technical positions ou expérience sélectionnée */}
          {(isTechnical || isSelected) && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: isSelected ? 1 : 2, repeat: Infinity }}
              className={`absolute inset-0 rounded-full -m-2 ${
                isSelected 
                  ? 'bg-cyan-400/30' 
                  : 'bg-blue-500/20'
              }`}
            />
          )}
          
          {/* Main dot */}
          <div className={`flex h-12 w-12 items-center justify-center rounded-full text-xl
            ${isSelected
              ? 'bg-gradient-to-br from-cyan-400 to-blue-500 ring-4 ring-cyan-400/50'
              : isTechnical 
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 ring-4 ring-blue-500/30' 
                : 'bg-gradient-to-br from-emerald-500 to-teal-500 ring-4 ring-emerald-500/30'
            } ring-offset-2 ring-offset-slate-900 shadow-lg hover:shadow-xl transition-all duration-300
            group-hover:scale-110`}
          >
            <span className="filter drop-shadow-sm">{experience.icon}</span>
          </div>

          {/* Tooltip */}
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg border border-slate-700 whitespace-nowrap z-20"
            >
              {experience.keyword}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
            </motion.div>
          )}
        </motion.div>
        
        {/* Enhanced Vertical line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            className={`absolute top-12 w-1 rounded-full
              ${isTechnical 
                ? 'bg-gradient-to-b from-blue-500 via-cyan-500 to-slate-600' 
                : 'bg-gradient-to-b from-emerald-500 via-teal-500 to-slate-600'
              }`}
            style={{ height: 'calc(100% + 3rem)' }}
          />
        )}
      </div>

      {/* Content - Clickable Card */}
      <div className="flex-1 min-w-0">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          onClick={onClick}
          onKeyDown={handleKeyDown}
          className={`w-full text-left rounded-xl bg-slate-800 p-6 shadow-lg border transition-all duration-300 hover:shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
            ${isSelected
              ? 'border-cyan-500/70 shadow-cyan-500/20 transform scale-[1.02]'
              : isTechnical 
                ? 'border-slate-700 hover:border-blue-500/50 hover:shadow-blue-500/10' 
                : 'border-slate-700 hover:border-emerald-500/50 hover:shadow-emerald-500/10'
            } ${isTechnical ? 'focus:ring-blue-500' : 'focus:ring-emerald-500'}`}
          aria-label={`Voir les détails de l'expérience ${experience.title} chez ${experience.company}`}
        >
          {/* Enhanced Header with better hierarchy */}
          <div className="mb-5">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
              {/* Title without leading icon */}
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {experience.title}
                </h3>
              </div>
              {/* Badges: period + contract */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-sm font-semibold px-4 py-2 rounded-full w-fit shadow-sm
                  ${isSelected
                    ? 'text-cyan-200 bg-cyan-500/30 border border-cyan-400/50'
                    : isTechnical 
                      ? 'text-blue-300 bg-blue-500/20 border border-blue-500/30' 
                      : 'text-emerald-300 bg-emerald-500/20 border border-emerald-500/30'
                  }`}>
                  {experience.period}
                </span>
                {experience.contract && (
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full w-fit shadow-sm
                    ${isSelected
                      ? 'text-cyan-200 bg-cyan-500/30 border border-cyan-400/50'
                      : isTechnical 
                        ? 'text-blue-300 bg-blue-500/20 border border-blue-500/30' 
                        : 'text-emerald-300 bg-emerald-500/20 border border-emerald-500/30'
                    }`}>
                    {experience.contract}
                  </span>
                )}
              </div>
            </div>
            
            {/* Company and location with improved hierarchy */}
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="flex items-center gap-2">
                <div className="relative h-6 w-6 rounded-md overflow-hidden bg-white/10">
                  <Image
                    src={experience.logo}
                    alt={`Logo ${experience.company}`}
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                {experience.website ? (
                  <a
                    href={experience.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-lg font-semibold text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline"
                  >
                    {experience.company}
                  </a>
                ) : (
                  <span className="text-lg font-semibold text-slate-100">{experience.company}</span>
                )}
              </div>
              <span className="hidden sm:inline text-slate-500 text-lg">•</span>
              <span className="text-slate-400 italic text-base">{experience.location}</span>
            </div>
          </div>

          {/* Enhanced Points with better bullets */}
          <ul className="space-y-3">
            {experience.points.map((point, pointIndex) => (
              <motion.li
                key={pointIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.4 + pointIndex * 0.1 }}
                className="flex items-start gap-4 text-slate-300 leading-relaxed"
              >
                <div className={`mt-2 h-2 w-2 rounded-full flex-shrink-0 shadow-sm
                  ${isSelected 
                    ? 'bg-cyan-400' 
                    : isTechnical ? 'bg-blue-400' : 'bg-emerald-400'
                  }`} 
                />
                <span className="text-base">{point}</span>
              </motion.li>
            ))}
          </ul>
          {/* Indicateur cliquable */}
          <div className="mt-4 flex items-center gap-2 text-slate-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Cliquer pour voir les détails</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
