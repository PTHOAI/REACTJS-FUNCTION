import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
      <div className="modal-content bg-white p-4 rounded-md shadow-md max-w-xs w-full">
        {/* max-w-xs để giới hạn chiều rộng tối đa */}
        <p className="text-gray-700">Bạn có chắc chắn muốn xóa không?</p>
        <div className="modal-buttons mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
