import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>({ imageUrl: "", title: "", price: 0 });
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get("https://6321da1dfd698dfa2900d447.mockapi.io/items/" + id);
				setPizza(data);
			} catch (error) {
				alert("Error while getting pizza");
				navigate("/");
			}
		}

		fetchPizza();
	}, [id, navigate]);

	if (!pizza) {
		return <>"Loading..."</>;
	}

	return (
		<div className="container fullPizza">
			<img src={pizza.imageUrl} alt="pizza" />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price}$</h4>
			<Link to="/react-pizza">
				<button className="button button--outline button--add">
					<span>Back</span>
				</button>
			</Link>
		</div>
	);
};

export default FullPizza;
