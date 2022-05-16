import React from "react";
import { observer } from "mobx-react-lite";
import { Image } from "@chakra-ui/react";

interface IProps{
	width?: string | number;
	height?: string | number;
}

export const Logo: React.FC<IProps> = observer((props) => {
	const { width, height } = props;
	return (
		<Image
			src="/logo_squared.svg"
			w={width || "13rem"}
			h={height || "3.5rem"}
		/>
	);
});
