import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface FilterOption {
  label: string;
  value: string;
}

interface PriceRange {
  min: number;
  max: number;
}

interface FilterBarProps {
  categories: FilterOption[];
  onFilterChange: (filters: { category?: string; priceRange?: PriceRange }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 1000 });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category) {
      setSelectedCategory(category);
      setActiveFilters((prev) => 
        prev.includes('category') ? prev : [...prev, 'category']
      );
    }
  }, [location.search]);

  const handleCategoryChange = (category?: string) => {
    setSelectedCategory(category);
    
    if (category) {
      setActiveFilters((prev) => 
        prev.includes('category') ? prev : [...prev, 'category']
      );
    } else {
      setActiveFilters((prev) => prev.filter(filter => filter !== 'category'));
    }
    
    onFilterChange({ category, priceRange });
    
    // Update URL
    const params = new URLSearchParams(location.search);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    navigate({ search: params.toString() });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value);
    
    if (type === 'min') {
      setPriceRange(prev => ({ ...prev, min: value }));
    } else {
      setPriceRange(prev => ({ ...prev, max: value }));
    }
    
    if (!activeFilters.includes('price')) {
      setActiveFilters(prev => [...prev, 'price']);
    }
  };

  const handleApplyPrice = () => {
    onFilterChange({ category: selectedCategory, priceRange });
  };

  const handleClearFilters = () => {
    setSelectedCategory(undefined);
    setPriceRange({ min: 0, max: 1000 });
    setActiveFilters([]);
    onFilterChange({});
    
    // Clear URL params
    const params = new URLSearchParams();
    navigate({ search: params.toString() });
  };

  const filterVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Filter size={18} className="mr-2 text-gray-600" />
          <h2 className="text-lg font-medium">Filters</h2>
          
          {activeFilters.length > 0 && (
            <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-full">
              {activeFilters.length}
            </span>
          )}
        </div>
        
        <div className="flex items-center">
          {activeFilters.length > 0 && (
            <button 
              onClick={handleClearFilters}
              className="text-sm text-gray-500 hover:text-primary-500 mr-4 transition-colors flex items-center"
            >
              <X size={14} className="mr-1" /> Clear
            </button>
          )}
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-gray-600 hover:text-primary-500 transition-colors"
          >
            {isExpanded ? (
              <>
                <span className="mr-1 text-sm">Less</span>
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span className="mr-1 text-sm">More</span>
                <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <h3 className="text-sm font-medium mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange(undefined)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    !selectedCategory
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => handleCategoryChange(category.value)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Price Range</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1">
                  <label htmlFor="min-price" className="text-xs text-gray-500">Min ($)</label>
                  <input
                    id="min-price"
                    type="number"
                    min="0"
                    max={priceRange.max}
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange(e, 'min')}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <span className="text-gray-400">to</span>
                <div className="flex-1">
                  <label htmlFor="max-price" className="text-xs text-gray-500">Max ($)</label>
                  <input
                    id="max-price"
                    type="number"
                    min={priceRange.min}
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange(e, 'max')}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <button
                  onClick={handleApplyPrice}
                  className="h-10 px-4 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;