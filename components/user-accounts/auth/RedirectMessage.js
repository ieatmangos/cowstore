import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useModal } from "@lib/context/ModalContext";
import React from "react";

export default function RedirectMessage() {
  const { setRedirect, redirect } = useModal();

  return (
    <>
      {redirect && (
        <div className="p-4 mt-6 text-sm text-teal-700 rounded-md shadow bg-teal-100/75 ">
          <div className={`flex flex-wrap items-center`}>
            <PaperAirplaneIcon className={`w-8 h-4`} />
            <p>Will continue where you left off</p>
            <p className="mt-1 ml-8 font-medium text-teal-600">{redirect}</p>
          </div>
        </div>
      )}
    </>
  );
}
