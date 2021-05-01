import React, { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { setGameStatus } from "./store/actions/gameActions";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CSGOGSI = require("node-csgo-gsi");

const gsi = new CSGOGSI({ port: 4000 });

const ConnectedApp = () => {
  return (
    <Provider store={store}>
      <Test />
    </Provider>
  );
};

const Test = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((store: any) => store.game);

  useEffect(() => {
    gsi.on("all", (data: any) => {
      dispatch(setGameStatus(data));
    });
  }, [status]);

  return <h2>Hello from React!</h2>;
};

ReactDOM.render(<ConnectedApp />, document.getElementById("root"));
