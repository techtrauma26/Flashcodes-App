module.exports = function(sequelize, DataTypes) {
  let Card = sequelize.define("Card", {
    author: DataTypes.STRING,
    category: DataTypes.STRING,
    question: DataTypes.STRING,
    answer: DataTypes.TEXT,
    // link: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // ec: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // }
  },
  { 
    timestamps: false,
});
  return Card;
};
