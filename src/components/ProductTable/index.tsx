import React from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { PaginatedListShelf } from "@startapp/mobx-utils";
import { Flex, Td, Text, Tr, FlexProps, BoxProps } from "@chakra-ui/react";

import { Table, TableCellWithActionButtons } from "~/components";

import { useGlobalStore } from "~/contexts/useGlobalContext";

import format from "~/resources/format";
import strings from "~/resources/strings";
import API from "~/resources/api";

interface IProps extends FlexProps {
	paginatedListShelf: PaginatedListShelf<API.Product>;
	deleteProduct?: (id: string) => Promise<void>;
	renderRow?: (item: API.Product, index: number) => React.ReactElement | null;
	changeDisableStatus?: (id: string, disableAt: Date | null) => Promise<void>;
	cardTableProps?: BoxProps;
	redirectTo?: {
		create?: () => string;
		edit?: (id?: string) => string;
		details?: (id?: string) => string;
	};
}

export const ProductTable: React.FC<IProps> = observer((props) => {
	const {
		paginatedListShelf,
		deleteProduct,
		changeDisableStatus,
		cardTableProps,
		renderRow,
		redirectTo,
		...rest
	} = props;
	const componentStrings = strings.products.table;
	const modal = strings.common.modal;
	const { dialog } = useGlobalStore();

	const history = useHistory();

	const onDeleteProduct = (id: string) => {
		if (deleteProduct) {
			deleteProduct(id);
		}
		dialog.closeDialog();
	};

	const onGoToEditProduct = (id: string) => {
		if (redirectTo?.edit) {
			history.push(redirectTo.edit(id));
		}
	};
	const onGoToDetailsProduct = (id: string) => {
		if (redirectTo?.details) {
			history.push(redirectTo.details(id));
		}
	};
	const onGoToCreateProduct = () => {
		if (redirectTo?.create) {
			history.push(redirectTo.create());
		}
	};

	const openDialog = (user: API.Product) => {
		dialog.showDialog({
			title: modal.title,
			closeOnOverlayClick: true,
			description: modal.description(user.title),
			buttons: [
				{
					title: modal.button.delete,
					onPress: () => onDeleteProduct(user.id),
					buttonProps: { bg: "red.500" },
				},
				{
					title: modal.button.cancel,
					onPress: () => dialog.closeDialog(),
					outlined: true,
				},
			],
		});
	};

	const openDialogDisableStatusProduct = (product: API.Product) => {
		const productModalStrings = strings.products.modal;
		dialog.showDialog({
			title: productModalStrings.title(!!product.disabledAt),
			closeOnOverlayClick: true,
			description: productModalStrings.description(product.title, !!product.disabledAt),
			buttons: [
				{
					title: product.disabledAt ?  productModalStrings.button.enable :  productModalStrings.button.disable,
					onPress: () => {
						if (changeDisableStatus) {
							changeDisableStatus(product.id, product.disabledAt);
						}
						dialog.closeDialog();
					},
					buttonProps: { bg: product.disabledAt ? "green.500" : "red.500" },
				},
				{
					title: productModalStrings.button.cancel,
					onPress: () => dialog.closeDialog(),
					outlined: true,
				},
			],
		});
	};

	return (
		<Flex flexDir="column" p={{ base: "2", lg: "16" }} {...rest}>
			<Table
				data={paginatedListShelf.items}
				headers={componentStrings.header}
				{...redirectTo && redirectTo.create && {onAdd: onGoToCreateProduct}}
				addButtonText={componentStrings.addButtonText}
				renderRow={renderRow || ((item) => (
					<Tr key={item.id}>
						<TableCellWithActionButtons
							{...redirectTo?.details && {onView: () => onGoToDetailsProduct(item.id)}}
							{...redirectTo?.edit && {onEdit: () => onGoToEditProduct(item.id)}}
							onDelete={deleteProduct ? () => openDialog(item) : undefined}
							onBlock={changeDisableStatus ? () => openDialogDisableStatusProduct(item) : undefined}
							isBlocked={!!item.disabledAt}
						/>
						<Td>
							<Text>{item.title}</Text>
						</Td>
						<Td>
							<Text>{format.currencyForBR(item.price)}</Text>
						</Td>
						<Td>
							<Text>{item.totalNumberOfDoses}</Text>
						</Td>
						<Td>
							{item.createdAt && <Text>{format.date(item.createdAt)}</Text>}
						</Td>
					</Tr>
				))}
				loading={paginatedListShelf.loader.isLoading}
				emptyMessage={strings.common.noResutls}
				currentPage={paginatedListShelf.page}
				prevPage={paginatedListShelf.previousPage}
				nextPage={paginatedListShelf.nextPage}
				hasNextPage={paginatedListShelf.hasNextPage}
				{...cardTableProps}
			/>
		</Flex>
	);
});
