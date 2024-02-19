import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItems: () => {},
  removeItems: () => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );
    const updatedItems = [...state.items];
    if (existingItemIndex > -1) {
      const exisitingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...exisitingItem,
        quantity: exisitingItem.quantity + 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id,
    );
    const exisitingItem = state.items[existingItemIndex];
    const updatedItems = [...state.items];
    if (exisitingItem.quantity === 1) {
      updatedItems.slice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...exisitingItem,
        quantity: exisitingItem.quantity - 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
}
export function CartContextProvider({ children }) {
  const [cartState, dispatchCart] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCart({
      type: "ADD_ITEM",
      item,
    });
  }
  function remItem(id) {
    dispatchCart({
      type: "REMOVE_ITEM",
      id,
    });
  }
  function clearCart() {
    dispatchCart({
      type: "CLEAR_CART",
    });
  }
  const cartContext = {
    items: cartState.items,
    addItems: addItem,
    removeItems: remItem,
    clearCart: clearCart,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
export default CartContext;
