import { RouterProvider, createBrowserRouter } from "react-router";
import { CartProvider } from "./cart";
import Layout from "./Layout";
import Home from "./pages/Home";
import Cabinet from "./pages/Cabinet";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "cabinet", Component: Cabinet },
      { path: "catalog", Component: Catalog },
      { path: "product/:id", Component: Product },
      { path: "cart", Component: Cart },
      { path: "about", Component: About },
      { path: "*", Component: Home },
    ],
  },
]);

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
