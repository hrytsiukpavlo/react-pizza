import React, { useEffect, useContext, useRef } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

export default function Home() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
	const sortType = sort.sortProperty;
	const { items, status } = useSelector((state) => state.pizza);

	const { searchValue } = useContext(SearchContext);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	const getPizzas = async () => {
		const order = sortType.includes("-") ? "asc" : "desc";
		const sortBy = sortType.replace("-", "");
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const search = searchValue ? `&search=${searchValue}` : "";

		dispatch(
			fetchPizzas({
				order,
				sortBy,
				category,
				search,
				currentPage,
			}),
		);
	};

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, sortType, currentPage]);

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

			dispatch(setFilters({ ...params, sort }));
			isSearch.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, sortType, searchValue, currentPage]);

	const pizzas = items
		.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
		.map((obj) => {
			return <PizzaBlock key={obj.id} {...obj} />;
		});

	const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className="content__title">All pizzas</h2>
			{status === "error" ? (
				<div className="content__error-info">
					<h2>
						Error occurred <icon>😕</icon>
					</h2>
					<p>Unable to get pizzas</p>
				</div>
			) : (
				<div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
}
