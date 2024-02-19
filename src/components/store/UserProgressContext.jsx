import { createContext, useState } from "react";

const UserProgressContext = createContext({
  userProgress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgressState, setUserProgressState] = useState("");
  function showCart() {
    setUserProgressState("Cart");
  }
  function hideCart() {
    setUserProgressState("");
  }
  function showCheckout() {
    setUserProgressState("Checkout");
  }
  function hideCheckout() {
    setUserProgressState("");
  }
  const userProgressCtxt = {
    userProgress: userProgressState,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return (
    <UserProgressContext.Provider value={userProgressCtxt}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
