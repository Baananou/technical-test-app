import React from "react";

interface PerPageSelectorProps {
	itemsPerPage: number;
	setItemsPerPage: (value: number) => void;
	totalItems: number | null;
}

const PerPageSelector: React.FC<PerPageSelectorProps> = ({
	itemsPerPage,
	setItemsPerPage,
	totalItems,
}) => {
	return (
		<div className="flex flex-row xl:flex-col items-center justify-center">
			<select
				className="rounded-lg p-2 border border-gray-300"
				title="per page"
				value={itemsPerPage}
				onChange={(e) => setItemsPerPage(Number(e.target.value))}>
				<option value={Number(totalItems)}>All</option>
				<option value={4}>4 per page</option>
				<option value={8}>8 per page</option>
				<option value={12}>12 per page</option>
			</select>
		</div>
	);
};

export default PerPageSelector;
