import Card from '../../components/card';
import Link from 'next/link';


export default function Cliente() {
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
      href="/clientes/cadastro"
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Card icon="plus.png" text="Novo Cliente" />
    </Link> 
    <Link href="/veiculos/tabela"       style={{
        textDecoration: 'none',
        color: 'inherit',
      }}>
      <Card icon="Notepad.png" text="Gerenciar Clientes" />
    </Link>
    </div>
  );
}
