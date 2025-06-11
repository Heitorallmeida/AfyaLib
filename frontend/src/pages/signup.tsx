"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import Header from "@/app/components/header/header";

export default function Home() {
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [matricula, setMatricula] = React.useState("");
  const [curso, setCurso] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await fetch(
        "http://localhost:3000/alunos/registro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome, email, senha, matricula, curso }),
        }
      );
      if (!userCredential.ok) {
        throw new Error("Failed to sign up");
      }
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
          Sign Up
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
        <TextField
          label="Nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Matricula"
          type="text"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Curso"
          type="text"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => router.push("/")}
        >
          Go back to Login
        </Button>
      </Box>
    </Container>
  );
}
