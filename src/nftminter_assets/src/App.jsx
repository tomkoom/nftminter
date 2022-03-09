import React from "react";

// components
import Contacts from "./Contacts";
import PlugSignIn from "./PlugSignIn";
import WhoAmI from "./WhoAmI";

const App = ({ nftminter }) => {
	return (
		<div>
			<h1>App</h1>
			<p>
				Core project for the{" "}
				<a href="https://github.com/motoko-bootcamp/bootcamp" rel="noreferrer noopener" target="_blank">
					Motoko Bootcamp
				</a>
				.
			</p>
			<WhoAmI nftminter={nftminter} />
			{/* <Contacts nftminter={nftminter} /> */}
			<PlugSignIn nftminter={nftminter} />
		</div>
	);
};

export default App;
