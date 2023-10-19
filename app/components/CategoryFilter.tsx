import React, { useState } from "react";
import { Product } from "../Types";

interface CategoryFilterProps {
	products: Product[];
	selectedCategories: string[];
	onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
	products,
	selectedCategories,
	onCategoryChange,
}) => {
	const allCategories = Array.from(
		new Set(products.map((product) => product.category))
	);

	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative inline-block text-left">
			<button
				onClick={toggleDropdown}
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
				type="button">
				Category
				<svg
					className="w-2.5 h-2.5 ml-2.5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6">
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
				<div className="absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
					<ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
						{allCategories.map((category) => (
							<li key={category}>
								<div className="flex items-center">
									<input
										id={`${category}-checkbox-list`}
										type="checkbox"
										value={category}
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
										onChange={() => onCategoryChange(category)}
										checked={selectedCategories.includes(category)}
									/>
									<label
										htmlFor={`${category}-checkbox-list`}
										className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
