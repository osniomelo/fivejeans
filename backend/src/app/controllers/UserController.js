const Yup = require('yup');
const User = require('../models/User');
const File = require('../models/File');
const { findByPk } = require('../models/User');

class UserController {
	async index(req, res) {
		const users = await User.findAll();

		return res.json(users);
	}

	async show(req, res) {
		const { id } = req.params;

		const user = await User.findByPk(id);

		return res.json(user);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().required().min(6),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation failed' });
		}

		const userExists = await User.findOne({
			where: { email: req.body.email },
		});

		if (userExists) {
			return res.status(400).json({ error: 'User already exists' });
		}

		const { id, name, email } = await User.create(req.body);

		return res.json({ id, name, email });
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email(),
			password: Yup.string()
				.min(6)
				.when('oldPassword', (oldPassword, field) =>
					oldPassword ? field.required() : field,
				),
			confirmPassword: Yup.string().when('password', (password, field) =>
				password ? field.required().oneOf([Yup.ref('password')]) : field,
			),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation failed' });
		}

		const { email, oldPassword } = req.body;

		const user = await User.findByPk(req.userId);

		if (email && email !== user.email) {
			const userExists = await User.findOne({ where: { email } });

			if (userExists) {
				return res.status(400).json({ error: 'User already exists' });
			}
		}

		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(400).json({ error: 'Password does not match' });
		}

		await user.update(req.body);

		const { id, name, avatar, cpf_cnpj } = await User.findByPk(req.userId, {
			include: [
				{
					model: File,
					as: 'avatar',
					attributes: ['id', 'path', 'url'],
				},
			],
		});

		return res.json({
			id,
			name,
			email,
			avatar,
		});
	}

	async destroy(req, res) {
		const { id } = req.params;

		const user = await User.findByPk(id);

		await user.destroy();

		return res.status(204).send();
	}
}

module.exports = new UserController();
