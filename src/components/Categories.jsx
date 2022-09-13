import React, { useState } from "react";

export default function Categories() {
	const [activeIndex, setActiveIndex] = useState(0);

	const categories = ["All", "Meat", "Vegeterian", "Grill", "Hot", "Closed"];

	return (
		<div className="categories">
			<ul>
				{categories.map((value, index) => {
					return (
						<li
							key={index}
							onClick={() => setActiveIndex(index)}
							className={activeIndex === index ? "active" : ""}
						>
							{value}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
