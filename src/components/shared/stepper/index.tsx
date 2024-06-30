import {
  Stack,
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Typography,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import Stepper from "@mui/material/Stepper";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#0C68F4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#0C68F4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#9E9E9E",
  zIndex: 1,
  color: "#fff",
  width: 48,
  height: 48,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "white",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    width: 72,
    height: 72,
    border: "3px solid #0C68F4",
    transform: "translateY(-15%)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#78ABF9",
  }),
}));

function ColorlibStepIcon(props: StepIconProps & { activeStepNumber: number }) {
  const { active, completed, className, icon, activeStepNumber } = props;
  const activeStepStyle = { color: "#0C68F4", fontSize: "48px" };
  const defaultStepStyle = { fontSize: "32px" };

  const icons: { [index: string]: React.ReactElement } = {
    1: (
      <LocalMallOutlinedIcon
        sx={activeStepNumber === 0 ? activeStepStyle : defaultStepStyle}
      />
    ),
    2: (
      <LocalShippingOutlinedIcon
        sx={activeStepNumber === 1 ? activeStepStyle : defaultStepStyle}
      />
    ),
    3: (
      <PaymentOutlinedIcon
        sx={activeStepNumber === 2 ? activeStepStyle : defaultStepStyle}
      />
    ),
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ["Cart", "Checkout", "Payment"];

export default function StepperComponent({
  activeStepNumber,
}: {
  activeStepNumber: number;
}) {
  return (
    <Stack sx={{ width: "50%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStepNumber}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={(props) => (
                <ColorlibStepIcon
                  {...props}
                  activeStepNumber={activeStepNumber}
                />
              )}
            >
              <Typography
                sx={{
                  color:
                    steps.findIndex((item) => item === label) <=
                    activeStepNumber
                      ? "#0C68F4"
                      : "#9E9E9E",
                  fontSize: label === steps[activeStepNumber] ? "16px" : "14px",
                  fontWeight: label === steps[activeStepNumber] ? "600" : "400",
                  mt: label === steps[activeStepNumber] ? -2 : -1,
                }}
              >
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
