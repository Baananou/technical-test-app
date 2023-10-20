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
	const [productData, setProductData] = useState<Product[] | null>(null);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
		null
	);
	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[category: string]: Product[];
	}>({});

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(
		filteredProducts?.length || 100
	);

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

	console.log(selectedCategories);

	const filterProductsByCategory = (category: string) => {
		setSelectedCategories((prevSelectedCategories) => {
			if (prevSelectedCategories.includes(category)) {
				return prevSelectedCategories.filter((cat) => cat !== category);
			} else {
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

	// Handle page change
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className=" justify-center flex items-center flex-col">
			<h1 className="text-2xl my-4 font-bold text-primary-dark">Products</h1>

			<div className="container p-6">
				<div className="flex justify-between items-center my-4 gap-4">
					<CategoryFilter
						products={productData || []}
						selectedCategories={selectedCategories}
						onCategoryChange={filterProductsByCategory}
					/>
					<PerPageSelector
						itemsPerPage={itemsPerPage}
						setItemsPerPage={setItemsPerPage}
						totalItems={filteredProducts?.length || 0}
					/>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
					{currentItems && currentItems.length > 0 ? (
						currentItems.map((product) => (
							<ProductCard
								isLoading={false}
								key={product.id}
								product={product}
								onRemove={() => removeProduct(product.id, product.category)}
							/>
						))
					) : (
						<div className="py-4">
							<h1 className="text-red-600 font-bold">
								No products for the moment
							</h1>
							<button
								className="flex gap-2 items-center"
								onClick={() => window.location.reload()}>
								Please Reload the Page
								<AiOutlineReload className="hover:animate-spin" size={24} />
							</button>
						</div>
					)}
				</div>
				<div className="flex justify-center items-center mx-12">
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
