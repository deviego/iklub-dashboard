import React from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
	IconButton,
	Tooltip,
	Button,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import {
	CentralizedCard,
	ICentralizedCardProps,
} from "~/components";
import strings from "~/resources/strings";
import { FetchModelShelf } from "@startapp/mobx-utils";

interface IProps<DataType> extends ICentralizedCardProps {
	fetchModelShelf: FetchModelShelf<DataType>;
	onGoToEdit?: () => void;
	renderItem: (item: DataType) => JSX.Element;
	hasGoBack?: boolean;
}

export const DetailsModelShelf = observer(<DataType, >(props: IProps<DataType>) => {
	const { fetchModelShelf, onGoToEdit, renderItem, hasGoBack, ...restProps } = props;
	const commonStrings = strings.common;

	const history = useHistory();

	const goBack = () => history.goBack();

	return (
		<CentralizedCard
			title={{
				text: commonStrings.detailsTitle,
				helper: onGoToEdit ? (
					<Tooltip label={strings.common.edit}>
						<IconButton
							variant="icon"
							aria-label="Edit"
							size="lg"
							icon={
								<EditIcon
									w="24px"
									h="24px"
									mt={23}
									onClick={onGoToEdit}
								/>
							}
						/>
					</Tooltip>
				) : undefined,
			}}
			button={
				hasGoBack ? (
					<Button
						variant="outline"
						minW={{ base: "100%", md: 280 }}
						size="lg"
						mt={10}
						isLoading={fetchModelShelf.loader.isLoading}
						onClick={goBack}
					>
						{strings.actions.back}
					</Button>
				) : undefined
			}
			{...restProps}
		>
			{fetchModelShelf.model.value && renderItem(fetchModelShelf.model.value)}
		</CentralizedCard>
	);
});
