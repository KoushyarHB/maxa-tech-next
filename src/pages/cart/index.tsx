import Cart from "@/components/cart/components/Cart";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/layout/mainLayout";

const CartPage: NextPageWithLayout = () => {
  return <Cart />;
};

CartPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default CartPage;
