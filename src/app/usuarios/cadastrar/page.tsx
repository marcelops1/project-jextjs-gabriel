"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Registro() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch("/api/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            router.push("/usuarios/listar"); // Redireciona para a listagem de usuários
        } else {
            alert("Erro ao cadastrar usuário. Tente novamente.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Registro de Usuário</h2>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        className="form-control"
                        placeholder="Digite seu nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Digite seu e-mail"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input
                        type="password"
                        name="senha"
                        className="form-control"
                        placeholder="Digite sua senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>
        </div>
    );
}
