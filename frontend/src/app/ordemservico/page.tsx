import Card from '../../components/card';
import Link from 'next/link';

export default function Ordemservico() {
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
      <Card icon="plus.png" text="Nova Ordem de Serviço" />
      <Card icon="Notepad.png" text="Gerenciar Ordem de Serviço" />
    </div>
    );
  }
  