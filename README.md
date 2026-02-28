# 🎓 Quiz — Guia de Uso Responsável da Tecnologia

Bem-vindo à documentação oficial do **Quiz Interativo do Coren-BA**. Esta aplicação foi desenvolvida com o objetivo de conscientizar e educar colaboradores sobre as melhores práticas de uso de ativos tecnológicos corporativos, segurança cibernética e conformidade com as diretrizes internas.

Este documento funciona como um guia completo de engenharia, implementação e uso, servindo tanto para administradores de TI quanto para desenvolvedores que desejam estender as funcionalidades do sistema.

---

## 🏗️ 1. Engenharia de Software e Paradigmas

A arquitetura deste projeto não foi apenas "codificada", mas sim **planejada** para resolver problemas comuns de manutenção em aplicações estáticas.

### A. Princípio da Separação de Preocupações (Separation of Concerns - SoC)
Dividimos a aplicação em três camadas lógicas que se comunicam de forma harmoniosa:

1.  **Camada de Dados (External Data Layer)**: 
    - Representada pelo arquivo `questions.json`.
    - **Por que fizemos isso?** Antigamente, as perguntas estavam "hardcoded" no HTML. Isso tornava o arquivo `index.html` gigante (600+ linhas) e difícil de editar. Agora, o conteúdo está isolado. Mudar uma vírgula em uma pergunta não exige mexer na estrutura do site.
    
2.  **Camada de Lógica (Logic Layer)**:
    - Centralizada no arquivo `script.js`.
    - Implementa o **Padrão de Singleton de Estado**, onde o JavaScript controla a vida útil da sessão do usuário, desde a validação do formulário inicial até o cálculo final de desempenho.
    - Utiliza o paradigma de **Programação Assíncrona** (Async/Await) para garantir que o quiz não comece antes dos dados serem carregados.

3.  **Camada de Apresentação (UI Layer)**:
    - `index.html` e `styles.css`.
    - Focada exclusivamente em fornecer a "casca" estrutural e a experiência visual (UX).

### B. Ciclo de Vida do Processamento de Dados (Data Lifespan)
O fluxo de um dado no sistema segue etapas rigorosas de engenharia:
1.  **Request**: O JS dispara uma requisição de baixo custo para o servidor.
2.  **Validation**: Antes de renderizar, o JS valida se o JSON é um array válido para evitar erros de runtime.
3.  **Hydration**: O DOM (Document Object Model) é "hidratado" dinamicamente. Criamos divs, botões e labels em tempo real usando `document.createElement`.
4.  **Synchronization**: Os acertos são somados em uma variável de estado protegida no escopo do script, evitando manipulações simples via console.

---

## 🏗️ 2. Guia Detalhado de Implementação (Passo a Passo)

A construção desta ferramenta seguiu um rigoroso processo de desenvolvimento ágil:

### Passo 1: Design Visual e Experiência do Usuário (UX/UI)
- **Glassmorphism**: Utilizamos `backdrop-filter: blur()` e cores semi-transparentes para criar uma interface leve e profissional que remete a sistemas modernos de alta tecnologia.
- **Tipografia Dinâmica**: Importamos fontes via Google Fonts (`Inter` para leitura técnica e `Outfit` para títulos) para garantir elegância visual em qualquer dispositivo.

### Passo 2: Desenvolvimento da Lógica de Navegação
- Criamos um sistema de **Navegação Linear Segura**:
    - O botão "Próxima" permanece desativado até que o usuário clique em "Verificar Respostas". 
    - **O motivo técnico**: Forçar o usuário a ler a *Explicação* e a *Fonte* da resposta, garantindo o caráter educativo do quiz.

### Passo 3: Persistência Híbrida (Local + Cloud)
- **Local Storage**: Usado para manter o nome e setor do usuário, permitindo que ele continue de onde parou caso a página recarregue.
- **Firebase Firestore Integration**: Optamos por uma arquitetura *Serverless*. O quiz se comunica diretamente com o Firestore através de uma API segura, gravando os rankings globais sem a necessidade de um servidor backend próprio (Python/Node), o que reduz o custo de manutenção a zero.

### Passo 4: Refatoração para Conteúdo Externo
- Implementamos a Fetch API para o arquivo `questions.json`.
- Adicionamos um **Tratamento de Erros Robusto**: Se o carregamento via JSON falhar (por exemplo, bloqueio de CORS local), a interface informa ao usuário os passos exatos para resolver (uso de servidor local).

---

## 📦 3. Manual de Instalação e Execução (Técnico)

### Passo a Passo para Desenvolvimento Local

Se você deseja testar ou modificar o código no seu computador pessoal, siga estas instruções:

1.  **Estrutura de Arquivos**: Garanta que todos os arquivos estejam no mesmo diretório:
    - `index.html`
    - `script.js`
    - `styles.css`
    - `questions.json`

2.  **Executando no Navegador**:
    - **⚠️ Alerta Crítico de Segurança (CORS)**: Navegadores modernos impedem o carregamento de arquivos JSON locais quando você abre o HTML simplesmente clicando duas vezes nele.
    - **A Solução**: Você precisa "servir" os arquivos através de um servidor web local.
    
3.  **Como iniciar um servidor local rapidamente**:
    - **Via VS Code**: Instale a extensão `Live Server`. Abra o `index.html`, clique com o botão direito e selecione `Open with Live Server`.
    - **Via Terminal (Python)**:
      ```bash
      python3 -m http.server 8080
      ```
    - **Via Terminal (Node.js)**:
      ```bash
      npx serve .
      ```
    - Após iniciar, acesse `http://localhost:8080`.

---

## 🔌 4. Dependências e Integrações

Para que o projeto seja ultra-leve, evitamos o uso de frameworks pesados (React/Angular). Usamos apenas o necessário:

- **Firebase SDK (v9+)**: Integrado via CDN para gerenciamento do Leaderboard global.
- **Firestore DB**: Banco de dados NoSQL utilizado para salvar coleções de pontuações.
- **Google Fonts API**: Fornece as fontes de alta qualidade.
- **Vanilla JS**: 100% de performance nativa, sem sobrecarga de biblioteca externa.

---

## 🚀 5. Processo de Deploy (GitHub Pages)

O deploy é automatizado e 100% gratuito:

1.  Crie um repositório no GitHub.
2.  Suba os arquivos para a branch `main`.
3.  Em `Settings > Pages`, escolha a branch `main` e a pasta `/(root)`.
4.  O GitHub Actions gerará o build automaticamente e o link estará disponível em minutos.

---

## 🛠️ 6. Guia para Futura Manutenção

Deseja adicionar novas perguntas?
- **Passo 1**: Abra o arquivo `questions.json`.
- **Passo 2**: Copie um bloco existente de `{ }`.
- **Passo 3**: Altere os textos. O sistema detectará automaticamente a nova pergunta e atualizará o contador "Pergunta X de 26" sozinho.

---
**Documentação mantida pela equipe de TI do Coren-BA** 🏛️
*"A tecnologia ao serviço da enfermagem através de boas práticas e segurança."*
