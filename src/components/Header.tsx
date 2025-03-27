'use client';

import { Transition } from '@headlessui/react';
import { useLocale, useTranslations } from 'next-intl'; // Import useLocale
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Use Next.js navigation instead
import React, { useState } from 'react';
import { FaGlobe, FaShieldAlt } from 'react-icons/fa';
import { HiBars3, HiOutlineXMark } from 'react-icons/hi2';

import Container from './Container';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const t = useTranslations('header');
    const siteT = useTranslations('siteDetails');
    const locale = useLocale(); // Get current locale
    const router = useRouter();
    const pathname = usePathname();

    // Define available languages
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'ta', name: 'தமிழ்' }
    ];

    // Define menu items using translations
    const menuItems = [
        { text: t('features'), url: '#features' },
        { text: t('howItWorks'), url: '#howItWorks' },
        { text: t('testimonials'), url: '#testimonials' },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleLangMenu = () => {
        setIsLangOpen(!isLangOpen);
    };

    // Updated language change function for standard Next.js navigation
    const changeLanguage = (newLocale: string) => {
        // Handle the locale change using Next.js navigation
        // This assumes your app is set up with locale prefixes in the URL
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath || `/${newLocale}`);
        setIsLangOpen(false);
    };

    return (
        <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full">
            <Container className="!px-0">
                <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <FaShieldAlt className="text-foreground min-w-fit w-7 h-7" />
                        <span className="manrope text-xl font-semibold text-foreground cursor-pointer">
                            {siteT('siteName')}
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6 items-center">
                        {menuItems.map(item => (
                            <li key={item.text} className="relative">
                                <Link
                                    href={item.url}
                                    className="text-foreground hover:text-yellow-500 relative group transition-colors"
                                >
                                    {item.text}
                                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
                                </Link>
                            </li>
                        ))}

                        <li>
                            <Link href="#cta" className="text-black bg-primary hover:bg-primary-accent px-8 py-3 rounded-full transition-colors">
                                {t('download')}
                            </Link>
                        </li>

                        {/* Language Switcher */}
                        <li className="relative">
                            <button
                                onClick={toggleLangMenu}
                                className="flex items-center gap-1 text-foreground hover:text-[#FED835] p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <FaGlobe className="w-5 h-5" />
                                <span className="uppercase">{locale}</span>
                            </button>

                            {/* Language Dropdown */}
                            {isLangOpen && (
                                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang.code)}
                                                className={`${locale === lang.code ? 'bg-gray-100 text-[#FED835]' : 'text-foreground'
                                                    } group flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#FED835] transition-colors`}
                                                role="menuitem"
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-primary text-black focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <HiBars3 className="h-6 w-6" aria-hidden="true" />
                            )}
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                </nav>
            </Container>

            {/* Mobile Menu with Transition */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
                    <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
                        {menuItems.map(item => (
                            <li key={item.text}>
                                <Link
                                    href={item.url}
                                    className="text-foreground hover:text-[#FED835] block relative group py-1"
                                    onClick={toggleMenu}
                                >
                                    {item.text}
                                    <span className="absolute left-0 bottom-0 h-0.5 bg-primary w-0 group-hover:w-1/2 transition-all duration-300"></span>
                                </Link>
                            </li>
                        ))}
                        {/* Language options in mobile menu */}
                        <li className="py-2 border-t border-gray-100 mt-2">
                            <p className="text-sm text-gray-500 mb-2">{t('language') || 'Language'}</p>
                            <div className="flex gap-4">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`${locale === lang.code ? 'bg-primary text-black' : 'bg-gray-100 text-foreground'
                                            } px-3 py-1 rounded-full text-sm transition-colors hover:opacity-90`}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        </li>
                        <li>
                            <Link
                                href="#cta"
                                className="text-black bg-primary hover:bg-primary-accent px-5 py-2 rounded-full block w-fit"
                                onClick={toggleMenu}
                            >
                                {t('download')}
                            </Link>
                        </li>
                    </ul>
                </div>
            </Transition>
        </header>
    );
};

export default Header;