# Quiz — Guia de Uso Responsável da Tecnologia

Uma aplicação web estática e interativa desenvolvida para avaliar e treinar conhecimentos sobre o uso responsável de equipamentos e softwares corporativos. O sistema consiste em um quiz com 26 questões sobre boas práticas de tecnologia, com sistema de pontuação e ranking local.

---

## 📋 Índice

1. [Descrição da Aplicação](#descrição-da-aplicação)
2. [Tutorial de Uso para o Usuário Final](#tutorial-de-uso-para-o-usuário-final)
3. [Como Executar e Hospedar](#como-executar-e-hospedar)
4. [Estrutura do Projeto](#estrutura-do-projeto)

---

## 📖 Descrição da Aplicação

### O que é?

O **Quiz — Guia de Uso Responsável da Tecnologia** é uma aplicação web educativa desenvolvida para o **Coren-BA** (Conselho Regional de Enfermagem da Bahia). A aplicação permite que colaboradores testem seus conhecimentos sobre:

- Uso correto de equipamentos de informática
- Boas práticas de segurança digital
- Procedimentos corporativos (GLPI, SPARK, SIALM)
- Políticas de uso de tecnologia
- Cuidados com equipamentos emprestados

### Funcionalidades Principais

- ✅ **26 questões interativas** sobre uso responsável da tecnologia
- ✅ **Feedback imediato** com explicações detalhadas para cada resposta
- ✅ **Sistema de pontuação** automático (1 ponto por acerto)
- ✅ **Ranking (Leaderboard) Local** com as maiores pontuações salvas no navegador (via `localStorage`)
- ✅ **Design UI/UX Premium** responsivo com transições e tipografia dinâmica (Glassmorphism e Google Fonts)
- ✅ **Acessibilidade** com suporte a leitores de tela

### Tecnologias Utilizadas

Esta é uma aplicação **100% Frontend (Estática)**:
- HTML5
- CSS3 (Vanilla com Variáveis e Efeitos de Blur)
- JavaScript (ES6+ Vanilla, persistência em localStorage)

Não há dependências de backend ou banco de dados, o que facilita enormemente a hospedagem e reduz custos a zero.

---

## 👤 Tutorial de Uso para o Usuário Final

### Passo a Passo: Como Usar o Quiz

#### 1. **Acessar o Quiz**
Acesse o link fornecido pela equipe de TI (ex: uma página no GitHub Pages).

#### 2. **Preencher Informações Iniciais**
Ao abrir o quiz, você verá um formulário solicitando seu Nome e Setor. Clique em "Começar".

#### 3. **Responder as Questões**
O quiz apresenta **26 questões**. Selecione uma alternativa, clique em "Verificar Respostas", leia a explicação, e avance para a próxima.

#### 4. **Visualizar Resultado Final**
No final, aparecerá a pontuação total e sua classificação no Ranking Local do seu navegador. 

#### 5. **Acessar o Manual**
Para consultar informações detalhadas, clique no botão **"📘 Acessar Manual Completo"** no final do quiz.

---

## 🚀 Tecnologias e Arquitetura

O projeto foi totalmente refatorado para uma **arquitetura Serverless e Estática**, eliminando qualquer custo de servidor 100% gratuito.

- **Frontend (Estático)**: 100% HTML, CSS Vanilla e JavaScript.
- **Backend / Banco de Dados**: Firebase Firestore (BaaS - Backend as a Service).
- **Hospedagem**: Projetado para rodar gratuitamente via **GitHub Pages**.

### Vantagens da Nova Arquitetura
1. **Ranking Global em Tempo Real**: Diferente da antiga versão em LocalStorage, todos os acessos agora gravam a pontuação na nuvem pública do Firebase, permitindo que todos os participantes vejam o Top 10 atualizado de qualquer computador.
2. **Custo Zero**: Tanto o GitHub Pages quanto a cota gratuita mensal do Firebase Firestore atendem com grande folga à demanda do Quiz.
3. **Facilidade de Deploy**: Basta realizar o *push* dos arquivos para a *branch* principal do repositório configurada no GitHub Pages. Sem Docker, sem Python, sem complicação.

---

## 🚀 Como Executar e Hospedar

Como o projeto agora é **100% estático**, ele não requer Docker, Python ou bancos de dados. 

### Executando Localmente (Para Testes)

Você pode simplesmente abrir o arquivo `index.html` clicando duas vezes nele em qualquer navegador web, ou servir usando uma ferramenta simples, como:

**Com Python:**
```bash
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

**Com Node.js (se tiver npx):**
```bash
npx serve
```

### Hospedagem Gratuita (GitHub Pages, Vercel, Netlify)

A aplicação está configurada e pronta para ser hospedada gratuitamente.

**No GitHub Pages:**
1. Faça o push de todo o repositório para o GitHub.
2. Vá em **Settings > Pages**.
3. Em *Source*, selecione a branch `main` e a pasta `/ (root)`.
4. Salve. O site estará online em alguns minutos.

---

## 📁 Estrutura do Projeto

```
quiz.ti.github.io/
├── index.html       # Página principal e do Quiz
├── manual.html      # Página do Manual Coren-BA
├── script.js        # Lógica do Quiz e Persistência Local
├── styles.css       # Estilos globais premium e animações
└── image/           # Imagens e logotipos (ex: logo do Coren-BA)
```

---

## 📝 Licença e Créditos

Este projeto foi desenvolvido para o **Coren-BA** (Conselho Regional de Enfermagem da Bahia).
Refatorado para arquitetura Estática Serverless.
