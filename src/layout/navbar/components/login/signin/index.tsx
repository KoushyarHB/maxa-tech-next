import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useForm } from "react-hook-form";
import {
  setAccessCookie,
  setIdCookie,
  setRoleCookie,
} from "@/layout/navbar/services";
import { useSignInUser } from "@/layout/navbar/hooks";
import { toast } from "react-toastify";

type Props = {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
};

export default function SignIn({ setIsSignIn, onClose }: Props) {
  const { mutate, error } = useSignInUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData: any) => {
    mutate(formData, {
      onSuccess: (response) => {
        setIdCookie(response.id);
        setAccessCookie(true);
        setRoleCookie(response.role);
        onClose();
        toast.success(`Hi ${response.userName}, welcome to MAXA Tech`);
      },
      onError: (error) => {
        console.error("Sign-up failed:", error.message);
        toast.error("The username or password is incorrect");
      },
    });
  };

  return (
    <>
      <Typography
        component="h1"
        sx={{
          fontSize: "32px",
          fontWeight: 500,
          marginTop: "42px",
          marginBottom: "24px",
        }}
      >
        Log in to Maxa Tech
      </Typography>
      {error && (
        <Box
          sx={{
            mb: "28px",
            color: "#d32f2f",
            maxWidth: "300px",
            textAlign: "center",
          }}
        >
          {error.message}
        </Box>
      )}
      <Box
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "440px" }}
        component="form"
        noValidate
      >
        <TextField
          margin="none"
          sx={{ marginBottom: "16px" }}
          required
          fullWidth
          id="email"
          label="Email Address"
          {...register("email", {
            required: "Please Enter Your Email.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email ? String(errors.email.message) : ""}
          autoComplete="email"
          autoFocus
        />

        <TextField
          margin="none"
          sx={{ marginBottom: "12px" }}
          required
          fullWidth
          id="password"
          label="Password"
          {...register("password", {
            required: "Please Enter Your Password.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters.",
            },
          })}
          error={!!errors.password}
          helperText={errors.password ? String(errors.password.message) : ""}
          type="password"
          autoComplete="current-password"
        />
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box sx={{ color: "#0C68F4", mr: "24px" }}>Forgot password?</Box>
          </Box>
          <FormControlLabel
            sx={{ color: "#717171" }}
            control={<Checkbox {...register("remember")} color="primary" />}
            label="Keep me logged in"
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: "0px",
            mb: "24px",
            height: "48px",
            borderRadius: "8px",
            backgroundColor: "#0C68F4",
            fontSize: "16px",
            fontWeight: "400",
            textTransform: "none",
          }}
        >
          Log In
        </Button>
        <Grid container spacing={0} alignItems="center" marginBottom="24px">
          <Grid item xs={4}>
            <Divider />
          </Grid>
          <Grid item xs={4}>
            <Box component="p" sx={{ textAlign: "center", color: "#2D2D2D" }}>
              {`Or Log In with`}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Divider />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="space-between">
          <Button
            sx={{
              width: "208px",
              height: "48px",
              color: "#0C68F4",
              border: "solid #0C68F4 2px",
              borderRadius: "8px",
            }}
            startIcon={<GoogleIcon />}
          >
            Google
          </Button>
          <Button
            sx={{
              width: "208px",
              height: "48px",
              color: "#0C68F4",
              border: "solid #0C68F4 2px",
              borderRadius: "8px",
            }}
            startIcon={<FacebookIcon />}
          >
            Facebook
          </Button>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "48px",
            mt: "16px",
            mb: "24px",
          }}
        >
          <Box component="p" sx={{ color: "#717171", mr: "16px" }}>
            Don&apos;t have an account?
          </Box>
          <Box
            onClick={() => {
              setIsSignIn((is) => !is);
            }}
            sx={{ color: "#0C68F4" }}
          >
            Sign Up
          </Box>
        </Box>
      </Box>
    </>
  );
}
