import api from "./api";

export class CustomError<ErroType extends api.ErrorType> {
	public error: ErroType;
	public message: string;
	constructor(error: ErroType, message: string) {
		this.error = error;
		this.message = message;
	}
}
