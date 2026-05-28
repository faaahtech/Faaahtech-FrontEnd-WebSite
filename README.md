# Faaahtech Portal — Secretária Digital CPS

Frontend da aplicação **Faaahtech Portal**, uma Secretária Digital Acadêmica para atendimento de alunos da **FATEC / Centro Paula Souza**.

---

## Stack

| Ferramenta | Versão | Função |
|---|---|---|
| React | 18 | UI framework |
| TypeScript | 5 | Tipagem estática |
| Vite | 5 | Build tool e dev server |
| Tailwind CSS | 3 | Estilização utility-first |
| React Router DOM | 6 | Roteamento SPA |
| js-cookie | 3 | Persistência de token em cookie |
| clsx | 2 | Classes condicionais |
| lucide-react | — | Disponível, se necessário |

---

## Instalação e execução

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev

# 3. Acesse em
http://localhost:5173
```

### Credenciais de demonstração

| Identificador | Senha | Papel |
|---|---|---|
| `2024001234` | `123456` | Aluno (João Silva) |
| `2023005678` | `123456` | Aluno (Mariana Costa) |
| `joao.silva@fatec.sp.gov.br` | `123456` | Aluno (e-mail) |
| `STAFF001` | `admin123` | Funcionário |
| `000.000.000-00` | qualquer | Demo (CPF genérico) |

---

## Estrutura do projeto

```
src/
├── types/              # Interfaces e tipos TypeScript
│   ├── auth.ts         # User, LoginCredentials, AuthState, AuthContextValue
│   ├── chat.ts         # ChatMessage, ChatSession, MessageRole
│   ├── document.ts     # AcademicDocument, DocumentRequest, DocumentType
│   └── student.ts      # Grade, Exam, Schedule, StudentStats
│
├── mocks/              # Dados mockados (substitui backend)
│   ├── users.ts        # Usuários e credenciais demo
│   ├── documents.ts    # Documentos acadêmicos
│   ├── grades.ts       # Notas, provas, estatísticas
│   └── chatResponses.ts# Respostas da IA por palavras-chave
│
├── services/           # Camada de serviço (simula API REST)
│   ├── authService.ts  # login(), logout(), getSession()
│   ├── documentService.ts # getAll(), request(), cancel()
│   ├── studentService.ts  # getGrades(), getExams(), getStats()
│   └── chatService.ts     # getGreeting(), sendMessage()
│
├── utils/
│   ├── token.ts        # generateFakeToken, saveToken, getToken, isTokenValid
│   └── cn.ts           # cn(), formatDate(), getInitials(), simulateDelay()
│
├── context/
│   └── AuthContext.tsx  # AuthProvider + useAuthContext (useReducer)
│
├── hooks/
│   ├── useAuth.ts       # Re-export de useAuthContext
│   ├── useDocuments.ts  # CRUD de documentos com estado
│   ├── useStudent.ts    # Notas, provas, estatísticas
│   └── useChat.ts       # Estado e lógica do chat com IA
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx      # primary | secondary | ghost | danger
│   │   ├── Input.tsx       # Com label, ícone, erro e foco bottom-border
│   │   ├── Card.tsx        # Card + CardHeader + CardBody
│   │   ├── Badge.tsx       # Variantes: default, primary, success, warning, danger
│   │   └── LoadingSpinner.tsx # Spinner + SkeletonCard
│   │
│   ├── layout/
│   │   ├── Sidebar.tsx      # Nav lateral desktop com NavLink ativo
│   │   ├── TopBar.tsx       # Barra superior com busca e avatar
│   │   ├── MobileNav.tsx    # Bottom nav para mobile
│   │   ├── PrivateLayout.tsx # Sidebar + TopBar + MobileNav + main
│   │   └── PublicLayout.tsx  # Layout simples com dot background
│   │
│   └── shared/
│       └── ProtectedRoute.tsx # Redireciona /login se sem token válido
│
├── pages/
│   ├── public/
│   │   ├── LoginPage.tsx      # Tela de login com validação e erro
│   │   └── EnrollmentPage.tsx # Cadastro de matrícula (público)
│   │
│   ├── private/
│   │   ├── DashboardPage.tsx  # Painel principal do aluno
│   │   ├── AISecretaryPage.tsx# Chat com IA (layout full-height)
│   │   ├── AgendaPage.tsx     # Calendário + grade semanal + provas
│   │   ├── DocumentsPage.tsx  # Lista, filtros e modal de solicitação
│   │   └── SettingsPage.tsx   # Perfil, segurança e notificações
│   │
│   └── NotFoundPage.tsx       # 404 com redirecionar
│
├── router/
│   └── index.tsx      # createBrowserRouter com rotas públicas e privadas
│
├── App.tsx            # AuthProvider + RouterProvider
├── main.tsx           # ReactDOM.createRoot
└── index.css          # Tailwind layers + utilitários globais
```

---

## Arquitetura de autenticação

```
LoginPage
  └── useAuth() → login(credentials)
        └── authService.login()
              ├── findUserByIdentifier() [mock]
              ├── generateFakeToken(userId)
              ├── saveToken() → js-cookie (expires: 1 day)
              └── saveUser() → localStorage

ProtectedRoute
  └── useAuth() → isAuthenticated
        └── authService.getSession()
              ├── getToken() → js-cookie
              ├── isTokenValid() → verifica payload.exp
              └── getUser() → localStorage

Logout
  └── authService.logout()
        ├── removeToken() → js-cookie
        └── removeUser() → localStorage
```

---

## Token fake (JWT-like)

O token é gerado sem assinatura real, apenas para simular o fluxo:

```
header.payload.signature
  └── payload contém: sub, iat, exp (8h), iss
```

A validação verifica apenas se `exp > Date.now() / 1000`.

---

## Design System — Faaahtech Core

Baseado no `DESIGN.md` fornecido:

- **Primary (Legacy Red):** `#7d0011` — ações primárias, brand
- **Secondary (Steel Blue-Grey):** `#545f6e` — ações secundárias
- **Tipografia:** Hanken Grotesk (títulos) + Inter (corpo/labels)
- **Inputs:** fundo `#F1F3F5`, foco com `border-bottom: 2px solid primary`
- **Cards:** `bg-white`, `box-shadow: 0 4px 20px rgba(0,0,0,0.05)`
- **Bordas:** arredondamento suave (4–8px padrão, 12px para cards)
- **Espaçamento:** base 4px/8px, grid 12 colunas desktop

---

## Como integrar com um backend real

Para conectar a um backend real (ex: Node.js/NestJS, Django, Spring):

1. **Substitua os services** em `src/services/` por chamadas `fetch`/`axios` reais
2. **authService.ts**: troque o mock por `POST /auth/login` e armazene o JWT retornado
3. **documentService.ts**: conecte a `GET /documents`, `POST /documents`, `DELETE /documents/:id`
4. **studentService.ts**: conecte a `GET /students/grades`, `GET /students/exams`
5. **Remova** as pastas `src/mocks/` e `src/utils/token.ts` (gerador de token fake)
6. **Configure** `VITE_API_BASE_URL` no `.env` e use no início de cada service

```ts
// Exemplo de integração futura — authService.ts
const BASE = import.meta.env.VITE_API_BASE_URL

export const authService = {
  async login(credentials: LoginCredentials) {
    const res = await fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    if (!res.ok) throw new Error('Credenciais inválidas')
    const { user, token } = await res.json()
    saveToken(token)
    saveUser(user)
    return { user, token }
  },
}
```

---

## Scripts disponíveis

```bash
npm run dev      # Servidor de desenvolvimento (HMR)
npm run build    # Build de produção (tsc + vite build)
npm run preview  # Preview do build de produção
npm run lint     # ESLint com TypeScript
```

---

## Rotas

| Rota | Tipo | Página |
|---|---|---|
| `/` | Pública | Redireciona para `/dashboard` |
| `/login` | Pública | Tela de login |
| `/cadastro` | Pública | Cadastro de matrícula |
| `/dashboard` | **Privada** | Painel do aluno |
| `/secretaria` | **Privada** | Chat com a IA |
| `/agenda` | **Privada** | Calendário e horários |
| `/documentos` | **Privada** | Gerenciamento de documentos |
| `/configuracoes` | **Privada** | Perfil e preferências |
| `*` | Qualquer | 404 |

Rotas privadas redirecionam automaticamente para `/login` se não houver token válido.

---

## Créditos

Desenvolvido como frontend de referência para o projeto **Faaahtech Portal — Secretária Digital CPS**.

Design System: Faaahtech Core · Instituição: Centro Paula Souza / FATEC
