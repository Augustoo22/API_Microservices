import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      {/* Retângulo Vermelho */}
      <div style={styles.redBox}>
        {/* Ícone Home */}
        <div style={styles.iconBox}>
          <img src="home2.png" alt="Início" style={styles.iconImage} />
        </div>

        {/* Ícone Funcionários */}
        <div style={styles.iconBox}>
          <img src="PeopleTeam.png" alt="Funcionários" style={styles.iconImage} />
        </div>

        {/* Ícone Veículos */}
        <div style={styles.iconBox}>
          <img src="Car.png" alt="Veículos" style={styles.iconImage} />
        </div>

        {/* Ícone Clientes */}
        <div style={styles.iconBox}>
          <img src="customerlistsfill.png" alt="Clientes" style={styles.iconImage} />
        </div>

        {/* Ícone Ordem de Serviço */}
        <div style={styles.iconBox}>
          <img src="Notepad.png" alt="Ordem de Serviço" style={styles.iconImage} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {

  },
  redBox: {
    backgroundColor: '#08005B', // Fundo vermelho
    padding: '10px',
    borderRadius: '8px', // Bordas arredondadas
  },
  iconBox: {
    width: '64px', // Largura do ícone
    height: '64px', // Altura do ícone
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Fundo branco para os ícones
    borderRadius: '8px', // Bordas arredondadas nos ícones
    marginBottom: '16px', // Espaçamento entre os ícones
  },
  iconImage: {
    width: '32px', // Largura da imagem do ícone
    height: '32px', // Altura da imagem do ícone
  },
};

export default Sidebar;
