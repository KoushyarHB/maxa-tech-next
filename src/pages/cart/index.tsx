import Cart from "@/components/cart/Cart";
import { NextPageWithLayout } from "../_app";
import Layout from "@/layout";

const CartPage: NextPageWithLayout = () => {
  return <Cart />;
};

CartPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default CartPage;
