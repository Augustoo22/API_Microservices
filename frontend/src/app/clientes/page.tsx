import Card from '../../components/card';

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
      <Card icon="plus.png" text="Novo Cliente" />
      <Card icon="Notepad.png" text="Gerenciar Clientes" />
    </div>
  );
}
