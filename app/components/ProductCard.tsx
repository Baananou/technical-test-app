import { MdDeleteForever } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
// components/ProductCard.tsx
import React from "react";
import { Product } from "../Types";
import PopularityGauge from "./PopularityGauge";

interface ProductCardProps {
	product: Product;
	onRemove: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onRemove }) => {
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
