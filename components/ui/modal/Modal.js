import { useModal } from "@lib/context/ModalContext";
import React from "react";
import SignIn from "./SignIn";

export default function Modal() {
  const { type } = useModal();

  switch (type) {
    case "sign_in":
      return <SignIn />;

    default:
      return null;
  }
}
