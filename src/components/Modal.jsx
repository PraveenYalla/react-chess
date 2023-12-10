import React from "react";

function Modal({ open, children }) {
  return (
    // backdrop
    <div
      className={`
        z-50 fixed inset-0 flex justify-center items-center transition-colors
            ${open ? "visible bg-black/80" : "invisible"}
          `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
              shadow p-1 transition-all
              ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
