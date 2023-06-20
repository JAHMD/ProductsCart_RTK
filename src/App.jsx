import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { calcTotals, getCartItems } from "./store/features/cart/cartSlice";

function App() {
	const { cartItems, isLoading } = useSelector((state) => state.cart);
	const { isOpen } = useSelector((state) => state.modal);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(calcTotals());
	}, [dispatch, cartItems]);

	useEffect(() => {
		dispatch(getCartItems());
	}, [dispatch]);

	if (isLoading) {
		return (
			<div className="loading">
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<main>
			{isOpen ? <Modal /> : null}
			<Navbar />
			<CartContainer />
		</main>
	);
}

export default App;
