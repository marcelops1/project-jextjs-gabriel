"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Perfil() {
    const [usuario, setUsuario] = useState<{ nome: string; email: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchUsuario() {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Login realizado com sucesso!"); // Mensagem ao logar
                router.push("/login"); // Se não estiver autenticado, redireciona para login
                return;
            }

            const response = await fetch("/api/usuarios", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (response.ok) {
                setUsuario(data);
            } else {
                localStorage.removeItem("token");
                alert("Erro ao carregar perfil. Faça login novamente.");
                router.push("/login");
            }
        }

        fetchUsuario();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove o token
        alert("Logout realizado com sucesso!"); // Mensagem ao deslogar
        router.push("/login"); // Redireciona para login
    };

    return usuario ? (
        <div className="container mt-5">
            <h2 className="text-center">Meu Perfil</h2>
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>E-mail:</strong> {usuario.email}</p>
            <button onClick={handleLogout} className="btn btn-danger mt-3">Sair</button>
        </div>
    ) : (
        <p>Carregando...</p>
    );
}
