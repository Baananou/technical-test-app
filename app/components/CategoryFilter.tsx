import React, { useState } from "react";
import { Product } from "../Types";

// Define props interface for CategoryFilter
interface CategoryFilterProps {
  products: Product[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

// CategoryFilter component
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  products,
  selectedCategories,
  onCategoryChange,
}) => {
  // Get a list of all unique categories from the products
  const allCategories = Array.from(
    new Set(products.map((product) => product.category))
  );

  // State for controlling the dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button to toggle the dropdown */}
      <button
        onClick={toggleDropdown}
        className="text-white bg-primary-dark hover:bg-primary focus:ring-2 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        Category
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        // Dropdown for selecting categories
        <div className="absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow">
          <ul className="p-3 space-y-3 text-sm text-gray-700">
            {allCategories.map((category) => (
              <li key={category}>
                <div className="flex items-center">
                  <input
                    id={`${category}-checkbox-list`}
                    type="checkbox"
                    value={category}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary-light focus:ring-2"
                    onChange={() => onCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                  />
                  <label
                    htmlFor={`${category}-checkbox-list`}
                    className="w-full py-3 ml-2 text-sm font-medium text-primary-dark"
                  >
                    {category}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
