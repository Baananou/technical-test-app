import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface PopularityGaugeProps {
	likes: number;
	dislikes: number;
}

const PopularityGauge: React.FC<PopularityGaugeProps> = ({
	likes,
	dislikes,
}) => {
	const [Likes, setLikes] = useState(likes);
	const [Dislikes, setDislikes] = useState(dislikes);
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);

	const handleLikeClick = () => {
		if (liked) {
			setLikes(Likes - 1);
			setLiked(false);
			toast.success("Like Removed ", {
				duration: 2000,
				position: "top-right",
				icon: "👎",
			});
		} else {
			toast.success("Product Liked", {
				duration: 2000,
				position: "top-right",
				icon: "👎",
			});
			setLikes(Likes + 1);
			setLiked(true);

			if (disliked) {
				setDislikes(Dislikes - 1);
				setDisliked(false);
			}
		}
	};

	const handleDislikeClick = () => {
		if (disliked) {
			setDislikes(Dislikes - 1);
			setDisliked(false);
			toast.success("Dislike Removed ", {
				duration: 2000,
				position: "top-right",
				icon: "👍",
			});
		} else {
			setDislikes(Dislikes + 1);
			setDisliked(true);
			toast.success("Product Disliked", {
				duration: 2000,
				position: "top-right",
				icon: "👍",
			});
			if (liked) {
				setLikes(Likes - 1);
				setLiked(false);
			}
		}
	};

	return (
		<>
			<div className="flex items-center">
				<div
					className={`w-1/2 h-2 rounded-l-lg bg-green-500`}
					style={{ width: `${(Likes / (Likes + Dislikes)) * 100}%` }}></div>
				<div
					className={`w-1/2 h-2 rounded-r-lg bg-red-500`}
					style={{ width: `${(Dislikes / (Likes + Dislikes)) * 100}%` }}></div>
			</div>

			<div className="flex justify-between my-4">
				<button
					onClick={handleLikeClick}
					className={`btn ${
						liked ? "text-green-500" : "text-gray-500"
					} flex gap-2`}>
					{liked ? <AiFillLike size={24} /> : <AiOutlineLike size={24} />} (
					{Likes})
				</button>
				<button
					onClick={handleDislikeClick}
					className={`btn ${
						disliked ? "text-red-500" : "text-gray-500"
					} flex gap-2`}>
					{disliked ? (
						<AiFillDislike size={24} />
					) : (
						<AiOutlineDislike size={24} />
					)}
					({Dislikes})
				</button>
			</div>
		</>
	);
};

export default PopularityGauge;
