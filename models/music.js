module.exports = (sequelize, DataTypes) => {
    const Music = sequelize.define('Music', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama:{
        type: DataTypes.STRING,
    },
    author: {
        type: DataTypes.STRING,
    },
    tahunTerbit:{
        type: DataTypes.STRING,
    },
    genre:{
        type: DataTypes.STRING,
    }
});
    return Music;
}