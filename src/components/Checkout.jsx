import { useContext } from "react";
import CartContext from "./store/CartContext";
import { currencyFormatter } from "../formatter";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
import Modal from "./UI/Modal";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const cartCtxt = useContext(CartContext);
  const userProgressCtxt = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    ClearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);
  function handleCloseCheckout() {
    userProgressCtxt.hideCheckout();
  }
  function handleFinish() {
    userProgressCtxt.hideCheckout();
    cartCtxt.clearCart();
    ClearData();
  }
  const totalPrice = cartCtxt.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtxt.items,
          customer: customerData,
        },
      }),
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending Data</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtxt.userProgress === "Checkout"}
        onClose={handleCloseCheckout}
      >
        <h2>Success!</h2>
        <p>Your order has been placed successfully</p>
        <p>Please check your updets on your e-Mail</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtxt.userProgress === "Checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="emai" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && (
          <Error title="An error occured please try again" message={error} />
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
