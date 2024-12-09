import React, { useState, useEffect } from "react";
import api from "./api";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const Pedidos = () => {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [idCliente, setIdCliente] = useState("");
  const [idProduto, setIdProduto] = useState("");
  const [buscaCliente, setBuscaCliente] = useState("");
  const [buscaProduto, setBuscaProduto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [error, setError] = useState("");
  const [pedidoExistente, setPedidoExistente] = useState(null);
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);
  const [mostrarPedidos, setMostrarPedidos] = useState(false);
  const [exibirTabela, setExibirTabela] = useState(true);

  useEffect(() => {
    api
      .get("/clientes")
      .then((response) => setClientes(response.data))
      .catch((error) => console.error("Erro ao buscar clientes:", error));

    api
      .get("/produtos")
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  const adicionarProdutoAoPedido = (event) => {
    event.preventDefault();
    if (!idCliente || !idProduto) {
      setError("Cliente e Produto são obrigatórios.");
      return;
    }

    const pedidoExistente = pedidos.find(
      (pedido) => pedido.cliente.id === idCliente
    );

    if (pedidoExistente) {
      const produtoExistente = pedidoExistente.produtos.find(
        (p) => p.id === idProduto
      );

      if (produtoExistente) {
        setError("Produto já adicionado ao pedido.");
        return;
      }

      const produtosAtualizados = [
        ...pedidoExistente.produtos,
        { id: idProduto },
      ];
      api
        .put(`/pedidos/${pedidoExistente.id}`, {
          cliente: { id: idCliente },
          produtos: produtosAtualizados,
        })
        .then((response) => {
          setPedidos((prevPedidos) =>
            prevPedidos.map((p) =>
              p.id === pedidoExistente.id
                ? { ...p, produtos: response.data.produtos }
                : p
            )
          );
          setMensagem("Produto adicionado ao pedido existente!");
          setBotaoDesabilitado(true);
        })
        .catch((error) => {
          setError("Erro ao adicionar produto ao pedido.");
          console.error("Erro ao adicionar produto ao pedido:", error);
        });
    } else {
      const novoPedido = {
        cliente: { id: idCliente },
        produtos: [{ id: idProduto }],
      };

      api
        .post("/pedidos", novoPedido)
        .then((response) => {
          setPedidos([...pedidos, response.data]);
          setMensagem("Novo pedido criado com sucesso!");
          setBotaoDesabilitado(true);
        })
        .catch((error) => {
          setError("Erro ao criar novo pedido.");
          console.error("Erro ao criar novo pedido:", error);
        });
    }

    setIdProduto("");
    setIdCliente("");
  };

  const listarPedidos = () => {
    setMensagem("");
    setError("");
    api
      .get("/pedidos")
      .then((response) => {
        setPedidos(response.data);
        setMostrarPedidos(true); // Exibe os pedidos após a atualização
      })
      .catch((error) => {
        setError("Erro ao listar pedidos.");
        console.error("Erro ao listar pedidos:", error);
      });
  };

  const buscarPedidosPorCliente = () => {
    setMensagem("");
    setError("");

    if (!buscaCliente) {
      setError("O ID do cliente é obrigatório para a busca.");
      return;
    }

    api
      .get(`/pedidos/clientes/${buscaCliente}`)
      .then((response) => setPedidos(response.data))
      .catch((error) => {
        setError("Erro ao buscar pedidos por cliente.");
        console.error("Erro ao buscar pedidos por cliente:", error);
      });
  };

  const buscarPedidosPorProduto = () => {
    setMensagem("");
    setError("");

    if (!buscaProduto) {
      setError("O ID do produto é obrigatório para a busca.");
      return;
    }

    api
      .get(`/pedidos/produtos/${buscaProduto}`)
      .then((response) => setPedidos(response.data))
      .catch((error) => {
        setError("Erro ao buscar pedidos por produto.");
        console.error("Erro ao buscar pedidos por produto:", error);
      });
  };

  const limparBusca = () => {
    setBuscaCliente("");
    setBuscaProduto("");
    listarPedidos();
    setMensagem("");
    setError("");
    setExibirTabela(false);
  };

  const selecionarPedidoExistente = (pedido) => {
    setIdCliente(pedido.cliente.id);
    setPedidoExistente(pedido);
    setBotaoDesabilitado(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h2" component="div" textAlign="center">
            Pedidos
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="mt-4" sx={{ marginTop: "40px" }}>
        <form onSubmit={adicionarProdutoAoPedido}>
          <div>
            <label>Cliente:</label>
            <select
              value={idCliente}
              onChange={(e) => setIdCliente(e.target.value)}
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Produto:</label>
            <select
              value={idProduto}
              onChange={(e) => setIdProduto(e.target.value)}
            >
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={botaoDesabilitado}>
            {pedidoExistente
              ? "Adicionar produto ao pedido"
              : "Adicionar pedido"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Box mt={4}>
          <div>
            <label>Buscar pedidos por ID do cliente:</label>
            <input
              type="text"
              placeholder="ID do Cliente"
              value={buscaCliente}
              onChange={(e) => setBuscaCliente(e.target.value)}
            />
            <button onClick={buscarPedidosPorCliente}>
              Buscar por cliente
            </button>
          </div>
          <div>
            <label>Buscar pedidos por ID do produto:</label>
            <input
              type="text"
              placeholder="ID do Produto"
              value={buscaProduto}
              onChange={(e) => setBuscaProduto(e.target.value)}
            />
            <button onClick={buscarPedidosPorProduto}>
              Buscar por produto
            </button>
          </div>
          <button onClick={listarPedidos}>Listar pedidos</button>
          <button onClick={limparBusca}>Limpar busca</button>
        </Box>

        {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}

        {exibirTabela && pedidos.length > 0 && (
          <Table sx={{ marginTop: "20px" }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Produtos</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidos.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell>{pedido.id}</TableCell>
                  <TableCell>{pedido.cliente.nome}</TableCell>
                  <TableCell>
                    {pedido.produtos.map((produto) => (
                      <div key={produto.id}>{produto.nome}</div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <button onClick={() => selecionarPedidoExistente(pedido)}>
                      Selecionar
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default Pedidos;
