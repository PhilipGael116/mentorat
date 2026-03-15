import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Menu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { t, i18n } = useTranslation();

    const navLinks = [
        { nameKey: 'header.links.findMentor', href: '/register-mentee' },
        { nameKey: 'header.links.becomeMentor', href: '/register-mentor' },
        { nameKey: 'header.links.resources', href: '#' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <nav className="flex items-center gap-8">
            <ul className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <li key={link.nameKey}>
                        <Link
                            to={link.href}
                            className="text-secondary font-medium hover:text-accent transition-colors duration-200"
                        >
                            {t(link.nameKey)}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="flex items-center gap-4 md:border-l md:border-secondary/10 md:pl-8">
                {/* Language Toggle */}
                <button
                    onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}
                    className="font-bold text-secondary border-2 border-secondary/20 rounded-full px-4 py-1.5 hover:bg-secondary/5 transition-colors text-sm"
                >
                    {i18n.language === 'en' ? 'FR' : 'EN'}
                </button>
                <div className="relative hidden md:block" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-secondary text-primary px-6 py-2.5 rounded-full font-semibold hover:opacity-90 transition-all flex items-center gap-2"
                    >
                        {t('header.join')}
                        <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-full right-0 mt-3 w-48 bg-primary border border-secondary/10 rounded-2xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                            <Link to="/register-mentor" className="block w-full text-left px-4 py-3 text-secondary font-medium hover:bg-secondary/5 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                {t('header.asMentor')}
                            </Link>
                            <Link to="/register-mentee" className="block w-full text-left px-4 py-3 text-secondary font-medium hover:bg-secondary/5 transition-colors border-t border-secondary/5" onClick={() => setIsDropdownOpen(false)}>
                                {t('header.asMentee')}
                            </Link>
                            <Link to="/sign-in" className="block w-full text-left px-4 py-3 text-secondary font-medium hover:bg-secondary/5 transition-colors border-t border-secondary/5" onClick={() => setIsDropdownOpen(false)}>
                                {t('header.signIn')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Menu;
