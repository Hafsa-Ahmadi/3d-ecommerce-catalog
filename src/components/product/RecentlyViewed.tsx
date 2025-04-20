import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecentlyViewedStore } from '../../store/recentlyViewedStore';

const RecentlyViewed: React.FC = () => {
  const { items, clearHistory } = useRecentlyViewedStore();
  
  if (items.length === 0) return null;
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold">Recently Viewed</h2>
          </div>
          
          <button
            onClick={clearHistory}
            className="text-sm text-gray-500 hover:text-primary-500 transition-colors"
          >
            Clear History
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/product/${product.id}`}
                className="block bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-square">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-primary-600 font-medium mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: items.length * 0.1 }}
            className="flex items-center justify-center"
          >
            <Link
              to="/"
              className="flex items-center text-primary-500 hover:text-primary-600 transition-colors"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;