import React from "react";
import { useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";

import { DetailsModelShelf, DetailsRow } from "~/components";
import Store from "./store";
import strings from "~/resources/strings";
import format from "~/resources/format";
import api from "~/resources/api";

interface IParams {
	id?: string;
}

const Details: React.FC = () => {

	const commonStrings = strings.common;

	const { id } = useParams<IParams>();

	const store = useLocalObservable(() => new Store(id || ""));

	return (
		<DetailsModelShelf
			fetchModelShelf={store.fetchModelShelf}
			hasGoBack
			renderItem={(item) => (
				<>
					<DetailsRow
						label={commonStrings.fields.amount}
						value={item.amount}
					/>
					<DetailsRow
						label={commonStrings.fields.status}
						value={api.translateConsumptionStatus(item.status)}
					/>
					<DetailsRow
						label={commonStrings.fields.requestedAt}
						value={format.date(item.createdAt)}
					/>
					{item.acceptedAt && (
						<DetailsRow
							label={commonStrings.fields.approvedAt}
							value={format.date(item.acceptedAt)}
						/>
					)}
				</>
			)}
		/>
	);
};

export default observer(Details);
