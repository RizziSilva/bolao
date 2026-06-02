import "./style.scss";

export function Card({ color, title, description }) {
  const points = 0;

  return (
    <div id="container-card">
      <div className={`border ${color}`} />
      <span className="title">{title}</span>
      <span className="points">{points}</span>
      <span className="description">{description}</span>
    </div>
  );
}
