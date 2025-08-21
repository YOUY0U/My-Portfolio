'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { experiences, type Experience } from '../data/experiences';
import TimelineExperience from './TimelineExperience';
import ExperienceDrawer from './ExperienceDrawer';

export default function ExperienceTimeline() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  const handleExperienceClick = (experience: Experience) => {
    setSelectedExperience(experience);
  };

  const handleCloseDrawer = () => {
    setSelectedExperience(null);
  };

  return (
    <>
      <section id="experiences" className="min-h-screen bg-slate-900 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-4">
                Mes Expériences
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Mon parcours professionnel, de mes premiers pas dans le domaine technique jusqu&#39;à mes expériences les plus récentes en DevSecOps.
              </p>
            </motion.div>

            {/* Timeline Container - Responsive layout */}
            <div className="relative">
              {/* Timeline Items - Mobile: simple list, Desktop: centered timeline */}
              <div className="space-y-0 md:max-w-4xl md:mx-auto">
                {experiences.map((experience, index) => (
                  <TimelineExperience
                    key={experience.id}
                    experience={experience}
                    index={index}
                    isLast={index === experiences.length - 1}
                    onClick={() => handleExperienceClick(experience)}
                    isSelected={selectedExperience?.id === experience.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Drawer */}
      <ExperienceDrawer 
        experience={selectedExperience} 
        onClose={handleCloseDrawer} 
      />
    </>
  );
}
