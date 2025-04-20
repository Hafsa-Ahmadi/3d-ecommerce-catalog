import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Product } from '../../data/products';

interface ProductComparisonProps {
  products: Product[];
  onClose: (productId: string) => void;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ products, onClose }) => {
  const features = Array.from(
    new Set(products.flatMap(product => product.features))
  );
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
      <table className="w-full min-w-max">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-4 text-left font-medium text-gray-500 min-w-[200px]">Feature</th>
            {products.map((product) => (
              <th key={product.id} className="p-4 min-w-[250px]">
                <div className="relative">
                  <button
                    onClick={() => onClose(product.id)}
                    className="absolute -top-2 -right-2 p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <X size={14} />
                  </button>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-32 h-32 mx-auto rounded-lg object-cover mb-4"
                  />
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-primary-600 font-medium mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4 font-medium text-gray-500">Category</td>
            {products.map((product) => (
              <td key={product.id} className="p-4 text-center">
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {product.category}
                </span>
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-medium text-gray-500">Rating</td>
            {products.map((product) => (
              <td key={product.id} className="p-4 text-center">
                <div className="flex items-center justify-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{product.rating}</span>
                  <span className="text-gray-400 ml-1">({product.reviewCount})</span>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-medium text-gray-500">Stock</td>
            {products.map((product) => (
              <td key={product.id} className="p-4 text-center">
                <span className={`font-medium ${
                  product.stock > 10 
                    ? 'text-green-600' 
                    : product.stock > 0 
                      ? 'text-orange-500' 
                      : 'text-red-500'
                }`}>
                  {product.stock} units
                </span>
              </td>
            ))}
          </tr>
          {features.map((feature) => (
            <tr key={feature}>
              <td className="p-4 font-medium text-gray-500">{feature}</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  {product.features.includes(feature) ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full"
                    >
                      ✓
                    </motion.span>
                  ) : (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-block w-6 h-6 bg-gray-100 text-gray-400 rounded-full"
                    >
                      -
                    </motion.span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductComparison;