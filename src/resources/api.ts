import * as API from "@startapp/iklub-admin-api";

import { LocalizedStringsMethods } from "localized-strings";

const productionUrl = "https://api.iklub.startapp.one/admin";
const stagingUrl = "https://api.iklub.startapp.one/admin";

const bootAPI = (strings: LocalizedStringsMethods) => {
	let apiURL: string;

	switch (process.env.NODE_ENV) {
		case "production": {
			apiURL = productionUrl;
			break;
		}

		case "staging":
		default: {
			apiURL = stagingUrl;
		}
	}

	API.setStrings(strings);
	API.setUrl(apiURL);
};

export default API;

export { bootAPI };
