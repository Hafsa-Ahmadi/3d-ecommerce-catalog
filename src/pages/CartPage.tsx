import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore, CartItem } from '../store/cartStore';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [subtotal, setSubtotal] = useState(0);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  
  useEffect(() => {
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setSubtotal(total);
  }, [items]);
  
  const handleRemoveItem = (id: string) => {
    setIsRemoving(id);
    setTimeout(() => {
      removeItem(id);
      setIsRemoving(null);
    }, 300);
  };
  
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };
  
  const calculateTax = () => {
    return subtotal * 0.08;
  };
  
  const calculateTotal = () => {
    return subtotal + calculateTax() + 10; // Adding flat shipping fee of $10
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingBag size={72} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/" 
            className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors inline-flex items-center"
          >
            Start Shopping <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Cart Items ({items.reduce((acc, item) => acc + item.quantity, 0)})
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center"
                >
                  <Trash2 size={16} className="mr-1" /> Clear Cart
                </button>
              </div>
            </div>
            
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isRemoving === item.id ? 0 : 1,
                    height: isRemoving === item.id ? 0 : 'auto'
                  }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="w-24 h-24 rounded-lg overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`} className="text-lg font-medium text-gray-900 hover:text-primary-500 transition-colors">
                        {item.name}
                      </Link>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} 
                            className="px-2 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1 text-gray-900 font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-primary-600 mr-4">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6 sticky top-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>$10.00</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary-600">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              className="w-full py-3 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-600 transition-colors flex items-center justify-center"
            >
              Proceed to Checkout <ArrowRight size={16} className="ml-2" />
            </Link>
            
            <div className="mt-6">
              <Link to="/" className="text-primary-500 hover:text-primary-600 text-sm flex items-center justify-center">
                <ArrowRight size={14} className="mr-1 transform rotate-180" /> Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;