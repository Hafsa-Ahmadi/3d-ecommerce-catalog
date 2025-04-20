import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-bold text-primary-500">404</h1>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Page not found</h2>
        <p className="mt-4 text-base text-gray-600 max-w-lg mx-auto">
          Sorry, we couldn't find the page you're looking for. The page might have been removed, 
          had its name changed, or is temporarily unavailable.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="flex items-center justify-center px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          <button
            className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            <Search size={18} className="mr-2" />
            Search Products
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;