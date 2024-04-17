import { Grid, Typography, TextField, Link, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";

const formData = {
  email: "nicolas@gmail.com",
  password: "123456",
  displayName: "Nicolas Gambolati",
};

export const RegisterPage = () => {
  const formValidations = {
    email: [(value) => value.includes("@"), "El correo debe tener un @."],
    password: [
      (value) => value.length >= 6,
      "El password debe tener mas de 6 caracteres.",
    ],
    displayName: [(value) => value.length >= 1, "El nombre es obligatorio."],
  };

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  console.log(displayNameValid);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Full Name"
              type="text"
              placeholder="Your name"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!displayNameValid}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Create account
              </Button>
            </Grid>
          </Grid>

          <Grid container direction={"row"} justifyContent="end" sx={{ mt: 2 }}>
            <Typography sx={{ mr: 1 }}>Do you have an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
