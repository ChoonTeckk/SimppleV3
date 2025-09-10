import { useEffect } from "react";

function useTaskReminder(tasks: any[]) {
  //request browser to allow notifications for this function
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const now = new Date();

      tasks.forEach((task) => {
        if (!task.due_date) return;

        const dueDate = new Date(task.due_date);
        const diffMs = dueDate.getTime() - now.getTime();
        const diffSeconds = Math.floor(diffMs / 1000); // use seconds not miliseconds

        //notfication will only be triggered when the task is due in the next 60 seconds
        if (diffSeconds <= 60 && diffSeconds >= 0) {
          new Notification("⏰ Task Reminder", {
            body: `Task "${task.name}" is due at ${dueDate.toLocaleTimeString()}`,
          });
        }
      });
    }, 30000); //check every 30 seconds to see any task is up

    return () => clearInterval(interval);
  }, [tasks]);
}

export default useTaskReminder;
