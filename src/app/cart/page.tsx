import { getCart } from "@/lib/db/cart";
import React from "react";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import FormatPrice from "@/lib/format";

export const metadata = {
  title: "Your Cart - Flomazon",
  description: "Make your wallet cry!",
};

export default async function Cartpage() {
  const cart = await getCart();

  return (
    <div>
      <h1 className="text-3xl font-bold">Shopping cart</h1>
      {cart?.items?.map((item) => (
        <CartEntry
          cartItem={item}
          setProdductQuantity={setProductQuantity}
          key={item.id}
        />
      ))}
      {!cart?.items?.length && <p className="mt-2">Your cart is empty</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {FormatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
}
