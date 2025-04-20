import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check } from 'lucide-react';

interface StockNotificationProps {
  productId: string;
  productName: string;
}

const StockNotification: React.FC<StockNotificationProps> = ({ productId, productName }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubscribed(true);
    
    // Reset after showing success message
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 3000);
  };
  
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center mb-4">
        <Bell className="w-5 h-5 text-primary-500 mr-2" />
        <h3 className="text-sm font-medium text-gray-900">Get Stock Notifications</h3>
      </div>
      
      <AnimatePresence mode="wait">
        {isSubscribed ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center text-green-600"
          >
            <Check className="w-5 h-5 mr-2" />
            <span className="text-sm">We'll notify you when this item is back in stock!</span>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <p className="text-sm text-gray-600">
              Enter your email to be notified when {productName} is back in stock.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary-500 text-white rounded-md text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Notify Me'}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StockNotification;