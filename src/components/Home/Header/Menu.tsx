import { Search, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Menu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navLinks = [
        { name: 'Find a Mentor', href: '#' },
        { name: 'Become a Mentor', href: '#' },
        { name: 'Resources', href: '#' },
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
                    <li key={link.name}>
                        <a
                            href={link.href}
                            className="text-secondary font-medium hover:text-accent transition-colors duration-200"
                        >
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="flex items-center gap-4 md:border-l md:border-secondary/10 md:pl-8">
                <button className="p-2 hover:bg-secondary/5 rounded-full transition-colors">
                    <Search size={20} className="text-secondary" />
                </button>
                <div className="relative hidden md:block" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-secondary text-primary px-6 py-2.5 rounded-full font-semibold hover:opacity-90 transition-all flex items-center gap-2"
                    >
                        Join
                        <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-full right-0 mt-3 w-48 bg-primary border border-secondary/10 rounded-2xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                            <button className="w-full text-left px-4 py-3 text-secondary font-medium hover:bg-secondary/5 transition-colors">
                                as a mentor
                            </button>
                            <button className="w-full text-left px-4 py-3 text-secondary font-medium hover:bg-secondary/5 transition-colors border-t border-secondary/5">
                                as a mentee
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Menu;
