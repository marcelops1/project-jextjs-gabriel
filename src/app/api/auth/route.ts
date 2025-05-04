import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, senha } = await req.json();

        const usuario = await prisma.usuario.findUnique({ where: { email } });

        if (!usuario) {
            return NextResponse.json({ error: "Usuário não encontrado!" }, { status: 401 });
        }

        // Compara a senha inserida com a armazenada no banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return NextResponse.json({ error: "Credenciais inválidas!" }, { status: 401 });
        }

        // Gera um token simples (ID do usuário) apenas para identificação mínima
        const token = usuario.id.toString();

        return NextResponse.json({ token });
    } catch (error) {
        console.error("Erro na autenticação:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}
