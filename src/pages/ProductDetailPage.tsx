import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Heart, ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { Product, getProductById } from '../data/products';
import ProductViewer from '../components/3d/ProductViewer';
import { useCartStore } from '../store/cartStore';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  const navigate = useNavigate();
  const { addItem, items } = useCartStore();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    
    // Simulate API loading
    setTimeout(() => {
      if (id) {
        const foundProduct = getProductById(id);
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Check if product is already in cart
          const cartItem = items.find(item => item.id === id);
          if (cartItem) {
            setQuantity(cartItem.quantity);
            setIsAddedToCart(true);
          }
        } else {
          navigate('/not-found');
        }
      }
      setIsLoading(false);
    }, 1000);
  }, [id, navigate, items]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    
    setIsAddedToCart(true);
    
    // Show success message temporarily
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };
  
  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };
  
  const handleToggleModel = () => {
    setShowModel(!showModel);
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-primary-500 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 rounded-lg overflow-hidden">
            {showModel ? (
              <ProductViewer modelUrl={product.modelUrl} />
            ) : (
              <img 
                src={product.images[selectedImageIndex]} 
                alt={product.name} 
                className="w-full h-auto object-cover rounded-lg"
              />
            )}
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setShowModel(false);
                  }}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index && !showModel
                      ? 'border-primary-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            <button
              onClick={handleToggleModel}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                showModel
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showModel ? 'View Photos' : 'View in 3D'}
            </button>
          </div>
        </motion.div>
        
        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm text-primary-500 font-medium uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold">{product.name}</h1>
            </div>
            
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:text-primary-500 transition-colors" aria-label="Add to wishlist">
                <Heart size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary-500 transition-colors" aria-label="Share product">
                <Share2 size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400 mr-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className={index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
          </div>
          
          <div className="mb-6">
            <span className="block text-3xl font-bold text-primary-600 mb-1">${product.price.toFixed(2)}</span>
            <span className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-500'}`}>
              {product.stock > 10 
                ? 'In Stock' 
                : product.stock > 0 
                  ? `Only ${product.stock} left in stock!` 
                  : 'Out of Stock'}
            </span>
          </div>
          
          <div className="mb-8">
            <p className="text-gray-700 mb-4">{product.description}</p>
            
            <h3 className="text-lg font-medium mb-2">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <Check size={16} className="mr-2 text-primary-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => handleQuantityChange(-1)} 
                  className="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 text-gray-900 font-medium">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <span className="text-gray-600 text-sm">{product.stock} items available</span>
            </div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <motion.button
                className={`flex-1 py-3 rounded-md flex items-center justify-center font-medium transition-colors ${
                  isAddedToCart 
                    ? 'bg-green-500 text-white' 
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAddedToCart ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </>
                )}
              </motion.button>
              
              <Link 
                to="/checkout" 
                className="flex-1 py-3 bg-gray-900 text-white rounded-md flex items-center justify-center font-medium hover:bg-black transition-colors"
              >
                Buy Now
              </Link>
            </motion.div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Share this Product</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors" aria-label="Share on Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors" aria-label="Share on Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors" aria-label="Share on Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors" aria-label="Share on Pinterest">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage;