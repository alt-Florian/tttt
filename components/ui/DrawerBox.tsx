import Form from "@components/forms/examples/Form";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useDrawerBoxStore } from "@stores/Drawerbox.store";
import { ReactElement } from "react";

export interface DrawerBox {
  open?: boolean;
  onClick?: () => void;
  content?: ReactElement;
  size?: "sm" | "md" | "2xl";
  title?: string;
}

interface DrawerBoxProps extends DrawerBox {}

export const DrawerBox: React.FC<DrawerBoxProps> = ({
  open,
  content,
  onClick = () => {}
}) => {
  //const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onClose={onClick}  className="relative z-10">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className={`pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700`}
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
              {content}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export const DrawerBoxLayout: React.FC = () => {
  const { drawerBox, hideDrawerBox } = useDrawerBoxStore();
  return (
    <>
      {drawerBox && (
        <DrawerBox
          {...drawerBox}
          onClick={() => {
            hideDrawerBox();
          }}
        />
      )}
    </>
  );
};

export const DrawerBoxShow: React.FC = () => {
  const { hideDrawerBox, showDrawerBox } = useDrawerBoxStore();

  const openDrawerBox = () => {
    showDrawerBox({
      content: <Form />,
      onClick: hideDrawerBox,
      title: "Drawer test",
    });
  };

  return (
    <>
      <button
        onClick={openDrawerBox}
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
      >
        Mon bouton pour le Drawer
      </button>
    </>
  );
};
