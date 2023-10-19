import React from "react";
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

	const handleCategoryChange = (category: string) => {
		onCategoryChange(category);
	};
	// console.log(selectedCategories);

	return (
		<div className="flex justify-center items-center gap-4">
			Categories:
			<ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
				{allCategories.map((category) => (
					<li key={category} className={"w-fit"}>
						<div className="flex items-center pl-3 px-4">
							<input
								id={`${category}-checkbox-list`}
								type="checkbox"
								value={category}
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
								onChange={() => handleCategoryChange(category)}
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
	);
};

export default CategoryFilter;
