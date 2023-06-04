const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    dateBurn: {type: DataTypes.STRING, allowNull: false},
    weight: {type: DataTypes.DECIMAL, allowNull: false},
    height: {type: DataTypes.DECIMAL, allowNull: false},
    gender: {type: DataTypes.STRING, allowNull: false},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull:false}
})

const Training = sequelize.define('training',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    date: {type: DataTypes.DATE},
})

const Exercises = sequelize.define('exercises',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING}
})

const TargetMusсle = sequelize.define('targetmuscle', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const TypeOfExercise = sequelize.define('typeofexercise',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING}
})

const ExercisesInTraining = sequelize.define('exercisesintraining',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE}
})

const Progress = sequelize.define('progress',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    numberapproach: {type: DataTypes.INTEGER},
    weightofinventory: {type: DataTypes.DECIMAL},
    repetition: {type: DataTypes.INTEGER},
    date: {type: DataTypes.DATE}
})


const ExercisesTypes = sequelize.define('ExercisesTypes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})


const ProgressInExercise = sequelize.define('prgressinexercise', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})


User.hasMany(Training);
Training.belongsTo(User);

Exercises.belongsToMany(TypeOfExercise, {through : ExercisesTypes});
TypeOfExercise.belongsToMany(Exercises, {through : ExercisesTypes});

TargetMusсle.hasMany(Exercises);
Exercises.belongsTo(TargetMusсle);

Training.belongsToMany(Exercises, {through: ExercisesInTraining});
Exercises.belongsToMany(Training, {through: ExercisesInTraining});

Progress.belongsToMany(ExercisesInTraining, {through: ProgressInExercise});
ExercisesInTraining.belongsToMany(Progress, {through: ProgressInExercise})


module.exports = {
    User,
    Training,
    Exercises,
    TargetMusсle,
    TypeOfExercise,
    ExercisesInTraining,
    ExercisesTypes,
    Progress, 
    ProgressInExercise
}