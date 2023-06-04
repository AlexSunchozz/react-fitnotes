import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import 'bootstrap/dist/css/bootstrap.min.css'
import UserStore from './store/UserStore';
import TypesExercisesStore from './store/TypesExercisesStore';
import ExercisesStore from './store/ExercisesStore';
import MusculStore from './store/MusculStore';
import TrainingsStore from './store/TrainingsStore';
import ExercisesInTrainingStore from './store/ExercisesInTrainingStore';
import ProgressStore from './store/ProgressStore';
import AddExerciseInTrainingStore from './store/addExerciseInTrainingStore';
import CustomExercisesOfUserStore from './store/CustomExercisesOfUserStore';


export const Context = createContext(null);
// const express = require('express');
// const path = require('path');
// const app = express();

// app.use(express.static(path.join(__dirname, 'client')))
// app.get(('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'client', 'index.html'))
// }))

// app.listen(5001)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    types: new TypesExercisesStore(),
    exercises: new ExercisesStore(),
    musculs: new MusculStore(),
    trainings: new TrainingsStore(),
    exercisesInTraining: new ExercisesInTrainingStore(),
    progress: new ProgressStore(),
    addExersisesInTrainingStore: new AddExerciseInTrainingStore(),
    CustomExercisesOfUserStore: new CustomExercisesOfUserStore()
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);