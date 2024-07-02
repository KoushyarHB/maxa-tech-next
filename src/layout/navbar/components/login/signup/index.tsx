import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useForm } from "react-hook-form";
import {
  setAccessCookie,
  setIdCookie,
  setRoleCookie,
} from "@/layout/navbar/services";
import { useSignUpNewUser } from "@/layout/navbar/hooks";

type Props = {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
};

export default function SignUp({ setIsSignIn, onClose }: Props) {
  const { mutate, error } = useSignUpNewUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData: any) => {
    const universalId = Date.now();
    const userData = {
      id: universalId,
      userName: formData.name,
      email: formData.email,
      password: formData.password,
      address: "",
      postalCode: "",
      phoneNumber: "",
      role: "normal",
    };
    const cartData = {
      id: universalId,
      cartProducts: [],
    };
    const wishlistData = {
      id: universalId,
      wishlistProducts: [],
    };
    const orderData = {
      id: universalId,
      ordersHistory: [],
    };
    mutate(
      { newUserData: userData, cartData, wishlistData, orderData },
      {
        onSuccess: () => {
          setIdCookie(userData.id);
          setAccessCookie(true);
          setRoleCookie(userData.role);
          onClose();
        },
        onError: (error) => {
          console.error("Sign-up failed:", error.message);
        },
      }
    );
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
        Create your account
      </Typography>
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
          id="username"
          label="Full Name"
          {...register("name", {
            required: "Please Enter Your Name.",
          })}
          error={!!errors.name}
          helperText={errors.name ? String(errors.name.message) : ""}
          autoComplete="username"
          autoFocus
        />

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
          error={!!errors.email || !!error}
          helperText={
            errors.email
              ? String(errors.email.message)
              : error
              ? error.message
              : ""
          }
          autoComplete="email"
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
        <FormControl
          required
          error={!!errors.agreedToTerms}
          sx={{ mb: "20px" }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...register("agreedToTerms", {
                  required: "You must agree to the terms",
                })}
                color="primary"
              />
            }
            label={
              <Typography
                component="span"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box component="span">I agree to all</Box>
                <Link
                  style={{
                    fontWeight: 500,
                    color: "#0C68F4",
                    textDecoration: "underline",
                  }}
                  href="/terms-and-conditions"
                >
                  Terms & Conditions
                </Link>
              </Typography>
            }
          />
          {errors.agreedToTerms && (
            <FormHelperText>
              {String(errors.agreedToTerms.message)}
            </FormHelperText>
          )}
        </FormControl>
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
          Create Account
        </Button>
        <Grid container spacing={0} alignItems="center" marginBottom="24px">
          <Grid item xs={4}>
            <Divider />
          </Grid>
          <Grid item xs={4}>
            <Box component="p" sx={{ textAlign: "center", color: "#2D2D2D" }}>
              {`Or Sign Up with`}
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
            Log In
          </Box>
        </Box>
      </Box>
    </>
  );
}
