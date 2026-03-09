import { useState } from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import Menu from './Menu';
import MobileMenu from './MobileMenu';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="absolute top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex items-center justify-between border-b border-secondary/5">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">W</span>
                </div>
                <span className="text-2xl font-bold text-secondary tracking-tight">
                    wimentor
                </span>
            </div>

            {/* Right Action Area */}
            <div className="flex items-center gap-2">
                {/* Navigation Menu (Desktop) */}
                <Menu />

                {/* Menu Icon (Mobile) */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="md:hidden p-2 hover:bg-secondary/5 rounded-full transition-colors"
                >
                    <MenuIcon size={28} className="text-secondary" />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <MobileMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />

        </header>
    );
};

export default Header;
