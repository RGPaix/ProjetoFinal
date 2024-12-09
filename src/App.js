import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { Box } from "@mui/system";

import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos";
import Pedidos from "./pages/Pedidos";

const Layout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" component="div" textAlign="center">
            Gestão de Pedidos
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: "40px" }}>{children}</Container>
      <footer
        className="bg-light py-3 mt-5 text-center"
        style={{
          backgroundColor: "#3333",
          color: "#fff",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 Gestão de Pedidos. Todos os direitos reservados.
        </Typography>
      </footer>
    </>
  );
};

const Home = () => (
  <Container>
    <Typography variant="h6" gutterBottom>
      Escolha uma das opções abaixo para começar:
    </Typography>
    <Box className="mb-4">
      <nav className="nav nav-pills nav-fill">
        <Link className="nav-link" to="/clientes">
          <ul>
            <li>Clientes</li>
          </ul>
        </Link>
        <Link className="nav-link" to="/produtos">
          <ul>
            <li>Produtos</li>
          </ul>
        </Link>
        <Link className="nav-link" to="/pedidos">
          <ul>
            <li>Pedidos</li>
          </ul>
        </Link>
      </nav>
    </Box>
  </Container>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Página inicial */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        {/* Página Clientes */}
        <Route
          path="/clientes"
          element={
            <Layout>
              <Clientes />
            </Layout>
          }
        />
        {/* Página Produtos */}
        <Route
          path="/produtos"
          element={
            <Layout>
              <Produtos />
            </Layout>
          }
        />
        {/* Página Pedidos */}
        <Route
          path="/pedidos"
          element={
            <Layout>
              <Pedidos />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
