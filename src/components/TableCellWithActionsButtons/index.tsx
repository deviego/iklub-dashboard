import React from "react";
import {
	Td,
	IconButton,
	Tooltip,
} from "@chakra-ui/react";
import { SearchIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
	BiBlock,
} from "react-icons/bi";
import strings from "~/resources/strings";

interface IProps {
	onDelete?: () => void;
	onView?: () => void;
	onEdit?: () => void;
	onBlock?: () => void;
	isBlocked?: boolean;
}

export const TableCellWithActionButtons: React.FC<IProps> = (props) => {
	const {
		onDelete,
		onView,
		onEdit,
		onBlock,
		isBlocked,
	} = props;

	return (
		<Td display="flex" justifyContent="flex-start" flexDirection="row">
			{onEdit && (
				<Tooltip label={strings.common.edit}>
					<IconButton
						variant="icon"
						color="primary.500"
						aria-label="Edit"
						size="sm"
						icon={<EditIcon />}
						onClick={onEdit}
					/>
				</Tooltip>
			)}
			{
				onDelete
					&&
						<Tooltip label={strings.common.delete}>
							<IconButton
								variant="icon"
								color="gray.500"
								size="sm"
								aria-label="Delete"
								onClick={onDelete}
								icon={<DeleteIcon />}
							/>
						</Tooltip>
			}
			{onView && (
				<Tooltip label={strings.common.details}>
					<IconButton
						variant="icon"
						colorScheme="secondary"
						size="sm"
						aria-label="Search"
						icon={<SearchIcon />}
						onClick={onView}
						color="primary.500"
					/>
				</Tooltip>
			)}
			{
				onBlock
					&&
					(
						isBlocked
							? (
								<Tooltip label={strings.common.enable}>
									<IconButton
										variant="icon"
										color="red"
										size="sm"
										aria-label="Disable"
										onClick={onBlock}
										icon={<BiBlock />}
									/>
								</Tooltip>
							) : (
								<Tooltip label={strings.common.disable}>
									<IconButton
										variant="icon"
										color="green"
										size="sm"
										aria-label="Enable"
										onClick={onBlock}
										icon={<BiBlock />}
									/>
								</Tooltip>
							))
			}
		</Td>
	);
};
