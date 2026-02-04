module.exports = (sequelize, DataTypes) => {
    const Material = sequelize.define('Material', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        category: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        }
    });

    return Material;
};
