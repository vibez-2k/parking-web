import { useTranslations } from 'next-intl'; // Import translations hook
import Link from 'next/link';
import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

import { getPlatformIconByName } from '@/utils';

const Footer: React.FC = () => {
    // Use translations
    const t = useTranslations('footer');
    const siteT = useTranslations('siteDetails');

    // Current year for copyright
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-hero-background text-foreground py-10">
            <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <FaShieldAlt className="min-w-fit w-5 h-5 md:w-7 md:h-7" />
                        <h3 className="manrope text-xl font-semibold cursor-pointer">
                            {siteT('siteName')}
                        </h3>
                    </Link>
                    <p className="mt-3.5 text-foreground-accent">
                        {t('subheading') || 'Official parking and traffic management application for Tamil Nadu Police'}
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">{t('quickLinks') || 'Quick Links'}</h4>
                    <ul className="text-foreground-accent">
                        <li className="mb-2">
                            <Link href="#features" className="hover:text-foreground">{t('features') || 'Features'}</Link>
                        </li>
                        <li className="mb-2">
                            <Link href="#how-it-works" className="hover:text-foreground">{t('howItWorks') || 'How It Works'}</Link>
                        </li>
                        <li className="mb-2">
                            <Link href="#faq" className="hover:text-foreground">{t('faq') || 'FAQ'}</Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/privacy-policy" className="hover:text-foreground">{t('privacyPolicy') || 'Privacy Policy'}</Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/terms" className="hover:text-foreground">{t('termsOfUse') || 'Terms of Use'}</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">{t('contactUs') || 'Contact Us'}</h4>

                    <a href="mailto:support@tnpolice.gov.in" className="block text-foreground-accent hover:text-foreground">
                        {t('email') || 'Email'}: support@tnpolice.gov.in
                    </a>

                    <a href="tel:044-28447700" className="block text-foreground-accent hover:text-foreground">
                        {t('helpline') || 'Helpline'}: 044-28447700
                    </a>

                    <div className="mt-5 flex items-center gap-5 flex-wrap">
                        {['facebook', 'twitter', 'instagram'].map(platformName => (
                            <Link
                                href={`#${platformName}`}
                                key={platformName}
                                aria-label={platformName}
                                className="text-foreground-accent hover:text-[#FED835] transition-colors"
                            >
                                {getPlatformIconByName(platformName)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8 md:text-center text-foreground-accent px-6">
                <p>
                    {t('copyright') || `Copyright © ${currentYear} Tamil Nadu Police. All rights reserved.`}
                </p>
                <p className="text-sm mt-2 text-gray-500">
                    {t('officialApp') || 'Official parking and traffic control application for Tamil Nadu Police'}
                </p>
                <p className="text-sm mt-2 text-gray-500">
                    {t('emergencyServices') || 'For emergency services, please dial 100 or 112'}
                </p>
            </div>
        </footer>
    );
};

export default Footer;  