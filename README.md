# 🛒 Sistema de Vendas - Frontend React

Interface web moderna e responsiva para o sistema de gerenciamento de vendas. Este projeto em **React** consome a API REST desenvolvida em Spring Boot, oferecendo uma experiência completa de CRUD para Clientes, Produtos e Pedidos.

## 🔗 Integração com Backend

Este frontend se conecta ao backend desenvolvido em Spring Boot:
- **Backend**: [Atividade09](https://github.com/RGPaix/Atividade09) (API REST com Swagger)
- **Frontend**: Este projeto (Interface React)

## ✨ Funcionalidades

### 👤 Gestão de Clientes
- ✅ Cadastro de novos clientes
- ✅ Listagem com busca e filtros
- ✅ Edição de dados do cliente
- ✅ Visualização de detalhes
- ✅ Exclusão de clientes
- ✅ Histórico de pedidos por cliente

### 📦 Gestão de Produtos
- ✅ Cadastro de produtos com preço e estoque
- ✅ Galeria de produtos com imagens
- ✅ Controle de estoque em tempo real
- ✅ Edição de preços e descrições
- ✅ Filtros por categoria e disponibilidade
- ✅ Alertas de estoque baixo

### 🛍️ Gestão de Pedidos
- ✅ Carrinho de compras interativo
- ✅ Seleção de cliente e produtos
- ✅ Cálculo automático de totais
- ✅ Finalização de pedidos
- ✅ Histórico completo de vendas
- ✅ Relatórios e dashboards

### 🎨 Interface Moderna
- ✅ Design responsivo (Mobile-first)
- ✅ Navegação intuitiva
- ✅ Feedback visual para ações
- ✅ Loading states e animations
- ✅ Notificações toast
- ✅ Tema claro/escuro

## 💻 Tecnologias Utilizadas

- **Frontend**: React 18+
- **Linguagem**: JavaScript (ES6+) / TypeScript
- **Roteamento**: React Router DOM
- **HTTP Client**: Axios
- **UI Framework**: Material-UI / Bootstrap / Styled Components
- **State Management**: React Hooks / Context API
- **Forms**: React Hook Form / Formik
- **Icons**: React Icons / Lucide React
- **Notifications**: React Toastify
- **Charts**: Recharts / Chart.js

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── common/          # Componentes genéricos
│   │   ├── Header.js
│   │   ├── Sidebar.js
│   │   ├── Loading.js
│   │   └── ConfirmDialog.js
│   ├── clientes/        # Componentes de clientes
│   │   ├── ClienteList.js
│   │   ├── ClienteForm.js
│   │   ├── ClienteCard.js
│   │   └── ClienteDetails.js
│   ├── produtos/        # Componentes de produtos
│   │   ├── ProdutoList.js
│   │   ├── ProdutoForm.js
│   │   ├── ProdutoCard.js
│   │   └── EstoqueAlert.js
│   └── pedidos/         # Componentes de pedidos
│       ├── PedidoList.js
│       ├── PedidoForm.js
│       ├── Carrinho.js
│       └── PedidoDetails.js
├── pages/               # Páginas da aplicação
│   ├── Home.js
│   ├── Clientes.js
│   ├── Produtos.js
│   ├── Pedidos.js
│   └── Dashboard.js
├── services/            # Serviços para API
│   ├── api.js           # Configuração do Axios
│   ├── clienteService.js
│   ├── produtoService.js
│   └── pedidoService.js
├── context/             # Context API
│   ├── AuthContext.js
│   ├── CartContext.js
│   └── ThemeContext.js
├── hooks/               # Custom Hooks
│   ├── useApi.js
│   ├── useLocalStorage.js
│   └── useDebounce.js
├── utils/               # Utilitários
│   ├── formatters.js    # Formatação de dados
│   ├── validators.js    # Validações
│   └── constants.js     # Constantes
├── styles/              # Estilos globais
│   ├── global.css
│   ├── variables.css
│   └── components.css
├── App.js              # Componente principal
└── index.js            # Ponto de entrada
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 16+
- NPM ou Yarn
- Backend Spring Boot rodando (porta 8080)

### 1. Clone o repositório
```bash
git clone https://github.com/RGPaix/ProjetoFinal.git
cd ProjetoFinal
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure o ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# URL da API Backend
REACT_APP_API_URL=http://localhost:8080/api

# Configurações opcionais
REACT_APP_TIMEOUT=10000
REACT_APP_PAGINATION_SIZE=10
```

### 4. Execute o projeto
```bash
npm start
# ou
yarn start
```

A aplicação estará disponível em: `http://localhost:3000`

## 🔌 Configuração da API

### Arquivo de configuração principal:
```javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptors para tratamento de erros
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na API:', error);
    return Promise.reject(error);
  }
);

export default api;
```

### Serviços específicos:
```javascript
// src/services/clienteService.js
import api from './api';

export const clienteService = {
  getAll: () => api.get('/clientes'),
  getById: (id) => api.get(`/clientes/${id}`),
  create: (data) => api.post('/clientes', data),
  update: (id, data) => api.put(`/clientes/${id}`, data),
  delete: (id) => api.delete(`/clientes/${id}`)
};

// src/services/produtoService.js
export const produtoService = {
  getAll: () => api.get('/produtos'),
  getById: (id) => api.get(`/produtos/${id}`),
  create: (data) => api.post('/produtos', data),
  update: (id, data) => api.put(`/produtos/${id}`, data),
  delete: (id) => api.delete(`/produtos/${id}`)
};

// src/services/pedidoService.js
export const pedidoService = {
  getAll: () => api.get('/pedidos'),
  getById: (id) => api.get(`/pedidos/${id}`),
  create: (data) => api.post('/pedidos', data),
  getByCliente: (clienteId) => api.get(`/pedidos/cliente/${clienteId}`)
};
```

## 🎨 Principais Componentes

### App.js - Componente Principal
```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Produtos from './pages/Produtos';
import Pedidos from './pages/Pedidos';
import Dashboard from './pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clientes/*" element={<Clientes />} />
              <Route path="/produtos/*" element={<Produtos />} />
              <Route path="/pedidos/*" element={<Pedidos />} />
            </Routes>
          </main>
        </div>
        <ToastContainer position="top-right" />
      </div>
    </Router>
  );
}

export default App;
```

## 🛡️ Tratamento de Erros e Loading

### Custom Hook para APIs:
```javascript
// src/hooks/useApi.js
import { useState, useEffect } from 'react';

export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiFunction();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};
```

## 📱 Responsividade

O sistema foi desenvolvido com abordagem **Mobile-first**:

- 📱 **Mobile** (320px - 768px): Layout em coluna única
- 📱 **Tablet** (769px - 1024px): Layout híbrido
- 💻 **Desktop** (1025px+): Layout completo com sidebar

### Breakpoints principais:
```css
/* styles/variables.css */
:root {
  --mobile: 768px;
  --tablet: 1024px;
  --desktop: 1200px;
}

@media (max-width: 768px) {
  .sidebar { display: none; }
  .main-content { width: 100%; }
}
```

## 🧪 Funcionalidades Avançadas

### 1. Context para Carrinho de Compras
```javascript
// src/context/CartContext.js
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (produto, quantidade) => {
    // Lógica para adicionar produto
  };

  const removeFromCart = (produtoId) => {
    // Lógica para remover produto
  };

  const calculateTotal = () => {
    // Cálculo do total
  };

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, calculateTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
```

### 2. Notificações Customizadas
```javascript
// src/utils/notifications.js
import { toast } from 'react-toastify';

export const notify = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast.info(message),
  warning: (message) => toast.warning(message)
};
```

## 📊 Dashboard e Relatórios

- **Vendas do dia/semana/mês**
- **Produtos mais vendidos**
- **Clientes mais ativos**
- **Gráficos interativos**
- **Métricas de performance**

## 🚀 Build e Deploy

### Build para produção:
```bash
npm run build
# ou
yarn build
```

### Deploy sugerido:
- **Netlify**: Deploy automático via GitHub
- **Vercel**: Integração contínua
- **AWS S3**: Hospedagem estática
- **GitHub Pages**: Deploy gratuito

## 🔧 Scripts Disponíveis

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src/**/*.js",
    "format": "prettier --write src/**/*.js"
  }
}
```

## 🎯 Melhorias Futuras

- [ ] **PWA** (Progressive Web App)
- [ ] **Tema dark mode** completo
- [ ] **Internacionalização** (i18n)
- [ ] **Testes automatizados** (Jest, Testing Library)
- [ ] **Storybook** para componentes
- [ ] **Performance** com React.memo e useMemo
- [ ] **Offline support** com Service Workers
- [ ] **Push notifications**

## 🔐 Considerações de Segurança

- Validação de dados no frontend
- Sanitização de inputs
- Tratamento de erros da API
- Headers de segurança
- Timeouts em requisições

## 👨‍💻 Autor

**Desenvolvido por:** [@RGPaix](https://github.com/RGPaix)  
**Frontend**: React com integração API REST  
**Backend**: Spring Boot (Atividade09)

## 📚 Recursos de Aprendizado

- [Documentação React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [Material-UI](https://mui.com/)

## 📞 Contato

- GitHub: [@RGPaix](https://github.com/RGPaix)
- Backend API: [Atividade09](https://github.com/RGPaix/Atividade09)
- Issues: [Reportar problemas](https://github.com/RGPaix/ProjetoFinal/issues)

---

🛒 **Sistema completo de vendas com interface moderna e funcional!**
