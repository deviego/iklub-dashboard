import React from "react";
import { observer } from "mobx-react-lite";
import { BoxProps, Center, Box } from "@chakra-ui/layout";
import { Loading } from "..";

export interface IProps extends BoxProps {
	loading?: boolean;
	loadingComponent?: React.ReactElement;
}

export const Fetchable: React.FC<IProps> = observer((props) => {
	const { loading, loadingComponent, children, ...rest } = props;

	return (
		<Box {...rest}>
			{
				loading
					? loadingComponent
						|| (
							<Center alignSelf="center" w="100%">
								<Loading />
							</Center>
						)
					: children
			}
		</Box>
	);
});
