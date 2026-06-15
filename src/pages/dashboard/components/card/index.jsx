import "./style.scss";

export function Card({ color, title, description, score }) {
  return (
    <div id="container-card">
      <div className={`border ${color}`} />
      <span className="title">{title}</span>
      <span className="points">{score}</span>
      <span className="description">{description}</span>
    </div>
  );
}
