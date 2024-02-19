import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "./store/CartContext";
import UserProgressContext from "./store/UserProgressContext";
export default function Header() {
  const cartCtxt = useContext(CartContext);
  const userProgressCtxt = useContext(UserProgressContext);
  function handleShowCart() {
    userProgressCtxt.showCart();
  }
  const totalCartItems = cartCtxt.items.reduce((totalNumberofItems, item) => {
    return totalNumberofItems + item.quantity;
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly={true} onClick={handleShowCart}>
          Cart({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
