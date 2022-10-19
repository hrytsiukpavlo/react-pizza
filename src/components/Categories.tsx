import React, { memo } from "react";

type CategoriesProps = {
	value: number;
	onChangeCategory: (idx: number) => void;
};

const categories = ["All", "Meat", "Vegeterian", "Grill", "Hot", "New"];

const Categories: React.FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
	return (
		<div className="categories">
			<ul>
				{categories.map((categoryName, index) => {
					return (
						<li
							key={index}
							onClick={() => onChangeCategory(index)}
							className={value === index ? "active" : ""}
						>
							{categoryName}
						</li>
					);
				})}
			</ul>
		</div>
	);
});

export default Categories;
