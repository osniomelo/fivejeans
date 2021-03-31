const Sequelize = require('sequelize');

const databaseConfig = require('../config/database');

const File = require('../app/models/File');
const User = require('../app/models/User');

const models = [User, File];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);

		models.map(model => model.init(this.connection));

		models.map(model => model.associate && model.associate(this.connection.models));
	}
}

module.exports = new Database();
