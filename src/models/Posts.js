module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('posts', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    subTitle: DataTypes.STRING,
    body: DataTypes.STRING,
  }, {
    tableName: 'posts',
  });

  Posts.associate = (models) => {
    Posts.belongsTo(models.authors, { foreignKey: 'authorId', as: 'author' });
    Posts.hasMany(models.comments, { foreignKey: 'postId', as: 'comment' });
    Posts.hasMany(models.files, { foreignKey: 'postId', as: 'file' });
  };

  return Posts;
};