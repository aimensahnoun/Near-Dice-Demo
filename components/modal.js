function Modal({ children, showModal, setShowModal }) {
  return (
    <div
      className={`w-screen h-screen bg-modal-bg absolute left-0 top-0  flex items-center justify-center ${
        !showModal && "hidden"
      }`}
    >
      <div className="w-1/2 h-1/2 bg-white shadow-2xl rounded-lg p-5 opacity-100">
        {children}
      </div>
    </div>
  );
}

export default Modal;
