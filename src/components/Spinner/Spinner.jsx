import React from "react";
import "./style.css";

export default function Spinner() {
	return (
		<div className="container-fixed">
			<div className="custom-spinner"></div>
			<h3>Loading...</h3>
		</div>
	);
}
