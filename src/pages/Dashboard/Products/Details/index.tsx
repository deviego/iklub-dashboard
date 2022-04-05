import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import {
	IconButton,
	Tooltip,
	Button,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import {
	CentralizedCard,
	DetailsRow,
} from "~/components";
import strings from "~/resources/strings";
import Store from "./store";
import format from "~/resources/format";

interface IParams {
	id?: string;
}

const Details: React.FC = () => {
	const commonStrings = strings.common;

	const { id } = useParams<IParams>();
	const history = useHistory();

	const store = useLocalObservable(() => new Store(id || ""));

	const onGoToEditUser = (userId: string) => history.push(`/dashboard/restaurants/edit/${userId}`);
	const goBack = () => history.goBack();

	return (
		<CentralizedCard
			title={{
				text: commonStrings.detailsTitle,
				helper: (
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
									onClick={() => onGoToEditUser(id || "")}
								/>
							}
						/>
					</Tooltip>
				),
			}}
			button={(
				<Button
					variant="outline"
					minW={{ base: "100%", md: 280 }}
					size="lg"
					mt={10}
					isLoading={store.loader.isLoading}
					onClick={goBack}
				>
					{strings.actions.back}
				</Button>
			)}
		>
			{store.fetchModelShelf.model.value &&
				<>
					<DetailsRow
						label={commonStrings.fields.title}
						value={store.fetchModelShelf.fetchedModel.title}
					/>
					<DetailsRow
						label={commonStrings.fields.description}
						value={store.fetchModelShelf.fetchedModel.description}
					/>
					<DetailsRow
						label={commonStrings.fields.price}
						value={format.currencyForBR(store.fetchModelShelf.fetchedModel.price)}
					/>
					<DetailsRow
						label={commonStrings.fields.totalAmountOfDoses}
						value={store.fetchModelShelf.fetchedModel.totalNumberOfDoses.toString()}
					/>
					<DetailsRow
						label={commonStrings.fields.createdAt}
						value={format.date(store.fetchModelShelf.fetchedModel.createdAt)}
					/>
				</>}
		</CentralizedCard>
	);
};

export default observer(Details);
