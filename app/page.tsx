"use client";
import React, { useEffect, useState } from "react";
import { Product } from "./Types";
import ProductCard from "./components/ProductCard";
import { products } from "./lib/products";
import CategoryFilter from "./components/CategoryFilter";
import Pagination from "./components/Pagination";

export default function Home() {
	const [productData, setProductData] = useState<Product[] | null>(null);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
		null
	);

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(
		filteredProducts?.length || 100
	);

	useEffect(() => {
		products.then((data) => setProductData(data));
	}, []);

	const removeProduct = (productId: string) => {
		if (productData) {
			const updatedProducts = productData.filter(
				(product) => product.id !== productId
			);
			setProductData(updatedProducts);
		}
	};
	console.log(productData);

	const filterProductsByCategory = (category: string) => {
		setSelectedCategories((prevSelectedCategories) => {
			if (prevSelectedCategories.includes(category)) {
				// If the category is already selected, remove it
				return prevSelectedCategories.filter((cat) => cat !== category);
			} else {
				// If the category is not selected, add it
				return [...prevSelectedCategories, category];
			}
		});
	};

	useEffect(() => {
		if (productData) {
			const filtered =
				selectedCategories.length === 0
					? productData
					: productData.filter((product) =>
							selectedCategories.includes(product.category)
					  );

			setFilteredProducts(filtered);
			setCurrentPage(1);
		}
	}, [selectedCategories, productData]);

	// Calculate indexes for pagination
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredProducts?.slice(
		indexOfFirstItem,
		indexOfLastItem
	);
	// console.log(filteredProducts);

	// Handle page change
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className=" justify-center flex items-center flex-col">
			<h1 className="text-2xl my-4">Products</h1>

			<div className="container p-6">
				<div className="flex justify-center my-4">
					<CategoryFilter
						products={productData || []}
						selectedCategories={selectedCategories}
						onCategoryChange={filterProductsByCategory}
					/>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  gap-4">
					{currentItems?.map((product) => (
						<ProductCard
							isLoading={false}
							key={product.id}
							product={product}
							onRemove={() => removeProduct(product.id)}
						/>
					))}
				</div>
				<div className="flex justify-between items-center mx-12">
					<Pagination
						currentPage={currentPage}
						totalPage={Math.ceil(
							(filteredProducts?.length || 0) / itemsPerPage
						)}
						onPageChange={paginate}
					/>
					<div className="flex flex-row xl:flex-col items-center justify-center mt-4 ">
						<select
							className="rounded-lg p-2 border border-gray-300"
							title="per page"
							value={itemsPerPage}
							onChange={(e) => setItemsPerPage(Number(e.target.value))}>
							<option value={filteredProducts?.length}>All</option>
							<option value={4}>4 per page</option>
							<option value={8}>8 per page</option>
							<option value={12}>12 per page</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
}