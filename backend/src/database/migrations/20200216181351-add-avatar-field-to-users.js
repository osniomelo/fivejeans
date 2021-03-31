'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('users', 'avatar_id', {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV1,
			references: { model: 'files', key: 'id' },
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL',
			allowNull: true,
		});
	},

	down: queryInterface => {
		return queryInterface.removeColumn('users', 'avatar_id');
	},
};
