import "./styles.css";
import React, { useState, useEffect } from "react";
import api from "./api";

import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { Box } from "@mui/system";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [contato, setContato] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mostrarClientes, setMostrarClientes] = useState(false);
  const [clientesBuscados, setClientesBuscados] = useState([]);

  useEffect(() => {
    api
      .get("/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes", error);
      });
  }, []);

  const adicionarCliente = (e) => {
    e.preventDefault();
    setError("");
    setMensagem("");

    if (!nome.trim()) {
      setError("O nome do cliente é obrigatório.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("E-mail inválido.");
      return;
    }
    if (!contato.trim() || contato.length < 8) {
      setError("Contato deve ter pelo menos 8 caracteres.");
      return;
    }
    api
      .post("/clientes", { nome, email, contato })
      .then((response) => {
        setClientes([...clientes, response.data]);
        setNome("");
        setEmail("");
        setContato("");
        setMensagem("Cliente salvo com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao adicionar cliente", error);
      });
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(search.toLowerCase())
  );

  const carregarClientes = () => {
    setMostrarClientes(true);
    setClientesBuscados([]);
    setMensagem("");
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    setMostrarClientes(false);
    const resultados = clientes.filter(
      (cliente) =>
        cliente.nome &&
        cliente.nome.toLowerCase().includes(search.toLowerCase())
    );

    if (resultados.length === 0) {
      setMensagem("Nenhum cliente encontrado com este nome.");
    } else {
      setMensagem("");
      setClientesBuscados(resultados);
    }
  };

  const limparBusca = () => {
    setMostrarClientes(false);
    setClientesBuscados([]);
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
            Clientes
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="mt-4" sx={{ marginTop: "40px" }}>
        <form onSubmit={adicionarCliente}>
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
            <label>E-mail: </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contato: </label>
            <input
              type="text"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
              required
            />
          </div>
          <button type="submit">Adicionar cliente</button>
        </form>

        <Box mt={4}>
          <div>
            <label>Buscar cliente: </label>
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleBuscar}>Buscar cliente</button>
          </div>
          <div>
            <div>
              <button onClick={carregarClientes}>Listar clientes</button>
            </div>
            <div>
              <button onClick={limparBusca}>Limpar busca</button>
            </div>
          </div>
        </Box>
        {mostrarClientes && (
          <ul>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <li key={cliente.id}>
                  {cliente.id} - {cliente.nome} - {cliente.email} -{" "}
                  {cliente.contato}
                </li>
              ))
            ) : (
              <li>Não há clientes cadastrados</li>
            )}
          </ul>
        )}

        {clientesBuscados.length > 0 && (
          <ul>
            {clientesBuscados.map((cliente) => (
              <li key={cliente.id}>
                {cliente.id} - {cliente.nome} - {cliente.email} -{" "}
                {cliente.contato}
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

export default Clientes;
