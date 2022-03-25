import React from "react";
import {
	Td,
	IconButton,
	Tooltip,
} from "@chakra-ui/react";
import { SearchIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import strings from "~/resources/strings";

interface IProps {
	onDelete?: () => void;
	onView?: () => void;
	onEdit?: () => void;
}

export const TableCellWithActionButtons: React.FC<IProps> = (props) => {
	const {
		onDelete,
		onView,
		onEdit,
	} = props;

	return (
		<Td display="flex" justifyContent="flex-end" flexDirection="row">
			{onView && (
				<Tooltip label={strings.common.details}>
					<IconButton
						variant="icon"
						colorScheme="secondary"
						size="sm"
						aria-label="Search"
						icon={<SearchIcon />}
						onClick={onView}
					/>
				</Tooltip>
			)}
			{onEdit && (
				<Tooltip label={strings.common.edit}>
					<IconButton
						variant="icon"
						colorScheme="secondary"
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
								colorScheme="secondary"
								size="sm"
								aria-label="Delete"
								onClick={onDelete}
								icon={<DeleteIcon />}
							/>
						</Tooltip>
			}
		</Td>
	);
};
