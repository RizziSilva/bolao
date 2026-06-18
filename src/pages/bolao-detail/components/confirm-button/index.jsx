import "./style.scss";

export function ConfirmButton() {
  function handleClick() {}

  return (
    <div id="confirm-button-component">
      <button className="button" onClick={handleClick}>
        Confirmar
      </button>
    </div>
  );
}
