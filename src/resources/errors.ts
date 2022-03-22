/* eslint-disable no-console */
import API from "./api";
import { inspect } from "util";
import Strings from "./strings";
import { CustomError }  from "./customError";

export interface IError {
	type: API.ErrorType;
	message: string;
}

export const Errors = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleError: (e: any): string =>{
		if (process.env.NODE_ENV !== "production") {
			console.error(inspect(e));
		}
		const apiError: { type?: API.ErrorType; message?: string } = e;

		if (apiError.type === API.ErrorType.Validation && apiError.message) {
			const parseMessage = JSON.parse(apiError.message);
			const firstMessage: string = parseMessage[0].message;
			return firstMessage;
		}

		if (apiError.message && apiError.type && apiError.type !== API.ErrorType.Connection && apiError.type !== API.ErrorType.Fatal) {
			return apiError.message;
		}

		return process.env.NODE_ENV === "production" ? Strings.error.default : inspect(e);
	},

	create: {
		stillLoading: () => {
			throw new CustomError(API.ErrorType.Fatal, Strings.error.stillLoading);
		},
	},
	treatError: (e: any): IError => {
		const apiError: IError = {
			type: e.type || API.ErrorType.Fatal,
			message: e.message || Strings.error.default,
		};

		return apiError;
	},
};
