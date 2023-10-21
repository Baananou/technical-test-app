"use client";

import React, { useEffect, useState } from "react";
import { Product } from "../../Types";
import ProductCard from "../../components/ProductCard";
import { products } from "../../lib/products";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { category: string } }) {
	
	// Decoded the Category so i can Receive the & character
	const category = decodeURIComponent(params.category);

	const router = useRouter();

	// State for product data
	const [productData, setProductData] = useState<Product[] | null>(null);

	// Fetch product data for the selected category
	useEffect(() => {
		// Filter products by the selected category
		products.then((data) => {
			const filtered = data.filter((product) => product.category === category);
			setProductData(filtered);
		});
	}, [category]);

	// Remove a product from the list
	const removeProduct = (productId: string) => {
		if (productData) {
			const updatedProducts = productData.filter(
				(product) => product.id !== productId
			);
			setProductData(updatedProducts);

			if (updatedProducts.length === 0) {
				// Redirect to the home page if all products are deleted
				router.push("/");
			}
		}
	};

	return (
		<div className="justify-center flex items-center flex-col">
			<h1 className="text-2xl my-4 font-bold text-primary-dark">
				Products for {category}
			</h1>

			<div className="container p-6">
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
					{productData && productData.length > 0 ? (
						// Render product cards
						productData.map((product) => (
							<ProductCard
								isLoading={false}
								key={product.id}
								product={product}
								onRemove={() => removeProduct(product.id)}
							/>
						))
					) : (
						// Display message when no products
						<div className="py-4">
							<h1 className="text-red-600 font-bold">
								No products for the moment
							</h1>
						</div>
					)}
				</div>
			</div>

			{/* Add Go Back button */}
			<button
				className="bg-primary-dark text-white p-2 rounded-lg"
				onClick={() => router.push("/")}>
				Go Back
			</button>
		</div>
	);
}
