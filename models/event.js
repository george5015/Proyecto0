module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('event', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      required: true
    },
    category: {
      type: DataTypes.ENUM,
      values: ['Conferencia', 'Seminario', 'Congreso', 'Curso']
    },
    place: {
      type: DataTypes.STRING,
      required: true
    },
    address: {
      type: DataTypes.STRING,
      required: true
    },
    event_starts:  DataTypes.DATE,
    event_ends: DataTypes.DATE
  });

  return Event;
}
