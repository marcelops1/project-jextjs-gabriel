import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // 🔥 Correto

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY!; // ⚠️ Certifique-se de ter essa variável no .env

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

        // 🔥 Correção: Gera um JWT válido com o ID do usuário e um tempo de expiração
        const token = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: "1h" });

        return NextResponse.json({ token });
    } catch (error) {
        console.error("Erro na autenticação:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}
