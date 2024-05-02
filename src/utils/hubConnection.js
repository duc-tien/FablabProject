import { HubConnectionBuilder } from "@microsoft/signalr";

const connection = new HubConnectionBuilder() //Lớp tạo một kết nối tới một SignalR Hub
  .withUrl("https://localhost:7112/notificationHub", {})
  .withAutomaticReconnect()
  .build();

const hubConnection = {
  connection,
  start: async () => {
    try {
      if (connection.state === "Disconnected") {
        await connection.start();
        if (connection.state === "Connected") {
          console.log("Connected to websocket server");
        }
      }
      connection.onclose((err) => {
        console.log("Connection close because: " + err);
      });
      return connection;
    } catch (error) {
      console.log("Fail to start connection: " + error);
    }
  },
  stop: () => {
    if (connection.state === "Connected") {
      connection.stop();
    }
  },
};

export default hubConnection;
