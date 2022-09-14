import React from "react";
import styles from "./NotFoundBlock.module.scss";

export default function NotFoundBlock() {
	return (
		<h1 className={styles.root}>
			<span>Oops...</span>
			<br />
			Nothing found :(
		</h1>
	);
}
