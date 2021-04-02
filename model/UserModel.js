const bcrypt = require('bcrypt');
module.exports = (sequelize,Sequelize)=>{
    const User = sequelize.define("users",{    
        id:{
            type:Sequelize.STRING(50),
            primaryKey:true
        },
        name:{
            type:Sequelize.STRING(200),
            allowNull: false,
            length: '200'
        },
        phone:{
            type:Sequelize.INTEGER,
            allowNull: true,
            unique:true
        },
        email:{
            type: Sequelize.STRING(50),
            allowNull: true,
            unique:true,
            length: '50'
        },
        password:{
            type:Sequelize.STRING(100),
            allowNull: false,
            length: '100'
        }
    },{});
    return User;
}
