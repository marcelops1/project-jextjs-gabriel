"use client";
import { useEffect, useState } from "react";

interface Usuario {
    nome: string;
    email: string;
    criadoEm: string;
}

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        async function fetchUsuarios() {
            const response = await fetch("/api/usuarios");
            const data = await response.json();
            setUsuarios(data);
        }

        fetchUsuarios();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Lista de Usuários Cadastrados</h2>
            <table className="table table-striped mt-4">
                <thead className="table-dark">
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Data de Cadastro</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{new Date(usuario.criadoEm).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
