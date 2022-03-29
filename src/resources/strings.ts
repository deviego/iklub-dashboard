import "moment/locale/pt-br";
import LocalizedStrings from "localized-strings";

const strings = new LocalizedStrings({
	ptBR: {
		removeCharactersExceptLetterNumber: (character: string) => character.replace(/[^a-zA-Z0-9]/g, ""),
		components: {
			autoCompleteList: {
				empty: "Não há itens na lista",
			},
			autoCompleteModal: {
				back: "Voltar",
			},
			editProfile: {
				success: "Editado com sucesso",
			},
			imagePicker: {
				selectAnImage: "Selecione uma imagem",
			},
		},
		nav: {
			home: "Home",
			adminUsers: "Usuários Adminstrativos",
			users: "Users",
			logout: "Sair",
		},
		actions: {
			save: "Salvar",
			delete: "Apagar",
			create: "Criar",
			cancel: "Cancelar",
			select: "Selecionar",
			back: "Voltar",
			add: "Adicionar",
			send: "Enviar",
		},
		moment: {
			day: "DD",
			dateMonth: "DD/MM",
			date: "DD/MM/YYYY",
			dateHour: "DD/MM/YYYY HH[h]",
			dateTime: "DD/MM/YYYY HH:mm",
		},
		error: {
			stillLoading: "Ainda Carregando, aguarde.",
			notLoggedIn: "Usuario não logado",
			default: "Houve um erro, tente novamente mais tarde.",
		},
		common: {
			noResutls: "Sem Resultados",
			delete: "Clique para deletar",
			disable: "Clique para desabilitar",
			enable: "Clique para habilitar",
			details: "Clique para ver mais informações",
			edit: "Clique para editar",
			cancel: "Cancelar",
			finish: "Finalizar",
			confirm: "Confirmar",
			detailsTitle: "Detalhes",
			editTitle: "Editar",
			send: "Enviar",
			buttons: {
				confirmButton: (isEdit?: boolean) => isEdit ? "Editar" : "Enviar",
				backButton: "Voltar",
			},
			empty: "Vazio",
			fields: {
				name: "Nome:",
				email: "E-mail:",
				password: "Senha:",
				cpf: "CPF:",
				phone: "Celular:",
				address: "Endereço:",
				disable: "Desabilitar:",
				photo: "Foto:",
				street: "Rua:",
				neighborhood: "Bairro:",
				streetNumber: "Número:",
				complementary: "Complemento:",
				city: "Cidade:",
				countryCode: "Código do País:",
				state: "Estado:",
				zipcode: "CEP:",
				description: "Descrição:",
				date: "Data:",
				hour: "Hora:",
			},
			mask: {
				date: "__/__/____",
				time: "__:__",
			},
			modal: {
				title: "Deletar",
				description: (itemName: string) => `Tem certeza que deseja deletar ${itemName}?`,
				descriptionRemove: (itemName: string) => `Tem certeza que deseja remover ${itemName}?`,
				button: {
					remove: "Remover",
					delete: "Deletar",
					cancel: "Cancelar",
				},
			},
		},
		login: {
			loginIn: "Login",
			recoveryPassword: "Recuperar Senha",
			success: (userName: string) => `Bem vindo ${userName}.`,
			fields: {
				email: "E-mail",
				password: "Senha",
			},
		},
		recoveryPage: {
			success: "Bem vindo!",
			title: "Recuperação de Senha",
			newAccess: "Novo Acesso",
			sendSuccess: "E-mail enviado com sucesso!",
			recoverPasswordButton: "Enviar e-mail",
			newPasswordButton: "Alterar Senha",
			email: "Email",
			token: "Token",
			validToken: "Token válido!",
			confirmTokenButton: "Confirmar Token",
			tokenButton: "Já possui um token?",
			noTokenButton: "Não possuo token",
			newPassword: "Nova senha",
			confirmNewPassword: "Confirme sua nova senha",
			samePasswordError: "As senhas não correspondem",
		},
		users :{
			table: {
				title: "Lista de Usuários",
				header: ["", "Usuários", "Email"],
				delete: (userName: string) => `Usuário ${userName} foi deletado!`,
				statusUser: (isUserBlocked: boolean) => `O Usuário ${isUserBlocked ? "foi bloqueado" : "foi desbloaqueado"}`,
				totalText: "Usuários cadastrados",
			},
			edit: {
				title: "Edição de Usuário",
				success: "Usuário editado com sucesso",
			},
		},
		adminUsers: {
			table: {
				title: "Lista de Usuários Admin",
				header: ["", "Usuários Admin", "Email"],
				delete: (userName: string) => `Usuário ${userName} foi deletado!`,
				addButtonText: "Adicionar novo usuário admin",
			},
			createOrEdit: {
				title: (isEdit?: boolean) => isEdit ? "Edição de Usuário Admin" : "Cadastro de Usuário Admin",
				titleRestaurantUser: (isEdit?: boolean) => isEdit ? "Edição de Usuário Restaurante" : "Cadastro de Usuário Restaurante",
				success: (isEdit?: boolean) => isEdit ? "Usuário editado com sucesso" : "Usuário criado com sucesso",
			},
		},
	},
});

export default strings;
