import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../../data/products';
import { useCartStore } from '../../store/cartStore';
import ProductViewerCard from '../3d/ProductViewerCard';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };

  const handleToggleModel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModel(!showModel);
  };

  return (
    <motion.div 
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          {showModel ? (
            <ProductViewerCard modelUrl={product.modelUrl} />
          ) : (
            <motion.img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700"
              animate={{ scale: isHovered ? 1.1 : 1 }}
            />
          )}
          
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
          
          <motion.div 
            className="absolute top-2 right-2 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50 transition-colors"
              onClick={handleToggleModel}
              aria-label={showModel ? "Show image" : "Show 3D model"}
            >
              <Eye size={18} className="text-primary-500" />
            </button>
            <button 
              className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart size={18} className="text-gray-600" />
            </button>
            <button 
              className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50 transition-colors"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} className="text-gray-600" />
            </button>
          </motion.div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-base font-medium text-gray-900 line-clamp-1">{product.name}</h3>
            <div className="flex items-center">
              <span className="text-sm text-yellow-500">★</span>
              <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-primary-600">${product.price.toFixed(2)}</span>
            <span className="text-xs text-gray-500">{product.stock} left</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;