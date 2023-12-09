import React from "react";
import { CgCloseO } from "react-icons/cg";

function Modal({ open, onClose, children }) {
  return (
    // backdrop
    <div
      className={`
            fixed inset-0 flex justify-center items-center transition-colors
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
        {/* <button
          onClick={onClose}
          className="absolute -top-1 -right-1 p-1 rounded-lg text-gray-400   hover:text-gray-600"
        >
          <CgCloseO />
        </button> */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
