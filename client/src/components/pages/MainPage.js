import AddExercise from "../addexercise/addexercise";
import Exercises from '../exercises/exercises';
import Calendar from "../calendar/calendar";
import { Container } from 'react-bootstrap';
import { useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import { fetchTypes } from "../../https/TypesApi";
import ExercisesInTraining from "../exercisesInTraining/ExercisesInTraining";
import Header from "../header/header";
import Timer from "../timer/timer";
import { observer } from "mobx-react-lite";
import { addTrainingOfUser, removeTraining, renameTraining } from "../../https/TrainingApi";
import { addExercisesInTraining, removeExercises, getPrevOrNextTraining, getExercisesInTraining } from "../../https/ExercisesInTrainingApi";
import Trainings from "./trainings";
import sleep from './img/sleep.svg'

import { deleteProgress, getProgress } from "../../https/ProgressApi";

const MainPage = observer(() => {

    //Открытие модального окна с упражнениями
    const [activeExercisesModal, setExercisesModal] = useState(false);

    // Выбранные упражнения
    const [saveExInTraining, setSaveExInTraining] = useState([]);

    // Упражнения в тренировке
    const [currentExercises, setExercisesCurrent] = useState([])

    //Название тренировки
    const [nameTraining, setNameTraining] = useState('Без названия');

    // Idтренировки
    const [tainingID, setTrainingId] = useState()

    //Начало тренировки
    const [startTraining, setStartTraining] = useState(false);

    const [dateTraining, setDateTraining] = useState(new Date());

    //Вывод календаря
    const [activeCalendar, setActiveCalendar] = useState(false);

    //Вывод таймера
    const [activeTimer, setActiveTimer] = useState(false);

    // Пользовательские упражнения
    const [customEx, setCustomEx] = useState(false)

    // Наличие тренировки
    const [exsistsTraining, setExistsTraining] = useState(false)

    //Типы упражнений
    const {types, trainings, user, exercisesInTraining, addExersisesInTrainingStore} = useContext(Context);

    const start = async () => {
        if (saveExInTraining.length === 0 ) return

        setStartTraining(true)
        setExistsTraining(true)

        const res = await addTrainingOfUser(nameTraining !== '' ? nameTraining : 'Без названия', dateTraining, user.userId).then(data => {
            trainings.setTraining(data); 

            let promises = []

            saveExInTraining.forEach(exercise => {
                promises.push(addExercisesInTraining(exercise.id, data.id, dateTraining))
            })
            let promis = Promise.all(promises).then(data => {
                exercisesInTraining.setExercisesInTraining(data);
                setTrainingId(trainings.trainings.id)
                addExersisesInTrainingStore.addInTraining(saveExInTraining)
            })
        });
    }

    const addExerciseInTraining = async () => {
        const promises = []
        saveExInTraining.forEach(exercise => {
            promises.push(addExercisesInTraining(exercise.id, trainings.trainings.id, dateTraining))
            addExersisesInTrainingStore.addInTraining([...addExersisesInTrainingStore.exercises, exercise])
        })

        let promis = Promise.all(promises).then(data => {
            exercisesInTraining.setExercisesInTraining([...exercisesInTraining.exercisesInTraining, data]); 
            setTrainingId(trainings.trainings.id)           
        });
    }

    const removeExercise = async (id) => {
        let promises = []
        const progress = await getProgress(id, tainingID).then(progresses => {
            
            if (progresses.length !== 0) {
                progresses.forEach(elem => {
                    promises.push(deleteProgress(elem.id))
                })
            }
        })
        const deleteProg = await Promise.all(promises)

        const res = await removeExercises(tainingID, id).then(data => 
            {
                
                let filered = addExersisesInTrainingStore.exercises.filter(el => el.id !== id)
                
                addExersisesInTrainingStore.addInTraining(filered);
                
                if (addExersisesInTrainingStore.exercises.length === 0) {
                    const res = removeTraining(tainingID).then(data => {
                        setStartTraining(false)
                        setExistsTraining(false)
                    })
                }
            }
        )
    }

    const addNameTraining = (name) => {
        if (name.length !== 0 && trainings.trainings.length !== 0) {
            trainings.trainings.name = name
            renameTraining(trainings.trainings.id, name);
        }
    }

    const chechTrainingsOfUser = async (userId, date) => {
        const res = await getPrevOrNextTraining(userId, date).then(data => {

            if (data.length === 0 || data == []) {
                addExersisesInTrainingStore.addInTraining([])
                setSaveExInTraining([])
                setExercisesCurrent([])
                setStartTraining(false)
                setExistsTraining(false)
                return
            } else {

                trainings.setTraining(data[0]); 
                setTrainingId(trainings.trainings.id)
                
                setNameTraining(data[0].name)
                setStartTraining(true)
                setNameTraining(trainings.trainings.name)
                
                getExercisesInTraining(user.userId, dateTraining).then(data => {

                    if (data.length === 0) {
                        setExistsTraining(false)
                    } else {
                        setExistsTraining(true)
                        let exercises = []
                        data.forEach(exercise => {
                            exercises.push(exercise[0])
                        })
                        addExersisesInTrainingStore.addInTraining(exercises)
                        
                    }
                    
                })
            }
        })
    }
    useEffect(() => {
        chechTrainingsOfUser(user.userId, dateTraining)
    }, [user, dateTraining])

    useEffect(() => {
        chechTrainingsOfUser(user.userId, dateTraining)
        fetchTypes().then(data => {
            types.setTypes(data)
        });
    }, [dateTraining])

    return(
        <>
            <Header dateTraining={dateTraining} activeTimer={activeTimer} setActiveTimer={setActiveTimer} activeCalendar={activeCalendar} setActiveCalendar={setActiveCalendar}/>
            <Container>
                <Calendar setActiveCalendar={setActiveCalendar} activeTimer={activeTimer} dateTraining={dateTraining} setDateTraining={setDateTraining} activeCalendar={activeCalendar}/>
            </Container>
            <Container>
                <Timer activeCalendar={activeCalendar} active={activeTimer}/>   
            </Container>
            <section className="main-page" 
                     style={!activeTimer && !activeCalendar ? {
                        display: 'flex', 
                        flex:'1 1 auto', 
                        flexDirection: 'column', 
                        paddingTop:'110px'} 
                        : 
                        {display: 'flex', 
                        flex:'1 1 auto', 
                        flexDirection: 'column', 
                        paddingTop:'0px'}}>
                <div className="container" style={{flex: '1 1 auto'}}>
                    {
                        <Container style={{padding:'0px'}}>
                            <div className='d-flex justify-content-center align-items-center flex-column' style={{width: '100%'}}>
                                <input placeholder={exsistsTraining? `` : 'Введите название тренировки'} 
                                    type="text" id="training-name" 
                                    name="training-name" 
                                    className='training-name'
                                    style={{marginTop: '0px', 
                                            color: 'rgb(108, 117, 125)', 
                                            width: '300px', 
                                            fontSize: '20px', 
                                            textAlign: 'center'}}
                                    value={nameTraining}
                                    onInput={(e) => { 
                                                    setNameTraining(e.target.value)}}
                                    onBlur={() => { addNameTraining(nameTraining)}}>
                                </input>
                            </div>
                            <div className='exercises-content mt-4'>
                                {
                                    activeExercisesModal ? <Exercises 
                                        start={start}
                                        customEx={customEx}
                                        setCustomEx={setCustomEx}
                                        addExerciseInTraining={addExerciseInTraining}

                                        startTraining={startTraining}
                                        setStartTraining={setStartTraining}

                                        currentExercises={currentExercises}
                                        setExercisesCurrent={setExercisesCurrent}

                                        saveExInTraining={saveExInTraining} 
                                        setSaveExInTraining={setSaveExInTraining} 

                                        types={types} 

                                        show={activeExercisesModal}                           
                                        onHide={() => setExercisesModal(false)}/> 
                                    : 
                                    <> {addExersisesInTrainingStore.exercises.length === 0  ? 
                                        <div className="d-flex flex-column"
                                                style={ !activeCalendar && !activeTimer ? {
                                                    position:'absolute',
                                                    width:'100%',
                                                    top:'50%',
                                                    left:'50%',
                                                    transform:'translate(-50%,-50%)'
                                                }
                                                :
                                                {
                                                    position:'relative',
                                                    width:'100%',
                                                    marginTop:'40px'
                                                }
                                            }
                                                >
                                            <div className="sleep-img" style={{height:'100px'}}>
                                                <img style={{width:'100%', height:'100%'}} src={sleep} alt="" />
                                            </div>
                                            <h2 className='text-center mt-5' 
                                                style={{color: 'rgb(108, 117, 125)', 
                                                padding:'0 20px'}}>
                                                Тренировка отсутствует
                                            </h2> 
                                        </div>
                                        : 
                                        <ExercisesInTraining dateTraining={dateTraining} exsistsTraining={exsistsTraining} tainingID={tainingID} removeExercise={removeExercise} currentExercises={addExersisesInTrainingStore.exercises} style={{position:'relative'}}/>
                                    }
                                    </>
                                }
                            </div>
                        </Container>
                    }
                </div>
                <AddExercise setExercisesModal={setExercisesModal}/>
            </section>
        </>
    )
})

export default MainPage;