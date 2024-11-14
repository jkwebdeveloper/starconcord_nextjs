import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const SuccessfullModal = () => {
  return (
    <div className="space-y-5 text-center">
      <IoCheckmarkCircleSharp className="text-7xl text-[#00B700] mx-auto" />
      <p className="text-xl font-semibold">
        Your request has been submitted successfully.
      </p>
    </div>
  );
};

export default SuccessfullModal;
