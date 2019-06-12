module.exports = function(sequelize, DataTypes) {
  let Card = sequelize.define("Card", {
    // id: DataTypes.INTEGER,
    category: DataTypes.STRING,
    question: DataTypes.STRING,
    answer: DataTypes.TEXT
  },
  { 
    timestamps: false,
});
  return Card;
};
