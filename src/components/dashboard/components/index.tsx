import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TableProducts from "./tableProducts";
import AddProducts from "./addProducts";
import ChangeProducts from "./changeProducts";
import { Box, Breadcrumbs, Link, Stack } from "@mui/material";
import QuantityTab from "./quantity/quantity";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const breadcrumbs = [
    <Link
      sx={{ fontSize: "18px" }}
      underline="hover"
      key="1"
      color="inherit"
      href="/"
    >
      Home
    </Link>,
    <Link
      sx={{ fontSize: "18px" }}
      underline="hover"
      key="2"
      color="text.primary"
      href="/dashboard"
    >
      Dashboard
    </Link>,
  ];
  return (
    <Box sx={{ width: "100%", height: "62vh", mb: "170px" }}>
      <Stack sx={{ mb: "48px" }} spacing={2} p={2}>
        <Breadcrumbs
          separator={
            <NavigateNextIcon fontSize="large" sx={{ color: "#717171" }} />
          }
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Products" {...a11yProps(0)} />
          <Tab label="quantity" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TableProducts />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <QuantityTab />
      </CustomTabPanel>
    </Box>
  );
}
