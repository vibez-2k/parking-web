'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Testimonials: React.FC = () => {
    // Use translations for testimonials section
    const t = useTranslations('testimonials');
    
    // Get number of testimonials from translation
    const testimonialsCount = t.raw('items.length');
    
    return (
        <div className="grid gap-14 max-w-lg w-full mx-auto lg:gap-8 lg:grid-cols-3 lg:max-w-full">
            {Array.from({ length: testimonialsCount }).map((_, index) => (
                <div
                    key={index}
                    className=""
                >
                    <div className="flex items-center mb-4 w-full justify-center lg:justify-start">
                        <Image
                            src={t(`items.${index}.avatar`)}
                            alt={`${t(`items.${index}.name`)} avatar`}
                            width={50}
                            height={50}
                            className="rounded-full shadow-md"
                        />
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#304fff]">{t(`items.${index}.name`)}</h3>
                            <p className="text-sm text-foreground-accent">{t(`items.${index}.role`)}</p>
                        </div>
                    </div>
                    <p className="text-foreground-accent text-center lg:text-left">&quot;{t(`items.${index}.message`)}&quot;</p>
                </div>
            ))}
        </div>
    );
};

export default Testimonials;