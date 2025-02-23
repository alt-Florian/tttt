import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon
} from "@heroicons/react/20/solid";

import { ReactElement, useState } from "react";

interface AlertProps {
  title: string;
  content?: string;
  onClick?: () => void;
  icon?: ReactElement;
  color?: string;
  bgColor?: string;
  textColor?: string;
  iconColor?: string;
  contentLink?: string;
  targetLink?: string;
  contentsList?: string[];
}

export const AlertSimple: React.FC<AlertProps> = (props) => {
  const { title, content, icon, color, targetLink, contentLink } = props;
  return (
    <div className={`rounded-md bg-${color}-50 p-4`}>
      <div className="flex">
        <div
          aria-hidden="true"
          className={`shrink-0 size-5 text-${color}-400 `}
        >
          {icon}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium text-${color}-700`}>{title}</h3>
          <div className={`mt-2 text-sm text-${color}-400`}>{content}</div>
          <a
            href={targetLink}
            className="font-medium text-yellow-700 underline hover:text-yellow-600"
          >
            {contentLink}
          </a>
        </div>
      </div>
    </div>
  );
};

export const AlertWithList: React.FC<AlertProps> = (props) => {
  const { title, icon, color, contentsList } = props;
  return (
    <div className={`rounded-md bg-${color}-50 p-4`}>
      <div className="flex">
        <div
          aria-hidden="true"
          className={`shrink-0 size-5 text-${color}-500 `}
        >
          {icon}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium text-${color}-700`}>{title}</h3>
          <div className={`mt-2 text-sm text-${color}-500`}>
            <ul role="list" className="list-disc space-y-1 pl-5">
              {contentsList?.map((content, index) => (
                <li key={index}>{content}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AlertWithDismissButton: React.FC<AlertProps> = (props) => {
  const { title, content, onClick, icon, color } = props;
  return (
    <div className={`rounded-md bg-${color}-50 p-4`}>
      <div className="flex">
        <div aria-hidden="true" className={`shrink-0 size-5 text-${color}-400`}>
          {icon}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium text-${color}-700`}>{title}</h3>
          <div className={`mt-2 text-sm text-${color}-400`}>{content}</div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={onClick}
              type="button"
              className={`inline-flex rounded-md bg-${color}-50 p-1.5 text-${color}-500 hover:bg-${color}-100 focus:outline-none focus:ring-2 focus:ring-${color}-600 focus:ring-offset-2 focus:ring-offset-${color}-50`}
            >
              <XMarkIcon aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AlertShow: React.FC = () => {
  const alerts: AlertProps[] = [
    {
      title: "Alert message simple",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: <InformationCircleIcon />,
      color: "blue"
    },
    {
      title: "Alert message simple",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: <CheckCircleIcon />,
      color: "green"
    }
  ];

  const alertWithList: AlertProps[] = [
    {
      title: "Alert message with list",
      icon: <XCircleIcon />,
      color: "red",
      contentsList: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      ]
    }
  ];

  const [open, setOpen] = useState(true);

  const alertWithDissmissButton: AlertProps[] = [
    {
      title: "Alert message with list",
      icon: <CheckCircleIcon />,
      color: "green",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      onClick: () => setOpen(false),
    }
  ];

  return (
    <div>
      <section id="alert" className="flex gap-4 mb-3">
        {alerts.map((alert: AlertProps, index: number) => (
          <AlertSimple
            key={index}
            title={alert.title}
            content={alert.content}
            icon={alert.icon}
            color={alert.color}
          />
        ))}
      </section>
      <section id="alert" className="flex gap-4 mb-3">
        {alertWithList.map((alert: AlertProps, index: number) => (
          <AlertWithList
            key={index}
            title={alert.title}
            contentsList={alert.contentsList}
            icon={alert.icon}
            color={alert.color}
          />
        ))}
      </section>
      <section id="alert" className="flex  gap-4">
      {open && (
        alertWithDissmissButton.map((alert: AlertProps, index: number) => (
          <AlertWithDismissButton
            key={index}
            title={alert.title}
            content={alert.content}
            icon={alert.icon}
            color={alert.color}
            onClick={alert.onClick}
          />
        ))
      )}

      
        
      </section>
    </div>
  );
};
