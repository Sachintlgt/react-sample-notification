import { ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonComponent from "./ButtonComponent";

const TestNotifcation: React.FC<{
  sendNotification: Function;
  isLoading: boolean;
}> = ({ isLoading, sendNotification }) => {
  // handler for btn click
  const sendNotificationHandler = async (name: string) => {
    sendNotification(name);
  };
  // list of notification btns
  const buttons = [
    {
      title: "Notification 1",
      onClick: () => {
        sendNotificationHandler("notification 1");
      },
      className: "mx-2",
    },
    {
      title: "Notification 2",
      onClick: () => {
        sendNotificationHandler("notification 2");
      },
      className: "mx-2",
    },
    {
      title: "Notification 3",
      onClick: () => {
        sendNotificationHandler("notification 3");
      },
      className: "mx-2",
    },
  ];
  return (
    <ButtonGroup className="my-5">
      {buttons.map((val, index) => {
        return (
          <ButtonComponent
            isLoading={isLoading}
            key={index}
            className={val.className}
            title={val.title}
            onClick={val.onClick}
          ></ButtonComponent>
        );
      })}
    </ButtonGroup>
  );
};
export default TestNotifcation;
