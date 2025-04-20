import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cart = useCartStore((state) => state.items);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || isMobileMenuOpen 
      ? 'bg-white shadow-md py-3' 
      : 'bg-transparent py-5'
  }`;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Furniture', path: '/?category=furniture' },
    { name: 'Electronics', path: '/?category=electronics' },
    { name: 'Fashion', path: '/?category=fashion' },
    { name: 'Accessories', path: '/?category=accessories' },
  ];

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-500">
            Lumina
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                  location.pathname === link.path ? 'text-primary-500' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-gray-700 hover:text-primary-500 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <Link 
              to="/profile" 
              className="p-2 text-gray-700 hover:text-primary-500 transition-colors"
              aria-label="Profile"
            >
              <User size={20} />
            </Link>

            <Link 
              to="/cart" 
              className="p-2 text-gray-700 hover:text-primary-500 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-accent-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Link>

            <button
              className="block md:hidden p-2 text-gray-700 hover:text-primary-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base font-medium transition-colors hover:text-primary-500 ${
                    location.pathname === link.path ? 'text-primary-500' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;