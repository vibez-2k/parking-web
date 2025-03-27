'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { FaCarSide, FaStopwatch, FaShieldAlt } from 'react-icons/fa';

const Stats: React.FC = () => {
    // Use translations for stats section
    const t = useTranslations('stats');
    
    // Define stats with translations and icons
    const stats = [
        {
            icon: <FaCarSide className="text-[#FED835] w-7 h-7" />,
            titleKey: 'parkingSpots.title',
            descriptionKey: 'parkingSpots.description'
        },
        {
            icon: <FaStopwatch className="text-[#FED835] w-7 h-7" />,
            titleKey: 'timeReduction.title',
            descriptionKey: 'timeReduction.description'
        },
        {
            icon: <FaShieldAlt className="text-[#FED835] w-7 h-7" />,
            titleKey: 'safetyImprovement.title',
            descriptionKey: 'safetyImprovement.description'
        }
    ];

    return (
        <section id="stats" className="py-10 lg:py-20">
            <div className="grid sm:grid-cols-3 gap-8">
                {stats.map(stat => (
                    <div key={stat.titleKey} className="text-center sm:text-left max-w-md sm:max-w-full mx-auto">
                        <h3 className="mb-5 flex items-center gap-2 text-3xl font-semibold justify-center sm:justify-start">
                            {stat.icon}
                            {t(stat.titleKey)}
                        </h3>
                        <p className="text-foreground-accent">{t(stat.descriptionKey)}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Stats;