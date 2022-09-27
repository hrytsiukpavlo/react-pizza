import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus", async (params) => {
	const { order, sortBy, category, search, currentPage } = params;
	const { data } = await axios.get(
		`https://6321da1dfd698dfa2900d447.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
	);
	return data;
});

const initialState = {
	items: [],
	status: "loading",
};

const pizzaSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			console.log("Sending request");
			state.status = "loading";
			state.items = [];
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = "success";
		},
		[fetchPizzas.rejected]: (state, action) => {
			console.log("Error while sending request");
			state.status = "error";
			state.items = [];
		},
	},
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
