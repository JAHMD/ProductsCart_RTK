import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/features/cart/cartSlice";
import { toggleModal } from "../store/features/modal/modalSlice";

const Modal = () => {
	const dispatch = useDispatch();

	return createPortal(
		<aside className="modal-container">
			<div className="modal">
				<h4>remove all items from your shopping cart?</h4>
				<div className="btn-container">
					<button
						className="btn confirm-btn"
						onClick={() => {
							dispatch(clearCart());
							dispatch(toggleModal());
						}}
					>
						Confirm
					</button>
					<button
						className="btn clear-btn"
						onClick={() => dispatch(toggleModal())}
					>
						Cancel
					</button>
				</div>
			</div>
		</aside>,
		document.body
	);
};

export default Modal;
