import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const usuarios = await prisma.usuario.findMany({
    select: {
      nome: true,
      email: true,
      criadoEm: true,
    },
  });

  return Response.json(usuarios);
}
