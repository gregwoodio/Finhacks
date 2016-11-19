// models.js
var Sequelize = require('sequelize');

var sequelize = new Sequelize('altpay', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 50,
    min: 0,
    idle: 10000
  }
});

var Profile = sequelize.define('profile', {
  id: {
    type: Sequelize.STRING, 
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  firstname: {
    type: Sequelize.STRING
  },
  lastname: {
    type: Sequelize.STRING
  },
  imgurl: {
    type: Sequelize.STRING
  },
  accounttype: {
    type: Sequelize.STRING
  },
  magnetid: {
    type: Sequelize.STRING
  },
  currency: {
    type: Sequelize.DECIMAL
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var Device = sequelize.define('devices', {
  deviceid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  devicetype: {
    type: Sequelize.STRING
  },
  devicename: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

var ProfileDevice = sequelize.define('profile_devices', {
  profileid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  deviceid: {
    type: Sequelize.STRING,
    primaryKey: true
  }
}, {
  timestamps: false
});

Profile.hasMany(ProfileDevice, {foreignKey: 'profileid'});
Device.hasOne(ProfileDevice, {foreignKey: 'deviceid'});
ProfileDevice.belongsTo(Profile, {foreignKey: 'id'});
ProfileDevice.belongsTo(Device, {foreignKey: 'deviceid'});

module.exports = {
  Profile: Profile,
  Device: Device
};