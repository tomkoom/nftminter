import React from "react";
import { render } from "react-dom";
import { nftminter } from "../../declarations/nftminter";
import App from "./App";
import "../assets/main.css";

const Index = () => {
	return (
		<div className="app">
			<App nftminter={nftminter} />
		</div>
	);
};

document.title = "nftminter";

render(<Index />, document.getElementById("app"));
