import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from "@headlessui/react";
import { Transition } from "@headlessui/react"; // Importer Transition
import { FeedBackBox } from "@components/feedBack/FeedBackBox";
import { ModalBoxInterface } from "@interfaces/boxes/ModalBox.interface";
import { feedBackService } from "@services/FeedBack.service";
import { useModalBoxStore } from "@stores/modalbox.store";
import React from "react";

export const ModalBox: React.FC<ModalBoxInterface> = ({
  open,
  content,
 
}) => {
  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog
        onClose={() => {}} // Désactive la fermeture automatique
        className="relative z-50"
      >
        <TransitionChild
          as={React.Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        </TransitionChild>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={React.Fragment}
              enter="transition-transform duration-300"
              enterFrom="translate-y-4 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transition-transform duration-300"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-4 opacity-0"
            >
              <DialogPanel className="relative transform w-auto min-w-[500px] overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl">
                {content}
              
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const ModalBoxLayout: React.FC = () => {
  const { modalBox, hideModalBox } = useModalBoxStore();
  return (
    <>
      {modalBox && (
        <ModalBox
          {...modalBox}
          handleCloseModal={() => {
            hideModalBox();
          }}
        />
      )}
    </>
  );
};

export const ModalBoxShow: React.FC = () => {
  const { hideModalBox, showModalBox } = useModalBoxStore();

  const openModalBox = () => {
    showModalBox({
      content: (
        <FeedBackBox
          {...feedBackService.updateConfirmation()}
          handleClose={hideModalBox}
          handleSubmit={hideModalBox}
        />
      ),
      handleCloseModal: hideModalBox,
    });
  };

  return (
    <>
      <button
        onClick={openModalBox}
        className="mx-3 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
      >
        Mon bouton pour la modal
      </button>
    </>
  );
};