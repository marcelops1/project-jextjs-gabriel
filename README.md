# 🚀 Meu Projeto Next.js

Este é um projeto baseado em **Next.js** que utiliza **Prisma**, **PostgreSQL** e **JWT** para autenticação. Siga as instruções abaixo para configurar e rodar o projeto corretamente.  

---

## 📥 Clonando o Repositório

Para começar, clone o repositório do GitHub:

```sh
git clone https://github.com/seu-usuario/meu-projeto-next.git
cd meu-projeto-next

# Configuração do banco de dados (PostgreSQL)
DATABASE_URL="postgresql://usuario:senha@localhost:5432/meu_banco"

# Chave secreta para JWT
SECRET_KEY="sua_chave_secreta_super_segura"

# Configuração do banco de dados (PostgreSQL)

DATABASE_URL="file:./prisma/dev.db"

# Chave secreta para JWT
SECRET_KEY=e2f306a5229502521b667e0431fd8d072dd68b417296463a65b708c2b1ff9160

npm install

yarn install

npx prisma migrate dev --name inicial

npx prisma db seed

npm run dev

yarn dev

🐞 Solução de Problemas
🔴 Erro: Cannot find module 'jsonwebtoken'
Se este erro aparecer, reinstale o pacote:

npm install jsonwebtoken @types/jsonwebtoken --save-dev