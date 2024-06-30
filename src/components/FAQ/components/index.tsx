import FAQImage from "@/assets/images/FAQ.svg";
import BreadCrumbs from "@/components/shared/bread-crumbs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function FAQ() {
  const [expandedPanels, setExpandedPanels] = useState<{
    [key: string]: boolean;
  }>({
    panel1: false,
    panel2: false,
    panel3: false,
    panel4: false,
    panel5: false,
  });

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPanels((prev) => ({ ...prev, [panel]: isExpanded }));
    };

  return (
    <Box marginBottom={6}>
      <BreadCrumbs
        array={[
          ["Home", "/"],
          ["FAQ", "/faq"],
        ]}
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box component="img" src={FAQImage.src} paddingY={5} />
        <Box display="flex" gap={5}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography fontSize="20px">Table of Contents</Typography>
            <Typography fontSize="1rem" fontWeight="lighter" color="primary">
              General
            </Typography>
            <Typography fontSize="1rem" fontWeight="lighter">
              Trusts & Safety
            </Typography>
            <Typography fontSize="1rem" fontWeight="lighter">
              Services
            </Typography>
            <Typography fontSize="1rem" fontWeight="lighter">
              Billing
            </Typography>
          </Box>
          <Box width="808px">
            {["panel1", "panel2", "panel3", "panel4", "panel5"].map((panel) => (
              <Accordion
                key={panel}
                expanded={expandedPanels[panel]}
                onChange={handleChange(panel)}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        color: expandedPanels[panel] ? "primary.main" : "black",
                      }}
                    />
                  }
                  aria-controls={`${panel}-content`}
                  id={`${panel}-header`}
                  sx={{
                    color: expandedPanels[panel] ? "primary.main" : "black",
                  }}
                >
                  <Typography fontSize="1.5rem" fontWeight="medium">
                    {panel === "panel1" &&
                      "Can I purchase products from MAXA Tech using installment payments?"}
                    {panel === "panel2" &&
                      "How can I engage with the magazine content on MAXA Tech?"}
                    {panel === "panel3" &&
                      "Does MAXA Tech offer a warranty on its products?"}
                    {panel === "panel4" &&
                      "Is MAXA Tech a secure platform for online shopping?"}
                    {panel === "panel5" &&
                      "How can I get assistance with my purchase or any other inquiries?"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography fontSize="1.25rem" fontWeight="light">
                    {panel === "panel1" &&
                      "Yes, MAXA Tech offers the option to purchase products using both cash and installment payments. This allows you to choose the payment method that suits your needs and budget."}
                    {panel === "panel2" &&
                      "You can actively engage with the magazine content by leaving comments and participating in the question-and-answer section. Feel free to share your thoughts, ask questions, and interact with fellow tech enthusiasts in the community."}
                    {panel === "panel3" &&
                      "Yes, MAXA Tech provides a warranty on all eligible products. The specific warranty details may vary depending on the manufacturer and product category. Please refer to the product description or contact our customer support for more information."}
                    {panel === "panel4" &&
                      "Yes, MAXA Tech provides a warranty on all eligible products. The specific warranty details may vary depending on the manufacturer and product category. Please refer to the product description or contact our customer support for more information."}
                    {panel === "panel5" &&
                      "If you need assistance with your purchase or have any questions, our dedicated customer support team is here to help. You can reach out to us through the contact page on our website, and we'll be happy to assist you promptly."}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
