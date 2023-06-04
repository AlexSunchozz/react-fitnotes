import dots from './img/icons8-меню-2-50.png';
import { useContext, useEffect, useState } from "react";
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import Info from '../infoExercise/info';
import shtanga from './img/shtanga.png'

const ExercisesList = observer(({term, activeFilter, handleClick, saveExInTraining}) => {
    
    const {exercises} = useContext(Context);


    const [exerciseName, setExerciseName] = useState();
    const [exerciseDescr, setExerciseDesr] = useState();
    const [exerciseImg, setExerciseImg] = useState();
    const [showInfo, setShowInfo] = useState(false);
    const [targetMuscul, setTargetMusculs] = useState()

    const checkExercise = (exercise) => {
        if (saveExInTraining.find(el => el.id === exercise.id)) {
            return  "list-item d-flex align-items-center justify-content-center active"                                                 
        } else {
            return  "list-item d-flex align-items-center justify-content-center"
        }
    }

    return(
        <>
            <ul className="types-exercises-list list">
                {
                    <>
                        {
                            activeFilter !== 0 && term === '' ?

                            exercises.exercises.filter(item => {
                                return item.targetmuscleId === activeFilter
                            }).map((exercise, i) => 
                                <div className='d-flex align-items-center'>
                                    <li className={checkExercise(exercise)} key={i}
                                        onClick={() => handleClick(exercise)}
                                        style={{flex:'0 0 90%'}}>
                                        <div style={{cursor: 'pointer'}} className="list-item__link">
                                            <div className="list-item__img"><img src={exercise.img ? "http://localhost:5001/"+exercise.img : shtanga} alt="" /></div>
                                            <div className="list-item__title">{exercise.name}</div>
                                        </div>
                                    </li>
                                    <div className="dots" style={{flex:'0 0 7%', cursor:'pointer'}}
                                        onClick={() => {
                                            setShowInfo(!showInfo);
                                            setExerciseName(exercise.name);
                                            setExerciseDesr(exercise.description);
                                            setExerciseImg(exercise.img);
                                            setTargetMusculs(exercise.targetmuscleId)
                                        }}>
                                        <img src={dots} alt="dots" style={{width:'100%', height:'100%'}}/>
                                    </div>
                                </div>  
                            )

                            :

                            <>
                                {
                                    activeFilter === 0 && term !== '' ?
                                        exercises.exercises.filter(item => {
                                            return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
                                        }).map((exercise, i) => 
                                            <div className='d-flex align-items-center'>
                                                <li className={checkExercise(exercise)} key={i}
                                                    onClick={() => handleClick(exercise)}
                                                    style={{flex:'0 0 90%'}}>
                                                    <div style={{cursor: 'pointer'}} className="list-item__link">
                                                        <div className="list-item__img"><img src={exercise.img ? "http://localhost:5001/"+exercise.img : shtanga} alt="" /></div>
                                                        <div className="list-item__title">{exercise.name}</div>
                                                    </div>
                                                </li>
                                                <div className="dots" style={{flex:'0 0 7%', cursor:'pointer'}}
                                                    onClick={() => {
                                                        setShowInfo(!showInfo);
                                                        setExerciseName(exercise.name);
                                                        setExerciseDesr(exercise.description);
                                                        setExerciseImg(exercise.img);
                                                        setTargetMusculs(exercise.targetmuscleId)
                                                    }}>
                                                    <img src={dots} alt="dots" style={{width:'100%', height:'100%'}}/>
                                                </div>
                                            </div>   
                                        )   
                                    :

                                    <>
                                        {
                                            activeFilter !== 0 && term !== '' ?
                                                exercises.exercises.filter(item => {
                                                    return item.targetmuscleId === activeFilter
                                                }).filter(item => {
                                                    return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
                                                }).map((exercise, i) => 
                                                    <div className='d-flex align-items-center'>
                                                        <li className={checkExercise(exercise)} key={i}
                                                            onClick={() => handleClick(exercise)}
                                                            style={{flex:'0 0 90%'}}>
                                                            <div style={{cursor: 'pointer'}} className="list-item__link">
                                                                <div className="list-item__img"><img src={exercise.img ? "http://localhost:5001/"+exercise.img : shtanga} alt="" /></div>
                                                                <div className="list-item__title">{exercise.name}</div>
                                                            </div>
                                                        </li>
                                                        <div className="dots" style={{flex:'0 0 7%', cursor:'pointer'}}
                                                            onClick={() => {
                                                                setShowInfo(!showInfo);
                                                                setExerciseName(exercise.name);
                                                                setExerciseDesr(exercise.description);
                                                                setExerciseImg(exercise.img);
                                                                setTargetMusculs(exercise.targetmuscleId)
                                                            }}>
                                                            <img src={dots} alt="dots" style={{width:'100%', height:'100%'}}/>
                                                        </div>
                                                    </div>  
                                                )
                                            
                                            :
                                            exercises.exercises.map((exercise, i) => 
                                                <div className='d-flex align-items-center'>
                                                    <li className={checkExercise(exercise)} key={i}
                                                        onClick={() => handleClick(exercise)}
                                                        style={{flex:'0 0 90%'}}>
                                                        <div style={{cursor: 'pointer'}} className="list-item__link">
                                                            <div className="list-item__img"><img src={exercise.img ? "http://localhost:5001/"+exercise.img : shtanga} alt="" /></div>
                                                            <div className="list-item__title">{exercise.name}</div>
                                                        </div>
                                                    </li>
                                                    <div className="dots" style={{flex:'0 0 7%', cursor:'pointer'}}
                                                        onClick={() => {
                                                            setShowInfo(!showInfo);
                                                            setExerciseName(exercise.name);
                                                            setExerciseDesr(exercise.description);
                                                            setExerciseImg(exercise.img);
                                                            setTargetMusculs(exercise.targetmuscleId)
                                                        }}>
                                                        <img src={dots} alt="dots" style={{width:'100%', height:'100%'}}/>
                                                    </div>
                                                </div>  
                                            ) 
                                        }   
                                    </> 
                                }
                            </>
                        }   
                    </>
                }
            </ul>
            <Info 
                show={showInfo} 
                onHide={() => setShowInfo(false)} 
                exerciseName={exerciseName} 
                exerciseDescr={exerciseDescr}
                exerciseImg={exerciseImg}
                targetMuscul={targetMuscul}/>
        </> 
    )
})

export default ExercisesList;