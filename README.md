# Chatbot com Node.js

Automatiza o pré-atendimento de clínicas médicas

## Descrição

Este projeto implementa um chatbot em Node.js para agilizar o contato inicial de pacientes com a clínica. O chatbot coleta todas as informações essenciais antes do atendimento humano, permitindo que o secretário foque apenas no agendamento da consulta.

## Funcionalidades

* Coletar dados essenciais do paciente
* Responder dúvidas iniciais de forma automática
* Encaminhar informações completas para atendimento humano

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
```

## Uso

* Acesse `http://localhost:<PORT>`
* O chatbot iniciará o pré-atendimento do paciente
* As informações coletadas serão encaminhadas para o atendimento humano

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
