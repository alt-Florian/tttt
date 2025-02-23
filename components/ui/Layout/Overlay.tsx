import { DrawerBoxLayout } from "../DrawerBox";
import { ModalBoxLayout } from "../ModalBox";
import { DialogBoxLayout } from "../Notification/DialogBox";


export default function Overlays() {
  return (
    <>
      <ModalBoxLayout />
      <DrawerBoxLayout/>
      <DialogBoxLayout />
    </>
  );
}
