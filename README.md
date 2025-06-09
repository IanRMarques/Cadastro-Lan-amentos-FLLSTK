# Sistema de Cadastro e Visualização de Lançamentos

Este é um projeto de uma aplicação **full-stack** para cadastro e visualização de lançamentos financeiros (créditos e débitos), utilizando as seguintes tecnologias:

- **Frontend**: React com TypeScript
- **Backend**: Express com TypeScript
- **Banco de Dados**: PostgreSQL com TypeORM

## Funcionalidades

### Cadastro de Lançamentos

A aplicação permite que o usuário cadastre lançamentos financeiros com as seguintes informações:

- **Data do Lançamento** (formato: DD/MM/AAAA)
- **Descrição do Lançamento**
- **Valor do Lançamento** (deve ser um número positivo)
- **Tipo de Lançamento** (Crédito ou Débito)

#### Validações:

- **Data**: A data deve estar no formato **DD/MM/AAAA**. Exemplo: `09/06/2025`.
- **Valor**: O valor deve ser um número positivo. O sistema rejeita valores negativos ou zero.
- **Tipo de Lançamento**: O tipo de lançamento deve ser **Crédito** ou **Débito**.

### Visualização dos Lançamentos

Após o cadastro dos lançamentos, o sistema exibe uma tabela contendo todos os lançamentos cadastrados, organizada por **mês e ano**.

A tabela exibe as seguintes colunas:
- **Data**: A data do lançamento.
- **Descrição**: A descrição fornecida no cadastro.
- **Valor**: O valor do lançamento.
- **Tipo**: O tipo do lançamento (Crédito ou Débito).

#### Totais Mensais:
- Ao final de cada mês, os totais de **Créditos** e **Débitos** serão exibidos na tabela.

## Tecnologias Utilizadas

- **Frontend**:
  - **React**: Framework para construir a interface de usuário.
  - **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática.
  - **CSS** (ou **Tailwind CSS**, se preferir): Para estilização da interface.

- **Backend**:
  - **Express**: Framework para construir a API RESTful.
  - **TypeScript**: Para maior segurança e facilidade de manutenção.
  - **TypeORM**: ORM para interagir com o banco de dados PostgreSQL.
  - **PostgreSQL**: Banco de dados relacional.

## Como Rodar o Projeto

### 1. **Instalação das Dependências**

#### Frontend

1. Navegue até a pasta do frontend:

   ```bash
   cd client

2. Instale as dependências:

   ```bash
    npm install
  
3. Rode o servidor de desenvolvimento:
   
   ```bash
    npm run dev
#### Backend

4. Navegue até a pasta do frontend:

   ```bash
   cd server

5. Instale as dependências:

   ```bash
    npm install

6. Rode o servidor de desenvolvimento:

   ```bash
    npm run dev

Telas do projeto:
![image](https://github.com/user-attachments/assets/ed6b60aa-eea9-4140-87d7-32c5e539de7f)

![image](https://github.com/user-attachments/assets/55f2e2e5-cd58-4c5e-a9df-602f262d7061)

![image](https://github.com/user-attachments/assets/92f0da39-0f39-410d-a664-e225d909af45)
OBS: Valor na tabela colocado de exemplo para melhor entendimento das funções.

Aplicação rodando: (Valores utilizados para teste e exemplos)
![image](https://github.com/user-attachments/assets/3dae3f9d-97d7-4287-8ad4-cc77a18e2181)

![image](https://github.com/user-attachments/assets/2d6af9f7-04c9-48a0-8b81-004d5ea3e9af)



