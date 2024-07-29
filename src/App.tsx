import React, { useEffect, useState } from "react";
import "./App.css";
import TestNotifcation from "./components/TestNotification";
import "./firebase";
import {
  getAllNotifications,
  readNotification,
  sendNotification,
} from "./services/notification";
import Notifications from "./components/Notifications";
import { INotification } from "./interfaces/notification";

function App() {
  // for loading state
  const [isLoading, setIsLoading] = useState(false);
  // store for all unread notifications (using this as a state to manage all across app, as app is pretty small)
  const [allUnreadNotifications, setAllUnreadNotifications] = useState<
    INotification[]
  >([]);
  // toggle loading state
  const toggleLoading = (status: boolean) => {
    setIsLoading(status);
  };
  // get all unread when app loads
  useEffect(() => {
    toggleLoading(true);
    fetchNotifications();
    toggleLoading(false);
  }, []);
  // get all unread notifications
  const fetchNotifications = async () => {
    const querySnapshot = await getAllNotifications();
    const newData = querySnapshot?.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setAllUnreadNotifications(newData as INotification[] || []);
  };
  // read handler
  const readNotificationHandler = async (id: string, read: boolean) => {
    if(read) {
      // if already read, do nothing
      return
    }
    toggleLoading(true);
    readNotification(id);
    fetchNotifications();
    toggleLoading(false);
  };
  // add new notifications
  const addNotifications = async (name: string) => {
    toggleLoading(true);
    await sendNotification(name);
    fetchNotifications();
    toggleLoading(false);
  };
  return (
    <div className="App">
      {/* display list of btns */}
      <TestNotifcation
        isLoading={isLoading}
        sendNotification={addNotifications}
      />
      {/* display meaningful msg to let user interact */}
      <br />
      {allUnreadNotifications.length === 0
        ? "Click on a btn to add notification!"
        : "Click on a notification to read it"}
      <div className="notifications-container">
        {/* render all unread notifications */}
        {allUnreadNotifications.map((val, index) => {
          return (
            <Notifications
              read={val.read}
              key={index}
              name={val.name}
              onClickHandler={() => readNotificationHandler(val.id, val.read)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
