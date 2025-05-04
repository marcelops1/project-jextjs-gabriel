import Link from 'next/link';

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>Bem-vindo ao Meu Projeto!</h1>
      <p>Explore nosso site utilizando as rotas abaixo.</p>
      <Link href="/sobre" className="btn btn-primary mt-3">Saiba mais</Link>
    </div>
  );
}
