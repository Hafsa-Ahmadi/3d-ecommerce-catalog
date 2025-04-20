import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FilterBar from '../components/ui/FilterBar';
import ProductCard from '../components/ui/ProductCard';
import { getProductsByCategory, getPopularProducts, Product } from '../data/products';

const categories = [
  { label: 'Furniture', value: 'furniture' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Accessories', value: 'accessories' },
];

interface PriceRange {
  min: number;
  max: number;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<{ category?: string; priceRange?: PriceRange }>({});
  const [isLoading, setIsLoading] = useState(true);
  
  const location = useLocation();
  
  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
    
    setTimeout(() => {
      setPopularProducts(getPopularProducts());
      
      let filteredProducts = getProductsByCategory(filters.category);
      
      if (filters.priceRange) {
        filteredProducts = filteredProducts.filter(
          product => 
            product.price >= (filters.priceRange?.min || 0) && 
            product.price <= (filters.priceRange?.max || Infinity)
        );
      }
      
      setProducts(filteredProducts);
      setIsLoading(false);
    }, 800);
  }, [filters, location.search]);
  
  const handleFilterChange = (newFilters: { category?: string; priceRange?: PriceRange }) => {
    setFilters(newFilters);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  
  return (
    <div>
      {/* Hero Section */}
      <motion.section 
        className="relative h-[70vh] flex items-center bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-black opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1 }}
          />
          <motion.img 
            src="https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg" 
            alt="Modern interior" 
            className="object-cover w-full h-full"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Experience Shopping in 3D</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">Explore our collection of premium products with interactive 3D visualization.</p>
            <motion.button 
              className="px-8 py-3 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now <ArrowRight className="ml-2" size={18} />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Popular Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Products</h2>
            <a href="#" className="text-primary-500 hover:text-primary-600 font-medium flex items-center">
              View All <ArrowRight className="ml-1" size={16} />
            </a>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              // Skeleton loading
              Array.from({ length: 4 }).map((_, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                  variants={childVariants}
                >
                  <div className="aspect-square bg-gray-200 animate-pulse" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mt-4" />
                  </div>
                </motion.div>
              ))
            ) : (
              popularProducts.slice(0, 4).map(product => (
                <motion.div key={product.id} variants={childVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>
      
      {/* Main Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Explore Our Products</h2>
          
          <FilterBar 
            categories={categories}
            onFilterChange={handleFilterChange}
          />
          
          {isLoading ? (
            // Skeleton loading for filtered products
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                  variants={childVariants}
                >
                  <div className="aspect-square bg-gray-200 animate-pulse" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mt-4" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : products.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products.map(product => (
                <motion.div key={product.id} variants={childVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or browse our popular products.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;