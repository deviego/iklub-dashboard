import React from "react";
import {
	Td,
	IconButton,
	Tooltip,
} from "@chakra-ui/react";
import {
	BiBlock,
} from "react-icons/bi";
import { SearchIcon, EditIcon, DeleteIcon, CheckIcon, CloseIcon} from "@chakra-ui/icons";
import strings from "~/resources/strings";

interface IProps {
	onDelete?: () => void;
	onView?: () => void;
	onEdit?: () => void;
	onBlock?: () => void;
	onApprove?: () => void;
	onRefuse?: () => void;
	isBlocked?: boolean;
}

export const TableCellWithActionButtons: React.FC<IProps> = (props) => {
	const {
		onDelete,
		onView,
		onEdit,
		onBlock,
		onApprove,
		onRefuse,
		isBlocked,
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
			{onApprove && (
				<Tooltip label={strings.common.approveToolTip}>
					<IconButton
						variant="icon"
						color="green.500"
						size="sm"
						aria-label="Approve"
						icon={<CheckIcon />}
						onClick={onApprove}
					/>
				</Tooltip>
			)}
			{onRefuse && (
				<Tooltip label={strings.common.refuseToolTip}>
					<IconButton
						variant="icon"
						color="red.500"
						size="sm"
						aria-label="Refuse"
						icon={<CloseIcon />}
						onClick={onRefuse}
					/>
				</Tooltip>
			)}
		</Td>
	);
};
