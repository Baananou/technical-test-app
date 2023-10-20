"use client";
import { AiOutlineReload } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { Product } from "./Types";
import ProductCard from "./components/ProductCard";
import { products } from "./lib/products";
import CategoryFilter from "./components/CategoryFilter";
import Pagination from "./components/Pagination";
import PerPageSelector from "./components/PerPageSelector";

export default function Home() {
	// State for product data
	const [productData, setProductData] = useState<Product[] | null>(null);

	// State for selected categories
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	// State for filtered products
	const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
		null
	);

	// State for category-product mapping
	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[category: string]: Product[];
	}>({});

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(
		filteredProducts?.length || 100
	);

	// Fetch product data and initialize category-product mapping
	useEffect(() => {
		products.then((data) => {
			setProductData(data);
			const categoryMap: { [category: string]: Product[] } = {};
			data.forEach((product) => {
				if (!categoryMap[product.category]) {
					categoryMap[product.category] = [product];
				} else {
					categoryMap[product.category]?.push(product);
				}
			});
			setCategoryProductsMap(categoryMap);
		});
	}, []);

	// Remove a product from the list and update category mapping
	const removeProduct = (productId: string, category: string) => {
		if (productData) {
			const updatedProducts = productData.filter(
				(product) => product.id !== productId
			);
			setProductData(updatedProducts);

			// Check if any products with the same category exist
			if (categoryProductsMap[category]) {
				const updatedCategoryProducts = categoryProductsMap[category]?.filter(
					(product) => product.id !== productId
				);
				if (updatedCategoryProducts?.length === 0) {
					// Remove the category from selectedCategories
					setSelectedCategories((prevSelectedCategories) =>
						prevSelectedCategories.filter((cat) => cat !== category)
					);
				}
				setCategoryProductsMap((prevCategoryProductsMap) => {
					const updatedMap = { ...prevCategoryProductsMap };
					updatedMap[category] = updatedCategoryProducts || [];
					return updatedMap;
				});
			}
		}
	};

	// Filter products by category
	const filterProductsByCategory = (category: string) => {
		setSelectedCategories((prevSelectedCategories) => {
			if (prevSelectedCategories.includes(category)) {
				return prevSelectedCategories.filter((cat) => cat !== category);
			} else {
				return [...prevSelectedCategories, category];
			}
		});
	};

	// Update filtered products when selected categories change
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

	// Handle page change
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	// Reset page to 1 when itemsPerPage changes
	useEffect(() => {
		setCurrentPage(1);
	}, [itemsPerPage]);

	return (
		<div className="justify-center flex items-center flex-col">
			<h1 className="text-2xl my-4 font-bold text-primary-dark">Products</h1>

			<div className="container p-6">
				<div className="flex justify-between items-center my-4 gap-4">
					{/* Category filter component */}
					<CategoryFilter
						products={productData || []}
						selectedCategories={selectedCategories}
						onCategoryChange={filterProductsByCategory}
					/>

					{/* Items per page selector component */}
					<PerPageSelector
						itemsPerPage={itemsPerPage}
						setItemsPerPage={setItemsPerPage}
						totalItems={filteredProducts?.length || 0}
					/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
					{currentItems && currentItems.length > 0 ? (
						// Render product cards
						currentItems.map((product) => (
							<ProductCard
								isLoading={false}
								key={product.id}
								product={product}
								onRemove={() => removeProduct(product.id, product.category)}
							/>
						))
					) : (
						// Display message and reload button when no products
						<div className="py-4">
							<h1 className="text-red-600 font-bold">
								No products for the moment
							</h1>
							<button
								className="flex gap-2 items-center bg-white shadow-lg p-2 rounded-lg"
								onClick={() => window.location.reload()}>
								Please Reload the Page
								<AiOutlineReload className="hover:animate-spin" size={24} />
							</button>
						</div>
					)}
				</div>

				<div className="flex justify-center items-center mx-12">
					{/* Pagination component */}
					<Pagination
						currentPage={currentPage}
						totalPage={Math.ceil(
							(filteredProducts?.length || 0) / itemsPerPage
						)}
						onPageChange={paginate}
					/>
				</div>
			</div>
		</div>
	);
}
