"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import Header from "@/app/components/header/header";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/alunos/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });
      const userCredential = await response.json();
      localStorage.setItem("token", userCredential.token);
      router.push("/home");
    } catch (error: any) {
      window.alert(`Error: ${error.code} - ${error.message}`);
    }
  };

  return (
    <Container maxWidth="xs">
      <Header />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
