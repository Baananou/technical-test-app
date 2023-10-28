import { MdDeleteOutline } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { Product } from "../Types";
import PopularityGauge from "./PopularityGauge";
import toast from "react-hot-toast";
import Link from "next/link";

// Define props interface for ProductCard
interface ProductCardProps {
	product: Product;
	onRemove: () => void;
	isLoading: boolean;
}

// ProductCard component
const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onRemove,
	isLoading,
}) => {
	// State to control the loading animation
	const [showLoading, setShowLoading] = useState(true);

	// Effect to hide loading animation when not loading
	useEffect(() => {
		if (!isLoading) {
			const timeout = setTimeout(() => {
				setShowLoading(false);
			}, 1000);

			return () => {
				clearTimeout(timeout);
			};
		}
		return undefined;
	}, [isLoading]);

	// Render loading animation if isLoading is true
	if (showLoading) {
		return (
			<div>
				<div className="bg-white rounded-lg shadow-md p-4 h-[160px]">
					<div className="flex justify-between pb-4">
						<div className="animate-pulse bg-gray-200 w-1/3 h-6 rounded"></div>
					</div>
					<div className="animate-pulse bg-gray-200 h-6 rounded w-2/3"></div>
					<div className="flex justify-between items-center mt-4">
						<div className="animate-pulse bg-gray-200 w-1/5 h-6 rounded"></div>
					</div>
				</div>
			</div>
		);
	}

	// Render product details if not loading
	return (
		<div className="bg-white rounded-lg shadow-md p-4">
			<div className="flex justify-between pb-4">
				<h2 className="text-lg font-bold">{product.title}</h2>
				<div className="flex gap-2">
					{/* Delete button with toast notification */}
					<MdDeleteOutline
						onClick={() => {
							onRemove();
							toast.success("Product Removed", {
								duration: 2000,
								position: "top-right",
								icon: "🗑️",
							});
						}}
						size={24}
						color="red"
						className="cursor-pointer"
					/>
				</div>
			</div>
			{/* Popularity gauge component */}
			<PopularityGauge likes={product.likes} dislikes={product.dislikes} />

			{/* Category Page link */}
			{/* Encoded the Category so i can pass the & character*/}
			<Link href={`/categories/${encodeURIComponent(product.category)}`}>
				<p className="bg-primary shadow-lg text-white p-1 px-2 rounded-lg w-fit">
					{product.category}
				</p>
			</Link>
		</div>
	);
};

export default ProductCard;
