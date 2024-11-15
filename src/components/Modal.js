import React from 'react';

function Modal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 xl:w-full xsm:w-[320px] xs:w-[375px] xss:w-[414px] iphone12:w-[390px] iphone14:w-[430px] pixel7:w-[412px] gals8:w-[360px] galaxyz:w-[344px] mxs:w-[425px]">
      <div className="bg-white p-6 rounded-lg shadow-lg xl:w-[450px] xsm:w-[250px] ">
        <p className="xl:text-lg xsm:text-[12px] font-semibold text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 text-gray-800 xl:px-4 xl:py-2 xsm:px-3 xsm:py-[5px] xl:text-lg xsm:text-xs rounded-lg hover:bg-gray-400"
            onClick={onCancel}
          >
            No
          </button>
          <button
            className="bg-red-500 text-white  xl:px-4 xl:py-2 xsm:px-3 xsm:py-[5px] xl:text-lg xsm:text-xs rounded-lg hover:bg-red-600"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
