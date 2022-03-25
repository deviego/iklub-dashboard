// import React from "react";
// import { useHistory, useParams } from "react-router-dom";
// import { observer, useLocalObservable } from "mobx-react-lite";
// import {
// 	IconButton,
// 	Tooltip,
// 	Button,
// } from "@chakra-ui/react";
// import {
// 	CentralizedCard,
// 	Loading,
// 	DetailsRow,
// } from "~/components";
// import strings from "~/resources/strings";
// import Store from "./store";
// import { EditIcon } from "@chakra-ui/icons";

// interface IParams {
// 	id?: string;
// }

// const Details: React.FC = () => {
// 	const commonStrings = strings.common;

// 	const { id } = useParams<IParams>();
// 	const history = useHistory();

// 	const store = useLocalObservable(() => new Store(id));

// 	const onGoToEditUser = (userId: string) => history.push(`/dashboard/adminUsers/edit/${userId}`);
// 	const goBack = () => history.goBack();

// 	return (
// 		<CentralizedCard
// 			title={{
// 				text: commonStrings.detailsTitle,
// 				helper: (
// 					<Tooltip label={strings.common.edit}>
// 						<IconButton
// 							variant="icon"
// 							aria-label="Edit"
// 							size="lg"
// 							icon={<EditIcon w="24px" h="24px" />}
// 							onClick={() => onGoToEditUser(id || "")}
// 						/>
// 					</Tooltip>
// 				),
// 			}}
// 			button={(
// 				<Button
// 					variant="outline"
// 					minW={{ base: "100%", md: 280 }}
// 					size="lg"
// 					mt={10}
// 					isLoading={store.loader.isLoading}
// 					onClick={goBack}
// 				>
// 					{strings.actions.back}
// 				</Button>
// 			)}
// 		>
// 			{store.modelShelf.initialLoader.isLoading ?
// 				(
// 					<Loading />
// 				) : (
// 					<>
// 						<DetailsRow
// 							label={commonStrings.fields.name}
// 							value={store.modelShelf._model.name}
// 						/>
// 						<DetailsRow
// 							label={commonStrings.fields.email}
// 							value={store.modelShelf._model.email}
// 						/>
// 					</>
// 				)}
// 		</CentralizedCard>
// 	);
// };

// export default observer(Details);
