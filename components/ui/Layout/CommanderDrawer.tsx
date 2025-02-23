import React, { useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import CustomerAddForm from '@components/forms/CustomerAddForm';
import { useModalBoxStore } from '@stores/modalbox.store';

interface CommandOption {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export const CommandDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
 const { hideModalBox, showModalBox } = useModalBoxStore();
  const commandOptions: CommandOption[] = [
    {
      id: 'new-customer',
      label: 'Client',
      action: () => {
       showModalBox({
      content: <CustomerAddForm isCustomer={true} handleClose={hideModalBox} />,
      handleCloseModal: hideModalBox,
       })
        setIsOpen(false);
      }
    },
    {
      id: 'new-contact',
      label: 'Contact',
      action: () => {
       showModalBox({
      content: <CustomerAddForm isCustomer={false} handleClose={hideModalBox} />,
      handleCloseModal: hideModalBox,
       })
        setIsOpen(false);
      }
    },
    {
      id: 'new-missionLetter',
      label: 'Lettre de mission',
      action: () => navigate('/letter-mission/create/step1')
    }
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ouvrir le drawer avec Ctrl+N
      if (event.altKey && event.key === 'n') {
        event.preventDefault();
        setIsOpen(true);
      }

      if (isOpen) {
        // Navigation avec les flèches
        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault();
            setSelectedIndex((prev) => 
              prev > 0 ? prev - 1 : commandOptions.length - 1
            );
            break;
          case 'ArrowDown':
            event.preventDefault();
            setSelectedIndex((prev) => 
              prev < commandOptions.length - 1 ? prev + 1 : 0
            );
            break;
          case 'Enter':
            event.preventDefault();
            handleOptionSelect(commandOptions[selectedIndex]);
            break;
          case 'Escape':
            event.preventDefault();
            setIsOpen(false);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, commandOptions]);

  const handleOptionSelect = (option: CommandOption) => {
    setIsOpen(false);
    option.action();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop
        className="fixed inset-0 bg-gray-900/80"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
            <DialogPanel className="pointer-events-auto w-72">
              <div className="flex h-full flex-col overflow-y-auto bg-gray-900 py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-base font-semibold leading-6 text-white">
                      Commandes rapides
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="relative rounded-md bg-gray-900 text-gray-400 hover:text-gray-500"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="sr-only">Fermer</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <div className="space-y-1">
                    {commandOptions.map((option, index) => (
                      <button
                        key={option.id}
                        className={`group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ${
                          index === selectedIndex
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option.icon && (
                          <option.icon
                            className="mr-3 h-6 w-6 text-gray-400 group-hover:text-white"
                            aria-hidden="true"
                          />
                        )}
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CommandDrawer;