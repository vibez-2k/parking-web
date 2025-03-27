'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaSearch, FaParking, FaWallet, FaClock } from 'react-icons/fa';

const HowItWorks: React.FC = () => {
  // Use translations for how it works section
  const t = useTranslations('howItWorks');
  
  // Define steps with their corresponding icons
  const steps = [
    { icon: <FaSearch className="w-10 h-10 text-[#FED835]" />, step: 1 },
    { icon: <FaParking className="w-10 h-10 text-[#FED835]" />, step: 2 },
    { icon: <FaWallet className="w-10 h-10 text-[#FED835]" />, step: 3 },
    { icon: <FaClock className="w-10 h-10 text-[#FED835]" />, step: 4 }
  ];
  
  return (
    <section id="howItWorks" className="py-10 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-foreground-accent">{t('sectionLabel')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4">{t('heading')}</h2>
          <p className="text-foreground-accent max-w-2xl mx-auto">{t('subheading')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <div className="bg-[#304fff] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-3">{t(`steps.${index}.title`)}</h3>
              <p className="text-foreground-accent">{t(`steps.${index}.description`)}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#download" className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            {t('ctaButton')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;