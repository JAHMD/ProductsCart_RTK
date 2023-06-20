import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk("cart/", async () => {
	try {
		const res = await fetch(url);
		const data = await res.json();
		return data;
	} catch (err) {
		console.log(err);
	}
});

const initialState = {
	cartItems: [],
	amount: 0,
	total: 0,
	isLoading: true,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		clearCart: (state) => {
			state.cartItems = [];
			state.amount = 0;
		},
		removeItem: (state, action) => {
			const itemId = action.payload;
			const updatedItems = state.cartItems.filter((item) => item.id !== itemId);
			state.cartItems = updatedItems;
		},
		increaseAmount: (state, action) => {
			const itemId = action.payload;
			const cartItem = state.cartItems.find((item) => item.id === itemId);
			cartItem.amount += 1;
		},
		decreaseAmount: (state, action) => {
			const itemId = action.payload;
			const cartItem = state.cartItems.find((item) => item.id === itemId);
			cartItem.amount -= 1;
		},
		calcTotals: (state) => {
			let amount = 0;
			let total = 0;
			state.cartItems.forEach((item) => {
				amount += item.amount;
				total += item.amount * item.price;
			});
			state.amount = amount;
			state.total = total;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCartItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCartItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cartItems = action.payload;
			})
			.addCase(getCartItems.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export const {
	clearCart,
	increaseAmount,
	decreaseAmount,
	removeItem,
	calcTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
