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
                localStorage.removeItem("token"); // Remove token inválido
                router.push("/login"); // Redireciona para login
            }
        }

        fetchUsuario();
    }, []);

    return usuario ? (
        <div className="container mt-5">
            <h2 className="text-center">Meu Perfil</h2>
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>E-mail:</strong> {usuario.email}</p>
        </div>
    ) : (
        <p>Carregando...</p>
    );
}
