import React, { useEffect, useState } from "react";
import "./App.css";
import TestNotifcation from "./components/TestNotification";
import "./firebase";
import {
  getAllUnreadNotifications,
  readNotification,
  sendNotification,
} from "./services/notification";
import Notifications from "./components/Notifications";

function App() {
  // for loading state
  const [isLoading, setIsLoading] = useState(false);
  // store for all unread notifications (using this as a state to manage all across app, as app is pretty small)
  const [allUnreadNotifications, setAllUnreadNotifications] = useState<
    { name: string; id: string }[]
  >([]);
  // toggle loading state
  const toggleLoading = (status: boolean) => {
    setIsLoading(status)
  }
  // get all unread when app loads
  useEffect(() => {
    toggleLoading(true)
    fetchNotifications()
    toggleLoading(false)
  }, []);
  // get all unread notifications
  const fetchNotifications = async () => {
    const querySnapshot = await getAllUnreadNotifications();
    const newData = querySnapshot?.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setAllUnreadNotifications(
      newData?.map((val) => {
        // @ts-ignore
        return { id: val.id, name: val.name as string };
      }) || []
    );
  };
  // read handler
  const readNotificationHandler = async (id: string) => {
    toggleLoading(true)
    readNotification(id);
    fetchNotifications();
    toggleLoading(false)
  };
  // add new notifications
  const addNotifications = async (name: string) => {
    toggleLoading(true)
    await sendNotification(name);
    fetchNotifications();
    toggleLoading(false)
  }
  return (
    <div className="App">
      {/* display list of btns */}
      <TestNotifcation isLoading={isLoading} sendNotification={addNotifications} />
      {/* display meaningful msg to let user interact */}
      <br />
      {
        allUnreadNotifications.length === 0 ? 'Click on a btn to add notification!' : 'Click on a notification to read & remove it'
      }
      <div className="notifications-container">
        {/* render all unread notifications */}
      {allUnreadNotifications.map((val, index) => {
        return (
          <Notifications
            key={index}
            name={val.name}
            onClickHandler={() => readNotificationHandler(val.id)}
          />
          
        );
      })}
      </div>
    </div>
  );
}

export default App;
