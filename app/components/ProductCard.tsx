import { MdDeleteForever } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { Product } from "../Types";
import PopularityGauge from "./PopularityGauge";

interface ProductCardProps {
	product: Product;
	onRemove: () => void;
	isLoading: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onRemove,
	isLoading,
}) => {
	const [showLoading, setShowLoading] = useState(true);

	useEffect(() => {
		if (!isLoading) {
			const timeout = setTimeout(() => {
				setShowLoading(false);
			}, 1000);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [isLoading]);

	if (showLoading) {
		return (
			<div className="p-4">
				<div className="bg-white rounded-lg shadow-md p-4">
					<div className="flex justify-between pb-4">
						<div className="animate-pulse bg-gray-200 w-1/3 h-6 rounded"></div>
					</div>
					<div className="animate-pulse bg-gray-200 h-6 rounded w-2/3"></div>
					<div className="flex justify-between items-center mt-4">
						<div className="animate-pulse bg-gray-200 w-1/5 h-6 rounded"></div>
						<div className="animate-pulse bg-gray-200 w-1/5 h-6 rounded"></div>
						<div className="animate-pulse bg-gray-200 w-1/5 h-6 rounded"></div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="p-4">
			<div className="bg-white rounded-lg shadow-md p-4">
				<div className="flex justify-between pb-4">
					<h2 className="text-lg font-bold">{product.title}</h2>
					<div className="flex gap-2">
						<MdDeleteForever onClick={onRemove} size={24} color="red" />
					</div>
				</div>
				<PopularityGauge likes={product.likes} dislikes={product.dislikes} />
				<p className="bg-gray-300 p-1 px-2 rounded-lg w-fit mt-4">
					{product.category}
				</p>
			</div>
		</div>
	);
};

export default ProductCard;
