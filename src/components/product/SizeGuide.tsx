import React from 'react';
import { motion } from 'framer-motion';
import { Ruler } from 'lucide-react';

interface SizeGuideProps {
  category: string;
}

const SizeGuide: React.FC<SizeGuideProps> = ({ category }) => {
  const sizeCharts = {
    fashion: {
      title: 'Clothing Size Guide',
      headers: ['Size', 'Chest (in)', 'Waist (in)', 'Hip (in)'],
      rows: [
        ['XS', '32-34', '26-28', '34-36'],
        ['S', '34-36', '28-30', '36-38'],
        ['M', '36-38', '30-32', '38-40'],
        ['L', '38-40', '32-34', '40-42'],
        ['XL', '40-42', '34-36', '42-44'],
      ],
    },
    accessories: {
      title: 'Accessories Size Guide',
      headers: ['Size', 'Wrist (cm)', 'Neck (cm)', 'Head (cm)'],
      rows: [
        ['XS', '14-15', '34-36', '54-55'],
        ['S', '15-16', '36-38', '55-56'],
        ['M', '16-17', '38-40', '56-57'],
        ['L', '17-18', '40-42', '57-58'],
        ['XL', '18-19', '42-44', '58-59'],
      ],
    },
  };
  
  const chart = sizeCharts[category as keyof typeof sizeCharts];
  
  if (!chart) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center mb-6">
        <Ruler className="w-6 h-6 text-primary-500 mr-2" />
        <h3 className="text-lg font-semibold">{chart.title}</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-gray-50">
              {chart.headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chart.rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      cellIndex === 0 ? 'font-medium text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">How to Measure</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Use a soft measuring tape</li>
          <li>• Measure over undergarments</li>
          <li>• Keep tape straight but not tight</li>
          <li>• When in doubt, size up</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default SizeGuide;