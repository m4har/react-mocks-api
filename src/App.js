import logo from "./logo.svg";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import useWebSocket from "react-use-websocket";

function App() {
  const [state, setState] = useState([]);
  const [socket, setSocket] = useState("");
  const { readyState, sendMessage, lastMessage } = useWebSocket(
    "wss://echo.websocket.org"
  );
  const asin = useCallback(async () => {
    const response = await Axios.get("https://reqres.in/api/users");
    setState(response.data.data);
  }, [setState]);

  useEffect(() => {
    asin();
  }, [asin]);

  useEffect(() => {
    // 0 & 1
    // send if connect
    if (readyState) {
      sendMessage("hello world");
    }
  }, [readyState, sendMessage]);

  useEffect(() => {
    // frist is null
    if (lastMessage) {
      setSocket(lastMessage.data);
    }
  }, [lastMessage]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <p>data ws : {socket}</p>
        <p>nama</p>
        {state.map((item) => (
          <p key={item.id}>{item.first_name}</p>
        ))}
      </main>
    </div>
  );
}

export default App;
