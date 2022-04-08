import React from "react";
import {
	Box,
	Image,
	Text,
	Flex,
	FlexProps,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

import api from "~/resources/api";

interface IProps extends FlexProps {
	restaurant: api.Restaurant;
	onClickCard?: (restaurant: api.Restaurant) => void;
	isSelected?: boolean;
}

export const RestaurantCard: React.FC<IProps> = observer((props) => {
	const { restaurant, onClickCard, isSelected , ...rest } = props;

	return (
		<Flex
			h="80px"
			bg="gray.100"
			borderRadius="md"
			borderWidth={isSelected ? 1 : 0}
			borderColor="gray.400"
			cursor="pointer"
			w="100%"
			onClick={onClickCard ? () => onClickCard(restaurant) : undefined}
			{...rest}
		>
			<Box
				bg="gray.300"
				minW="25%"
				maxW="30%"
				h="80px"
				borderRadius="md"
				borderRightRadius={0}
			>
				{restaurant.image && (
					<Image
						src={restaurant.image.url}
						w="100%"
						h="100%"
						borderRadius="md"
						borderRightRadius={0}
					/>
				)}
			</Box>
			<Flex
				p={5}
				w="100%"
				h="80px"
				position="relative"
			>
				<Text fontWeight="bold" size="sm">
					{restaurant.name}
				</Text>
			</Flex>
		</Flex>
	);
});
