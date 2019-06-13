module.exports = function(sequelize, DataTypes) {
  let Card = sequelize.define("Card", {
    author: DataTypes.STRING,
    category: DataTypes.STRING,
    question: DataTypes.STRING,
    answer: DataTypes.TEXT
  },
  { 
    timestamps: false,
});
  return Card;
};
