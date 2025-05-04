import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET() {
    const usuarios = await prisma.usuario.findMany({
        select: {
            nome: true,
            email: true,
            criadoEm: true,
        },
    });

    return NextResponse.json(usuarios);
}

export async function POST(req: Request) {
    try {
        const { nome, email, senha } = await req.json();

        // Verifica se o email já existe no banco
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email },
        });

        if (usuarioExistente) {
            return NextResponse.json({ error: "Email já cadastrado!" }, { status: 400 });
        }

        // Criptografa a senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Cria o usuário no banco
        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaHash,
            },
        });

        return NextResponse.json(novoUsuario, { status: 201 });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}
