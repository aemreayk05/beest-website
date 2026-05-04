'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Layers } from 'lucide-react';

const iconMap = {
    Award,
    Layers,
};

interface QuickAccessCardProps {
    title: string;
    description: string;
    iconName: keyof typeof iconMap;
    href: string;
    bgColor?: string;
    textColor?: string;
    iconColor?: string;
    className?: string;
}

export default function QuickAccessCard({
    title,
    description,
    iconName,
    href,
    bgColor = 'bg-white',
    textColor = 'text-[#111111]',
    iconColor = 'text-[#7F00FF]',
    className = ''
}: QuickAccessCardProps) {
    const Icon = iconMap[iconName];
    return (
        <div className={`w-full px-6 py-4 lg:hidden ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
            >
                <Link href={href} className="block group">
                    <div className={`relative overflow-hidden rounded-[2rem] p-8 flex flex-col gap-6 shadow-[0_10px_30px_-10px_rgba(17,17,17,0.08)] ${bgColor}`}>
                        <div className="flex justify-between items-start">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-black/5 ${iconColor}`}>
                                <Icon size={24} strokeWidth={1.5} />
                            </div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-black/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#7F00FF] group-hover:border-transparent ${textColor} group-hover:text-white`}>
                                <ArrowRight size={20} strokeWidth={1.5} className={bgColor === 'bg-[#7F00FF]' ? 'text-white' : ''} />
                            </div>
                        </div>
                        
                        <div>
                            <h3 className={`text-2xl font-black mb-1 ${textColor}`}>
                                {title}
                            </h3>
                            <p className={`text-sm opacity-60 font-medium ${textColor}`}>
                                {description}
                            </p>
                        </div>
                        
                        <div className="absolute inset-0 border-[2px] border-transparent rounded-[2rem] transition-colors duration-500 group-hover:border-[#7F00FF]/20 pointer-events-none" />
                    </div>
                </Link>
            </motion.div>
        </div>
    );
}
