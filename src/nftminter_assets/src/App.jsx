import React from "react";

// components
import Plug from "./Plug";

const App = ({ nftminter }) => {
	return (
		<div>
			<h1>App</h1>
			<p>
				Core project for the{" "}
				<a href="https://github.com/motoko-bootcamp/bootcamp" rel="noreferrer noopener" target="_blank">
					Motoko Bootcamp
				</a>
			</p>
			<Plug nftminter={nftminter} />
		</div>
	);
};

export default App;
