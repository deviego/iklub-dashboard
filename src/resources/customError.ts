import api from "./api";

export class CustomError<ErroType extends api.ErrorType> {
	public type: ErroType;
	public message: string;
	constructor(error: ErroType, message: string) {
		this.type = error;
		this.message = message;
	}
}
