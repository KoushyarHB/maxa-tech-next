import { Box, Grid } from "@mui/material";
import React from "react";
import TabTitle from "../../tab-title";
import SingleNotification from "./single-notification/SingleNotification";
import direct from "@/assets/images/notifications-icons/direct.svg";
import truck from "@/assets/images/notifications-icons/truck.svg";
import sms from "@/assets/images/notifications-icons/sms.svg";
import story from "@/assets/images/notifications-icons/story.svg";

export default function Notifications() {
  return (
    <Box>
      <TabTitle
        firstTitle={"Notifications"}
        secondTitle={"Manage your notification settings"}
      />
      <Grid
        container
        spacing={0}
        sx={{
          maxWidth: "912px",
          margin: "0 auto",
        }}
      >
        <Grid item mb={"24px"}>
          <SingleNotification
            title="Email"
            src={direct.src}
            description="We write emails to let you know what's important, like: new order, confirmations "
          ></SingleNotification>
        </Grid>
        <Grid item mb={"24px"}>
          <SingleNotification
            title="Order Delivered"
            src={truck.src}
            description="You will be noticed once the order is delivered"
          ></SingleNotification>
        </Grid>
        <Grid item mb={"24px"}>
          <SingleNotification
            title="Push to your Device"
            src={sms.src}
            description="Receive notifications about your order status, promotions and other updates"
          ></SingleNotification>
        </Grid>
        <Grid item mb={"24px"}>
          <SingleNotification
            title="Product's availibilty"
            src={story.src}
            description="You will be noticed when product gets available"
          ></SingleNotification>
        </Grid>
      </Grid>
    </Box>
  );
}
