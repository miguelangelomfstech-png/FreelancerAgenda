# Documentação do Projeto: Freelancer Agenda (AgendaPro)

Este documento fornece uma visão geral técnica e funcional completa do sistema **Freelancer Agenda**, apelidado comercialmente de **AgendaPro**.

---

## 1. Visão Geral

O Freelancer Agenda é uma aplicação web (e móvel) projetada para ajudar profissionais autônomos a gerenciar seus serviços e agendamentos, além de fornecer um portal público para que clientes realizem reservas de forma intuitiva.

### Principais Objetivos

- Gerenciamento de serviços (nome, preço, duração).
- Visualização de agenda via calendário mensal.
- Sistema multi-usuário com isolamento de dados.
- Link de agendamento público personalizado por profissional.
- Compatibilidade nativa com Android e iOS via Capacitor.

---

## 2. Arquitetura Técnica

### Stack de Tecnologia

- **Frontend**: React 19 + TypeScript.
- **Build Tool**: Vite.
- **Estilização**: Tailwind CSS + Lucide React (Ícones).
- **Roteamento**: React Router Dom v7.
- **Banco de Dados (Persistência)**: LocalStorage do navegador (com isolamento por ID de usuário).
- **Mobile**: Capacitor.
- **Segurança**: Sistema de autenticação client-side com gerenciamento de sessão.

### Estrutura de Pastas

```text
src/
├── components/     # Componentes reutilizáveis (UI, Calendar, Forms)
├── context/        # Gerenciamento de estado global (Auth, Store)
├── pages/          # Páginas principais (Dashboard, Booking, Login, Register)
├── types/          # Definições de interfaces TypeScript
└── main.tsx        # Ponto de entrada da aplicação
```

---

## 3. Funcionalidades Principais

### Autenticação Multi-usuário

A aplicação permite que múltiplos profissionais se cadastrem no mesmo dispositivo.

- **AuthContext**: Controla o usuário logado e persistência da sessão.
- **Isolamento**: Os dados de serviços e agendamentos são salvos com chaves dinâmicas (ex: `app_services_{userId}`), garantindo que um usuário não veja os dados do outro.

### Dashboard do Profissional

O painel administrativo onde o freelancer gerencia seu negócio:

- **Gerenciar Serviços**: Adicionar, editar ou remover tipos de serviços oferecidos.
- **Calendário**: Visualização completa dos agendamentos confirmados.
- **Link de Agendamento**: Geração de um link único (ex: `/book?uid=...`) para compartilhar com clientes.

### Sistema de Agendamento (Booking Page)

Uma página pública otimizada para o cliente:

1. **Seleção de Serviço**: Escolha baseada no que o profissional oferece.
2. **Seleção de Data e Hora**: Integração com calendário para verificar disponibilidade.
3. **Dados do Cliente**: Formulário simples para confirmação.
4. **Confirmação**: Feedback imediato de sucesso.

---

## 4. Guia de Instalação e Desenvolvimento

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### Comandos Úteis

- `npm install`: Instala as dependências.
- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a versão de produção na pasta `dist/`.

---

## 5. Deploy e Distribuição

### Web (Vercel/Netlify)

O projeto está configurado para deploy contínuo via GitHub.

- **SPA Routing**: Arquivo `vercel.json` configurado para evitar erros 404 ao atualizar páginas de rotas internas.

### Mobile (Android e iOS)

Utiliza-se o **Capacitor** para envolver a aplicação web em código nativo.

- **Comandos**:
  - `npm run cap:sync`: Sincroniza o código web com os projetos nativos.
  - `npm run cap:android`: Abre o projeto no Android Studio.
  - `npm run cap:ios`: Abre o projeto no Xcode (necessário Mac).

---

## 6. Modelos de Dados (Types)

- **User**: `id`, `name`, `email`.
- **Service**: `id`, `name`, `description`, `duration`, `price`.
- **Appointment**: `id`, `serviceId`, `date`, `client` (nome, telefone, email), `status`.

---

## 7. Como Converter para PDF

Para obter este documento em PDF, você pode:

1. Abrir o arquivo `DOCUMENTATION.md` no VS Code.
2. Pressionar `Ctrl+Shift+P` e digitar `Markdown: Export as PDF` (requer extensão "Markdown PDF").
3. Ou simplesmente abrir o site no navegador e usar a função "Imprimir" (Ctrl+P) selecionando "Salvar como PDF".
