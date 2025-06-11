"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useRouter } from "next/router";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Header from "@/app/components/header/header";

export default function Home() {
  const [livros, setLivros] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const router = useRouter();
  const { userId } = router.query;

  const devolverLivro = async (id_livro: any) => {
    try {
      // const id_aluno =
      await fetch(`http://localhost:3000/alugueis/devolver/${id_livro}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.alert("Livro alugado com sucesso!");
      window.location.reload();
    } catch (error: any) {
      window.alert(`Error: ${error.code} - ${error.message}`);
    }
  };

  const fetchData = React.useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    await fetch(`http://localhost:3000/alunos/livros/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const json = await response.json();
        if (json.length > 0) {
          setLivros(json);
        }
      })
      .catch((error) => {
        console.error("Error fetching livros:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, p: 2 }}>
        {loading && <CircularProgress />}
        {livros.length === 0 && !loading && (
          <Typography variant="h6" align="center">
            Você não possui livros alugados no momento.
          </Typography>
        )}
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
                  color="warning"
                  fullWidth
                  onClick={() => {
                    devolverLivro(livro.id_livro);
                  }}
                  sx={{ width: "200px" }}
                >
                  Devolver livro
                </Button>
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
}
