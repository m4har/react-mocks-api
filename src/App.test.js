import { render, act } from "@testing-library/react";
import App from "./App";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ws from "jest-websocket-mock";

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

describe("test", () => {
  const server = new ws("wss://echo.websocket.org");
  const mock = new MockAdapter(Axios);

  test("renders learn react link", async () => {
    // mock axios rest api
    mock.onGet("https://reqres.in/api/users").reply(200, {
      data: [{ id: 1, first_name: "mocking from jest" }],
    });
    // render
    const { container } = render(<App />);
    // mock websocket server
    await server.connected;
    server.send("hello from jest");
    // act promise
    await whenStable();
    // snapshot
    expect(container).toMatchSnapshot();
    ws.clean();
    mock.reset();
  });
});
