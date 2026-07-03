import "./style.scss";

export function ConfirmButton({ handleConfirmClick, disabled = false }) {
  function handleClick() {
    if (handleConfirmClick) handleConfirmClick();
  }

  return (
    <div id="confirm-button-component">
      <button disabled={disabled} className="button" onClick={handleClick}>
        Confirmar
      </button>
    </div>
  );
}
