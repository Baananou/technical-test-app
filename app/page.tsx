"use client";
import React, { useEffect, useState } from "react";
import { Product } from "./Types";
import ProductCard from "./components/ProductCard";
import { products } from "./lib/products";

export default function Home() {
	const [productData, setProductData] = useState<Product[] | null>(null);

	useEffect(() => {
		products.then((data) => setProductData(data));
	}, []);

	// Function to remove a product card
	const removeProduct = (productId: string) => {
		// Ensure productData is not undefined before filtering
		if (productData) {
			// Filter out the product with the specified ID
			const updatedProducts = productData.filter(
				(product) => product.id !== productId
			);
			setProductData(updatedProducts);
		}
	};

	return (
		<div>
			<h1>Products</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{productData?.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onRemove={() => removeProduct(product.id)}
					/>
				))}
			</div>
		</div>
	);
}
