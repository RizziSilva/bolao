import "./style.scss";

export function ConfirmButton({ handleConfirmClick }) {
  function handleClick() {
    if (handleConfirmClick) handleConfirmClick();
  }

  return (
    <div id="confirm-button-component">
      <button className="button" onClick={handleClick}>
        Confirmar
      </button>
    </div>
  );
}
