const Yup = require('yup');
const User = require('../models/User');
const File = require('../models/File');

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
		return;
	}

	async destroy(req, res) {
		const { id } = req.params;

		const user = await User.findByPk(id);

		await user.destroy();

		return res.status(204).send();
	}
}

module.exports = new UserController();
