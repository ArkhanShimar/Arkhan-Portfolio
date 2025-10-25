"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Calendar, Users, Award, BookOpen } from "lucide-react";

type Activity = {
  id: number;
  title: string;
  role: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

export function Activities() {
  const activities: Activity[] = [
    {
      id: 1,
      title: "Mathematics Tutor",
      role: "Private Tutor",
      period: "2023 - Present",
      description: "Providing personalized mathematics tutoring to students, focusing on problem-solving techniques and exam preparation.",
      icon: <BookOpen className="h-6 w-6" />,
      color: "text-cyan-400"
    },
    {
      id: 2,
      title: "Student Council Member",
      role: "ICBT Kandy Campus",
      period: "2025",
      description: "Served as a student representative, voicing student concerns and contributing to campus initiatives and decision-making processes.",
      icon: <Users className="h-6 w-6" />,
      color: "text-purple-400"
    },
    {
      id: 3,
      title: "Event Organizer",
      role: "Dreams 360+ Exhibition - ICBT Kandy Campus",
      period: "2025",
      description: "Played a key role in organizing the Dreams 360+ exhibition, coordinating logistics, and ensuring a successful event.",
      icon: <Calendar className="h-6 w-6" />,
      color: "text-amber-400"
    },
    {
      id: 4,
      title: "Graphic Designer",
      role: "Freelance",
      period: "2024 - Present",
      description: "Creating visually appealing designs for various clients, including digital illustrations, marketing materials, and branding assets.",
      icon: <Award className="h-6 w-6" />,
      color: "text-rose-400"
    },
    {
      id: 5,
      title: "Senior Scouts Member",
      role: "Baduriya National School",
      period: "2018 - 2020",
      description: "Active participant in scouting activities, developing leadership skills and community service initiatives.",
      icon: <Award className="h-6 w-6" />,
      color: "text-emerald-400"
    },
    {
      id: 6,
      title: "Academic Excellence",
      role: "ICBT Kandy Campus",
      period: "2023 - Present",
      description: "Consistently achieving academic distinction through dedicated studies and strong performance in coursework.",
      icon: <Award className="h-6 w-6" />,
      color: "text-blue-400"
    }
  ];

  return (
    <section id="activities" className="relative border-t border-white/5 bg-[rgba(3,7,18,0.3)] py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Involvement"
          title="Activities & Leadership"
          description="My journey beyond academics, contributing to community and professional growth"
        />
        
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className="relative z-10">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ${activity.color} shadow-lg`}>
                  {activity.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-cyan-300">{activity.period}</span>
                  <h3 className="text-xl font-semibold text-white">{activity.title}</h3>
                  <span className="text-sm font-medium text-cyan-200">{activity.role}</span>
                </div>
                <p className="mt-4 text-slate-400">{activity.description}</p>
              </div>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 transition-all duration-700 group-hover:scale-150" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
