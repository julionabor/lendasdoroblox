const { body } = require("express-validator");

const userCreateValidation = () => {
	return [
		body("name")
			.isString()
			.withMessage("O nome é obrigatório!")
			.isLength({ min: 3 })
			.withMessage("O nome precisa ter no mínimo 3 caracteres!"),
		body("email")
			.isString()
			.withMessage("E-mail é obrigatório!")
			.isEmail()
			.withMessage("Insira um e-mail válido!"),
		body("password")
			.isString()
			.withMessage("A palavra passe é obrigatória!")
			.isLength({ min: 5 })
			.withMessage("A palavra passe deve conter no mínimo 5 caracteres!"),
		body("confirmPassword")
			.isString()
			.withMessage("A confirmação da password é um campo obrigatório!")
			.custom((value, { req }) => {
				if (value != req.body.password) {
					throw new Error("As palavras passe não coincidem!");
				}
				return true;
			}),
	];
};

const loginValidation = () => {
	return [
		body("email")
			.isString()
			.withMessage("O email é obrigatório!")
			.isEmail()
			.withMessage("Insira um email válido!"),
		body("password").isString().withMessage("A palavra passe é obrigatória!"),
	];
};

const userUpdateValidation = () => {
	return [
		body("name")
			.optional()
			.isLength({ min: 3 })
			.withMessage("O nome deve conter pelo menos 3 caracteres!"),
		body("password")
			.optional()
			.isLength({ min: 5 })
			.withMessage("A palavra passe deve conter no mínimo 5 caracteres!"),
	];
};

module.exports = {
	userCreateValidation,
	loginValidation,
	userUpdateValidation,
};
