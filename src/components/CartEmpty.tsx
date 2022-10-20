import cartEmptyImg from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";
import { FC } from "react";

const CartEmpty: FC = () => {
	return (
		<>
			<div className="cart cart--empty">
				<h2>
					Cart is empty <span>😕</span>
				</h2>
				<p>
					You probably haven't ordered pizza yet.
					<br />
					To order pizza, go to the main page.
				</p>
				<img src={cartEmptyImg} alt="Empty cart" />
				<Link to="/react-pizza" className="button button--black">
					<span>Go back</span>
				</Link>
			</div>
		</>
	);
};

export default CartEmpty;
