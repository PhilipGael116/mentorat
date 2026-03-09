import { X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 bg-primary md:hidden flex flex-col p-8">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                        <span className="text-primary font-bold text-xl">W</span>
                    </div>
                    <span className="text-2xl font-bold text-secondary tracking-tight">
                        wimentor
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-secondary/5 rounded-full transition-colors"
                >
                    <X size={28} className="text-secondary" />
                </button>
            </div>

            <nav className="flex-1">
                <ul className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                onClick={onClose}
                                className="text-4xl font-semibold text-secondary hover:text-accent transition-colors block"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto flex flex-col gap-4">
                <div className="relative w-full" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-secondary text-primary py-4 rounded-2xl font-bold text-xl hover:opacity-90 transition-all flex items-center justify-center gap-3"
                    >
                        Join
                        <ChevronDown
                            size={24}
                            className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute bottom-full left-0 mb-3 w-full bg-primary border border-secondary/10 rounded-2xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
                            <button className="w-full text-left px-6 py-4 text-secondary font-bold text-lg hover:bg-secondary/5 transition-colors">
                                as a mentor
                            </button>
                            <button className="w-full text-left px-6 py-4 text-secondary font-bold text-lg hover:bg-secondary/5 transition-colors border-t border-secondary/5">
                                as a mentee
                            </button>
                        </div>
                    )}
                </div>
                <button className="w-full border-2 border-secondary text-secondary py-4 rounded-2xl font-bold text-xl hover:bg-secondary/5 transition-colors">
                    Sign in
                </button>
            </div>
        </div>
    );
};

export default MobileMenu;
