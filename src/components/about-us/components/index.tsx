import { Box, Breadcrumbs, Link, Typography, Stack } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import aboutUs from "@/assets/images/about-us-images/aboutus.png";
import {
  aboutUsDesc,
  aboutUsChoose,
  aboutUsCategories,
  teamMembers,
} from "@/constants/aboutUs";
import BreadCrumbs from "@/components/shared/bread-crumbs";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function AboutUs() {
  return (
    <Box>
      <BreadCrumbs
        array={[
          ["Home", "/"],
          ["About Us", "/about-us"],
        ]}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="div" sx={{ width: "80%", mx: "auto" }}>
          <Image src={aboutUs} alt="About Us" layout="responsive" />
        </Box>
        <Box sx={{ mt: 4, width: "80%", mx: "auto" }}>
          {aboutUsDesc?.map((item) => (
            <Box key={item.id} sx={{ mb: 2, textAlign: "justify" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "20px", mb: 1 }}>
                {item.title}
              </Typography>
              <Typography>{item.desc}</Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            my: 1,
            display: "flex",
            flexDirection: "column",
            width: "80%",
            mb: 2,
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "20px", mb: 2 }}>
            Product Categories :
          </Typography>
          {aboutUsCategories?.map((item, index) => (
            <>
              <Typography sx={{ mb: "5px" }}>
                <b>
                  {index + 1} - {item.title}
                </b>{" "}
                {item.desc}
              </Typography>
            </>
          ))}
        </Box>
        <Box
          sx={{
            my: 1,
            display: "flex",
            flexDirection: "column",
            width: "80%",
            mb: 2,
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "20px", mb: 2 }}>
            Why Choose Us?
          </Typography>
          {aboutUsChoose?.map((item) => (
            <>
              <Typography sx={{ mb: "5px" }}>
                <b>{item.title}</b> {item.desc}
              </Typography>
            </>
          ))}
        </Box>
        <Box sx={{ width: "80%", mx: "auto", mb: 5 }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px", mb: 2 }}>
            Team Members
          </Typography>
          {teamMembers?.map((item, index) => (
            <Accordion key={item.id} sx={{ my: 1, width: "100%", mx: "auto" }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  {index + 1} : {item.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "self-start",
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "18px", pl: 4 }}
                  >
                    FirstNme : {item.Name}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "18px", pl: 4 }}
                  >
                    LastName : {item.Surname}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "18px", pl: 4 }}
                  >
                    Birthplace : {item.Birthplace}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "18px", pl: 4 }}
                  >
                    Residence : {item.Residence}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "18px", pl: 4 }}
                  >
                    Education : {item.Education}
                  </Typography>
                </Box>
                <Box
                  component="img"
                  src={item.img.src}
                  sx={{
                    width: "20%",
                    borderRadius: "100%",
                    border: "solid gray 1px",
                    p: 1,
                  }}
                ></Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default AboutUs;
