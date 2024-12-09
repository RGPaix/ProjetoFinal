import "./styles.css";
import React, { useState, useEffect } from "react";
import api from "./api";

import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { Box } from "@mui/system";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mostrarProdutos, setMostrarProdutos] = useState(false);
  const [produtosBuscados, setProdutosBuscados] = useState([]);

  useEffect(() => {
    api
      .get("/produtos")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos", error);
      });
  }, []);

  const adicionarProduto = (e) => {
    e.preventDefault();
    setError("");
    setMensagem("");

    const precoFormatado = parseFloat(preco);
    if (!nome.trim()) {
      setError("O nome do produto é obrigatório.");
      return;
    }
    if (preco < 0) {
      setError("O preço do produto deve ser maior que zero.");
      return;
    }

    api
      .post("/produtos", { nome, preco })
      .then((response) => {
        setProdutos([...produtos, response.data]);
        setNome("");
        setPreco("");
        setMensagem("Produto adicionado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao adicionar produto", error);
        setError("Erro ao adicionar o produto. Tente novamente.");
      });
  };

  const carregarProdutos = () => {
    setMostrarProdutos(true);
    setProdutosBuscados([]);
    setMensagem("");
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    setMostrarProdutos(false);
    const resultados = produtos.filter(
      (produto) =>
        produto.nome &&
        produto.nome.toLowerCase().includes(search.toLowerCase())
    );

    if (resultados.length === 0) {
      setMensagem("Nenhum produto encontrado com este nome.");
    } else {
      setMensagem("");
      setProdutosBuscados(resultados);
    }
  };

  const limparBusca = () => {
    setMostrarProdutos(false);
    setProdutosBuscados([]);
    setMensagem("");
    setSearch("");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h2" component="div" textAlign="center">
            Produtos
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="mt-4" sx={{ marginTop: "40px" }}>
        <form onSubmit={adicionarProduto}>
          <div>
            <label>Nome: </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Preço: </label>
            <input
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              step="0.01"
              min="0.01"
            />
          </div>
          <button type="submit">Adicionar produto</button>
        </form>

        <Box mt={4}>
          <div>
            <label>Buscar produto: </label>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleBuscar}>Buscar produto</button>
          </div>
          <div>
            <button onClick={carregarProdutos}>Listar produtos</button>
          </div>
          <div>
            <button onClick={limparBusca}>Limpar busca</button>
          </div>
        </Box>
        {mostrarProdutos && (
          <ul>
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                <li key={produto.id}>
                  {produto.id} - {produto.nome} - R$ {produto.preco}
                </li>
              ))
            ) : (
              <li>Não há produtos disponíveis.</li>
            )}
          </ul>
        )}

        {produtosBuscados.length > 0 && (
          <ul>
            {produtosBuscados.map((produto) => (
              <li key={produto.id}>
                {produto.id} - {produto.nome} - R$ {produto.preco}
              </li>
            ))}
          </ul>
        )}

        {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Container>
    </div>
  );
};

export default Produtos;
