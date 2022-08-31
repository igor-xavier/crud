import "./styles.css";
function Painel(infos) {
  if (infos.infos.length <= 0) {
    return <h1>Não há dados para mostrar</h1>;
  } else {
    return (
      <ul>
        {infos.infos.map((results) => {
          return (
            <li key={results.id}>
              <h4>Nome: {results.nome}</h4>
              <h4>CPF: {results.cpf}</h4>
              <h4>Senha: {results.senha}</h4>
              <h4>Token: {results.token}</h4>
            </li>
          );
        })}
      </ul>
    );
  }
}
export default Painel;
