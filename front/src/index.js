import React from "react";
// import ReactDOM from "react-dom/client";
import { render } from "react-dom"; //<- react 17 This is the correct import
import "./index.css";
import App from "./App";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
// 	<React.StrictMode>
// 		<Provider store={store}>
// 			<App />
// 		</Provider>
// 	</React.StrictMode>
// );
const root = document.getElementById("root"); // <- This is the //correct method call for React version 17
render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	root
);
