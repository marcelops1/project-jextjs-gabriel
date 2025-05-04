import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY!;

export async function GET(req: Request) {
    try {        
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const email = searchParams.get("email");
        
        if (id) {
            // Buscar usuário por ID
            const usuario = await prisma.usuario.findUnique({
                where: { id: parseInt(id) },
                select: { nome: true, email: true },
            });

            if (!usuario) {
                return NextResponse.json({ error: "Usuário não encontrado!" }, { status: 404 });
            }

            return NextResponse.json(usuario);
        }

        if (email) {
            // Buscar usuário por Email
            const usuario = await prisma.usuario.findUnique({
                where: { email },
                select: { nome: true, email: true },
            });

            if (!usuario) {
                return NextResponse.json({ error: "Usuário não encontrado!" }, { status: 404 });
            }

            return NextResponse.json(usuario);
        }

        // Caso não haja ID ou email, verifica autenticação via token
        const token = req.headers.get("Authorization")?.split(" ")[1];
        console.log("Token recebido:", token);
        if (!token) {
            return NextResponse.json({ error: "Token não fornecido!" }, { status: 401 });
        }

        const decoded = jwt.verify(token, SECRET_KEY) as { id: number };

        const usuarioAutenticado = await prisma.usuario.findUnique({
            where: { id: decoded.id },
            select: { nome: true, email: true },
        });

        if (!usuarioAutenticado) {
            return NextResponse.json({ error: "Usuário autenticado não encontrado!" }, { status: 404 });
        }

        return NextResponse.json(usuarioAutenticado);
    } catch (error) {
        console.error("Erro ao recuperar usuários:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
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
