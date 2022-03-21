import "moment/locale/pt-br";

import moment from "moment";
import { format as dateFormat } from "date-fns";

const format = {
	currency: (centsValue: number) => (centsValue / 100).toLocaleString(
		window !== undefined ? window.navigator.language : "pt-BR",
		{
			maximumFractionDigits: 2,
			minimumFractionDigits: 2,
		},
	),
	formatCurrencyBR: (currentNumber: number) => new Intl.NumberFormat("pt-br", {
		style: "currency",
		currency: "BRL",
	}).format(currentNumber),
	currencyForBR: (centsValue: number) => (centsValue / 100).toLocaleString("pt-BR", {
		currency: "BRL",
		style: "currency",
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	}),
	decimal: (value: number) => ((value / 100).toLocaleString(
		"pt-BR",
		{
			style: "decimal",
			maximumFractionDigits: 2,
			minimumFractionDigits: 2,
		})
	),
	expiryDate: (date: Date) => `${moment(date).endOf("hour").fromNow()}`,
	dateWithMonth: (date: Date) => dateFormat(date, "dd/MM"),
	dateWithHour: (date: Date) => moment(date).format("DD/MM/YYYY HH[h]"),
	date: (date: Date) => `${moment(date).format("L")}`,
	hour: (date: Date) => `${moment(date).format("h:mm a")}`,
	verifyIfHasExpired: (date: Date) => moment().isAfter(moment(date), "minute"),
	removeCharactersExceptLetterNumber: (character: string) => character.replace(/[^a-zA-Z0-9]/g, ""),
	cleanDecimal: (unCleanAmount: string) => unCleanAmount.replace(/\D/g, ""),
};

export default format;
