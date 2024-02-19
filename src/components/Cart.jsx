import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "./store/CartContext";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
import { currencyFormatter } from "../formatter";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtxt = useContext(CartContext);
  const userProgressCtxt = useContext(UserProgressContext);

  const totalPrice = cartCtxt.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  function handleCloseCart() {
    userProgressCtxt.hideCart();
  }

  function handleGotoCheckout() {
    userProgressCtxt.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={userProgressCtxt.userProgress === "Cart"}
      onClose={
        userProgressCtxt.userProgress === "Cart" ? handleCloseCart : null
      }
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtxt.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => cartCtxt.addItems(item)}
            onDecrease={() => cartCtxt.removeItems(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button onClick={handleGotoCheckout}>Go to Cart</Button>
      </p>
    </Modal>
  );
}
