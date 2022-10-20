import "./scss/app.scss";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
const Cart = lazy(() => import("./pages/Cart"));
const FullPizza = lazy(() => import("./pages/FullPizza"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
	return (
		<Routes>
			<Route path="/react-pizza" element={<MainLayout />}>
				<Route path="" element={<Home />} />
				<Route
					path="/react-pizza/cart"
					element={
						<Suspense fallback={<div>Cart is loading...</div>}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					path="/react-pizza/pizza/:id"
					element={
						<Suspense fallback={<div>Pizza is loading...</div>}>
							<FullPizza />
						</Suspense>
					}
				/>
				<Route
					path="*"
					element={
						<Suspense fallback={<div>Loading...</div>}>
							<NotFound />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
