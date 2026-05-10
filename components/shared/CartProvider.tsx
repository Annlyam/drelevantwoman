"use client";

import { CartProvider as ReactUseCartProvider } from "react-use-cart";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactUseCartProvider>{children}</ReactUseCartProvider>;
}
