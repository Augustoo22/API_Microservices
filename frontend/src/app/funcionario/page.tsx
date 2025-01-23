import Link from 'next/link';
import Card from '../../components/card';

export default function Funcionario() {
  return (
    <div
      style={{
        backgroundColor: '#E9E9E9',
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0, 
        margin: 0, 
        gap: '80px',
      }}
    >
      <Link
        href="/funcionario/cadastro"
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <Card icon="plus.png" text="Novo Funcionario" />
      </Link> 
      
      <Link
        href="/funcionario/tabela"
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <Card icon="Notepad.png" text="Gerenciar Funcionario" />
      </Link>
      
      <Link
        href="/funcionario/editar"
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <Card icon="unnamed.png" text="Editar Funcionario" />
      </Link>
    </div>
  );
}
