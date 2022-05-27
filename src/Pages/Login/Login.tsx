import { useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
} from "@mui/material";
import {
  Form,
  required,
  TextInput,
  useTranslate,
  useLogin,
  useNotify,
  useCreate,
} from "react-admin";
import Box from "@mui/material/Box";
import Logo from "../../Asserts/vincall.svg";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const translate = useTranslate();

  const notify = useNotify();
  const login = useLogin();
  const location = useLocation();

  const handleSubmit = (auth: FormValues) => {
    setLoading(true);
    login(
      auth,
      location.state ? (location.state as any).nextPathname : "/"
    ).catch((error: Error) => {
      setLoading(false);
      notify(
        typeof error === "string"
          ? error
          : typeof error === "undefined" || !error.message
          ? "ra.auth.sign_in_error"
          : error.message,
        {
          type: "warning",
          messageArgs: {
            _:
              typeof error === "string"
                ? error
                : error && error.message
                ? error.message
                : undefined,
          },
        }
      );
    });
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Card
          sx={{ minWidth: 452, marginTop: "10em", padding: "16px 24px 24px" }}
        >
          <Box
            sx={{
              margin: "1em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              src={Logo}
              component="img"
              alt="Vin Call"
              sx={{ marginRight: "1em", height: 30 }}
            />
          </Box>
          <Box
            sx={{
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              color: (theme) => theme.palette.grey[500],
            }}
          ></Box>
          <Box sx={{ padding: "0 1em 1em 1em" }}>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                autoFocus
                source="username"
                label={translate("Account")}
                disabled={loading}
                validate={required()}
                fullWidth
              />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                source="password"
                label={translate("ra.auth.password")}
                type="password"
                disabled={loading}
                validate={required()}
                fullWidth
              />
            </Box>
          </Box>
          <CardActions sx={{ padding: "0 1em 1em 1em" }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading && <CircularProgress size={25} thickness={2} />}
              {translate("ra.auth.sign_in")}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Form>
  );
};

interface FormValues {
  username?: string;
  password?: string;
}
