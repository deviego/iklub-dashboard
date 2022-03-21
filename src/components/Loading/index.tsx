import React from "react";
import { observer } from "mobx-react-lite";
import { CircularProgress, CircularProgressProps } from "@chakra-ui/react";

export const Loading: React.FC<CircularProgressProps> = observer((props) => (
	<CircularProgress
		color="secondary.400"
		isIndeterminate
		{...props}
	/>
));
