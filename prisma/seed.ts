import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seed iniciado...");

  const senhaCriptografada = await bcrypt.hash("marcelo123", 10);
  console.log("🔒 Senha criptografada:", senhaCriptografada);

  await prisma.usuario.create({
    data: {
      nome: "Marcelo",
      email: "marcelo@teste.local",
      senha: senhaCriptografada,
    },
  });

  console.log("✅ Usuário inserido!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao rodar o Seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
