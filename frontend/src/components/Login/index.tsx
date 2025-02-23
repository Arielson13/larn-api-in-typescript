import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  AppBar,
  Toolbar,
} from "@mui/material";

const LoginComponent: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSubmit = () => {
    if (isRegistering) {
      if (!name || !email || !password || !confirmPassword) {
        setError("Por favor, preencha todos os campos.");
        return;
      }
      if (password !== confirmPassword) {
        setError("As senhas não coincidem.");
        return;
      }
      setError("");
      console.log(
        "Cadastro - Nome:",
        name,
        "Email:",
        email,
        "Senha:",
        password
      );
    } else {
      if (!email || !password) {
        setError("Por favor, preencha todos os campos.");
        return;
      }
      setError("");
      console.log(
        "Login - Email:",
        email,
        "Senha:",
        password,
        "Lembrar-me:",
        rememberMe
      );
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      {isMobile && (
        <AppBar position="fixed" sx={{ bgcolor: "#1976d2" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              Sitemark
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <Card
        sx={{
          width: isMobile ? "100%" : 400,
          height: isMobile ? "100vh" : "auto",
          padding: 4,
          borderRadius: isMobile ? 0 : 2,
          boxShadow: isMobile ? 0 : 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardContent>
          {!isMobile && (
            <Box textAlign="center" mb={2}>
              <Typography variant="h5" fontWeight="bold">
                Sitemark
              </Typography>
            </Box>
          )}
          <Typography variant="h6" gutterBottom align="center">
            {isRegistering ? "Cadastrar" : "Entrar"}
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {isRegistering && (
            <TextField
              label="Nome"
              placeholder="Seu nome"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <TextField
            label="E-mail"
            placeholder="Seu e-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Senha"
            placeholder="••••••••"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegistering && (
            <TextField
              label="Confirme sua Senha"
              placeholder="••••••••"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          {!isRegistering && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Lembre de mim"
              sx={{ mt: 1 }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5, fontSize: isMobile ? "1.1rem" : "1rem" }}
            onClick={handleSubmit}
          >
            {isRegistering ? "Cadastrar" : "Entrar"}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            {isRegistering ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
            <a
              href="#"
              onClick={() => setIsRegistering(!isRegistering)}
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              {isRegistering ? "Entrar" : "Cadastrar"}
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginComponent;
