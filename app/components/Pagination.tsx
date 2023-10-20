import React from "react";

// Define props interface for Pagination
interface PaginationProps {
	currentPage: number;
	totalPage: number;
	onPageChange: (pageNumber: number) => void;
}

// Pagination component
const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPage,
	onPageChange,
}) => {
	// Generate an array of page numbers from 1 to totalPage
	const pageNumbers = Array.from(
		{ length: totalPage },
		(_, index) => index + 1
	);

	return (
		<div className="flex justify-center mt-5">
			<ul className="inline-flex -space-x-px text-sm">
				{/* Previous page button */}
				<li>
					<button
						className="flex items-center justify-center w-20 px-3 h-10 text-[15px] ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover-text-gray-700 dark:bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white"
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}>
						Previous
					</button>
				</li>
				{/* Render page number buttons */}
				{pageNumbers.map((number) => (
					<li key={number}>
						<a
							href="#"
							className={`flex items-center justify-center px-3 h-10 text-[15px] leading-tight text-gray-500 bg-white border border-gray-300 ${
								number === currentPage
									? "bg-primary-light text-white"
									: "hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white"
							}`}
							onClick={() => onPageChange(number)}>
							{number}
						</a>
					</li>
				))}
				{/* Next page button */}
				<li>
					<button
						className="flex items-center justify-center w-20 px-3 h-10 text-[15px] leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white"
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPage}>
						Next
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
