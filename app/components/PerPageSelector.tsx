import React from "react";

// Define props interface for PerPageSelector
interface PerPageSelectorProps {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  totalItems: number | null;
}

// PerPageSelector component
const PerPageSelector: React.FC<PerPageSelectorProps> = ({
  itemsPerPage,
  setItemsPerPage,
  totalItems,
}) => {
  return (
		<div className="flex flex-row xl:flex-col items-center justify-center">
			{/* Dropdown for selecting items per page */}
			<select
				className="rounded-lg p-2 border border-gray-300"
				title="Items per page"
				value={itemsPerPage}
				onChange={(e) => setItemsPerPage(Number(e.target.value))}>
				{/* Option to display all items if totalItems is available */}
				<option value={totalItems || undefined}>All</option>
				{/* Options for different items per page */}
				<option value={4}>4 per page</option>
				<option value={8}>8 per page</option>
				<option value={12}>12 per page</option>
			</select>
		</div>
	);
};

export default PerPageSelector;
