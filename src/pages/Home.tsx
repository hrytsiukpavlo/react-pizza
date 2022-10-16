import React, { useCallback, useEffect, useRef } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	FilterSliceState,
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
	const sortType = sort.sortProperty;
	const { items, status } = useSelector(selectPizzaData);

	const onChangeCategory = useCallback((idx: number) => {
		dispatch(setCategoryId(idx));
	}, []);

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
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
				currentPage: String(currentPage),
			}),
		);
	};

	// useEffect(() => {
	// 	if (isMounted.current) {
	// 		const queryString = qs.stringify({
	// 			sortProperty: sort.sortProperty,
	// 			categoryId,
	// 			currentPage,
	// 		});

	// 		navigate(`?${queryString}`);
	// 	}
	// 	isMounted.current = true;
	// }, [categoryId, sortType, currentPage]);

	// useEffect(() => {
	// 	if (window.location.search) {
	// 		const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
	// 		const sort = list.find((obj) => obj.sortProperty === params.sortBy);
	// 		dispatch(
	// 			setFilters({
	// 				searchValue: params.search,
	// 				categoryId: Number(params.category),
	// 				currentPage: Number(params.currentPage),
	// 				sort: sort || list[0],
	// 			}),
	// 		);
	// 		isSearch.current = true;
	// 	}
	// }, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, sortType, searchValue, currentPage]);

	const pizzas = items
		.filter((obj: any) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
		.map((obj: any) => {
			return <PizzaBlock key={obj.id} {...obj} />;
		});

	const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort value={sort} />
			</div>
			<h2 className="content__title">All pizzas</h2>
			{status === "error" ? (
				<div className="content__error-info">
					<h2>
						Error occurred <span>😕</span>
					</h2>
					<p>Unable to get pizzas</p>
				</div>
			) : (
				<div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
