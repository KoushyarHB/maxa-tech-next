import ContactUs from "@/components/contact-us/components";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/layout/mainLayout";

const ContactUsPage: NextPageWithLayout = () => {
  return <ContactUs />;
};

ContactUsPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default ContactUsPage;
