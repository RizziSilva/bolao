import "./style.scss";

export function BolaoCard({ points, name }) {
  function handleClick() {}

  return (
    <button onClick={handleClick} id="container-bolao-card">
      <span className="title">{name}</span>
      <span className="points">
        {points}
        <span className="text">pontos</span>
      </span>
    </button>
  );
}
