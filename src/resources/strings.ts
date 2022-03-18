import "moment/locale/pt-br";
import LocalizedStrings from "localized-strings";

const strings = new LocalizedStrings({
	ptBR: {
		removeCharactersExceptLetterNumber: (character: string) => character.replace(/[^a-zA-Z0-9]/g, ""),
	},

});

export default strings;
