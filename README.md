# Chatbot com Node.js

Automatização de atendimento para clínica médica

## Descrição

Este projeto implementa um chatbot em Node.js para auxiliar a secretaria de uma clínica médica. Ele responde a perguntas frequentes, agenda consultas e encaminha para atendente humano quando necessário.

## Funcionalidades

* Processar mensagens de usuários
* Gerar respostas automáticas
* Encaminhar para atendente humano
* Integração com sistemas da clínica
* Registro de interações

## Tecnologias

* Node.js
* npm ou yarn

## Requisitos

* Node.js 18 ou superior
* npm ou yarn instalado
* Variáveis de ambiente configuradas

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/bertoluciartur/Chatbot-com-Node.js.git
cd Chatbot-com-Node.js
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente (arquivo `.env`).
4. Inicie a aplicação:

```bash
npm start
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
PORT=3000
API_KEY_CHATBOT=seu_token_aqui
DB_HOST=localhost
DB_USER=usuario
DB_PASS=senha
```

## Uso

* Acesse `http://localhost:<PORT>`
* Envie mensagens como "Olá" ou "Agendar consulta"
* O chatbot responderá ou encaminhará conforme a lógica implementada

## Estrutura do Projeto

```
/
│  chatbot.js
│  package.json
│  .env.example
│  README.md
│  ... (controllers, services, routes)
```

Artur Bertoluci — [GitHub](https://github.com/bertoluciartur)
