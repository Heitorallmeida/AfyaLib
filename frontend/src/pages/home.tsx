"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { List, ListItem, ListItemText, TextField } from "@mui/material";
import Header from "@/app/components/header/header";

export default function Home() {
  const [livros, setLivros] = React.useState<any[]>([]);
  const [userId, setUserId] = React.useState<string | null>(null);
  const router = useRouter();

  const fetchData = React.useCallback(async () => {
    const response = await fetch("http://localhost:3000/livros");
    const json = await response.json();
    setLivros(json.filter((livro: any) => livro.status === "Disponivel"));
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (token !== "undefined" && token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.id_aluno);
    } else {
      window.alert("Você precisa estar logado para acessar esta página.");
      router.push("/");
    }
  }, [router]);

  const alugarLivro = async (id_livro: any) => {
    if (!userId) return;
    try {
      // const id_aluno =
      await fetch("http://localhost:3000/alugueis/alugar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_livro, id_aluno: userId }), // Assuming id_aluno is 1 for demo purposes
      });
      window.alert("Livro alugado com sucesso!");
      await fetchData();
    } catch (error: any) {
      window.alert(`Error: ${error.code} - ${error.message}`);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ justifyContent: "end", display: "flex", p: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            router.push("/books/1");
          }}
          sx={{ width: "200px" }}
        >
          Ver Meus livros
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, p: 2 }}>
        <List>
          {livros.length > 0 &&
            livros.map((livro) => (
              <ListItem
                key={livro.id_livro}
                alignItems="flex-start"
                sx={{ gap: 2 }}
              >
                <ListItemText primary={livro.titulo} secondary={livro.autor} />
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => {
                    alugarLivro(livro.id_livro);
                  }}
                  sx={{ width: "200px" }}
                >
                  Alugar livro
                </Button>
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
}
