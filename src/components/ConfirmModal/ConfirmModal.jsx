import { useEffect } from "react";
import "./ConfirmModal.css";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function ConfirmModal({
  isOpen,
  title = "Confirmation de suppression",
  message = "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.",
  confirmText = "Supprimer",
  cancelText = "Annuler",
  onConfirm,
  onClose,
  isLoading = false,
  itemName = null,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay" onClick={!isLoading ? onClose : undefined}>
      <div
        className="confirm-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="confirm-modal-close-btn"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Fermer"
        >
          <CloseRoundedIcon fontSize="small" />
        </button>

        <div className="confirm-modal-icon-wrapper">
          <div className="confirm-modal-icon">
            <DeleteOutlineRoundedIcon />
          </div>
        </div>

        <div className="confirm-modal-body">
          <h3 className="confirm-modal-title">{title}</h3>
          <p className="confirm-modal-message">
            {message}
            {itemName && (
              <span className="confirm-modal-item-name">
                <br />
                <strong>« {itemName} »</strong>
              </span>
            )}
          </p>
        </div>

        <div className="confirm-modal-actions">
          <button
            type="button"
            className="confirm-modal-btn confirm-modal-btn-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="confirm-modal-btn confirm-modal-btn-danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="confirm-modal-spinner"></span>
            ) : (
              <DeleteOutlineRoundedIcon fontSize="small" />
            )}
            <span>{isLoading ? "Suppression..." : confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
