import React from "react";
import { observer } from "mobx-react-lite";
import { Center, IconButton, Image, Tooltip } from "@chakra-ui/react";
import { Loading } from "../Loading";
import strings from "../../resources/strings";
import imagePicker from "../../../static/pick_image.svg";
import { DeleteIcon } from "@chakra-ui/icons";

export interface IProps {
	pickImage?: () => void;
	src: string | null;
	loading?: boolean;
	onDelete?: () => void;
}
export const ImagePicker: React.FC<IProps> = observer((props) => {
	const { pickImage, src, loading, onDelete } = props;

	const componentStrings = strings.components.imagePicker;

	return (
		<Center
			width={120}
			height={120}
			position="relative"
			overflow="hidden"
		>
			{(src && onDelete)&& (
				<IconButton
					position="absolute"
					variant="icon"
					right={1}
					top={1}
					colorScheme="secondary"
					aria-label="Edit"
					size="sm"
					icon={<DeleteIcon />}
					onClick={onDelete}
				/>
			)}
			<Tooltip label={componentStrings.selectAnImage}>
				<Image
					h="100%"
					p={0}
					m={0}
					src={src ? src : imagePicker}
					onClick={pickImage}
					fallbackSrc={imagePicker}
					rounded="lg"
					cursor="pointer"
					__css={{ filter: loading && "brightness(0.5)" }}
				/>
			</Tooltip>
			{loading && (
				<Loading
					position="absolute"
				/>
			)}
		</Center>
	);
});
