"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", senha: "" });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token); // Armazena token
            alert("Login realizado com sucesso!"); // 🔥 Mensagem de sucesso ao logar
            router.push("/usuarios/perfil"); // Redireciona para listagem
        } else {
            alert(data.error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit} className="mt-4">
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
                <button type="submit" className="btn btn-primary w-100">Entrar</button>
            </form>
        </div>
    );
}
