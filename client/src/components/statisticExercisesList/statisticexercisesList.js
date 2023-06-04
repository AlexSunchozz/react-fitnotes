import { useEffect, useState } from 'react'
import ar from './img/ar.png'
import Diagram from '../diagram/diagram';
import { getexwithtype } from '../../https/TypesApi';

const StatisticExercisesList = ({trainings, exercises, countExercise, types}) => {

    const [acitveDiagrams, setActiveDiagrams] = useState();
    const [currExerciseId, setCurrExerciseId] = useState();
    const [currExerciseName, setCurrExerciseName] = useState();
    const [typeId, setTypeId] = useState();
    const [exercisesFiltered, setExercisesFiltered] = useState([]);

    useEffect(() => {
        if (typeId && typeId !== "all") {
            getexwithtype(typeId).then(data => {
                const filteredArr = exercises.filter((элемент) => {
                    return data.some((item) => item.exerciseId === элемент.id);
                  });
                  setExercisesFiltered(filteredArr)
            })
        } else setExercisesFiltered([])
        
    }, [typeId])

    return(
        <>
            <div className="title m-4" style={{fontSize:'18px', opacity:'.6'}}>Ваши упражнения</div>
            <div className="types pe-4 ps-4 mb-4 mt-2 pb-4" style={{borderBottom:'1px solid #d2d2d2'}}>
                <select name="types" id="types" style={{width:'100%', height:'30px',
                        backgroundColor:'transparent',color:'white', fontSize:'18px'}}
                        onChange={e => setTypeId(e.target.value)}>
                    <option value="all">Все</option>
                    {
                        types.map((type, i) => 
                            <option value={type.id}>{type.name}</option>
                        )
                    }
                </select>
            </div>
            <>
                {
                    exercisesFiltered.length === 0 ? 
                    exercises.map((exercise, i) => 
                        <div key={exercise.id} className="d-flex flex-column mb-4" 
                            style={{backgroundColor:"#202020", borderRadius:'20px'}}
                            onClick={() => {setCurrExerciseId(exercise.id); setCurrExerciseName(exercise.name); setActiveDiagrams(true)}}>
                            <div className="exercise-row justify-content-between" key={exercise.id} id={exercise.id}>
                                <div className="d-flex align-items-center" style={{flex:'1 1 auto'}}>
                                    <div className="exercise-row-img">
                                        <img src={"http://localhost:5001/"+exercise.img} alt="" />
                                    </div>
                                    <div className="exercise-row-title" style={{color:'white'}}>{exercise.name}</div>
                                </div>  
                                <div className="d-flex align-items-center ps-2 justify-content-between">
                                    <div style={{fontSize:'18px', opacity:'0.8'}}>{countExercise[exercise.id]}</div>
                                    <div className="ps-2" style={{flex:'0 1 35px', opacity:'.6'}}>
                                        <img src={ar} alt="" style={{width:'100%', height:'100%'}}/>
                                    </div>
                                </div>
                            </div>

                            <Diagram trainings={trainings} 
                            show={acitveDiagrams} 
                            onHide={() => setActiveDiagrams(false)} 
                            exercisename={currExerciseName} 
                            exerciseId={currExerciseId}/>
                        </div>)
                    :
                    exercisesFiltered.map((exercise, i) => 
                    <div key={exercise.id} className="d-flex flex-column mb-4" 
                        style={{backgroundColor:"#202020", borderRadius:'20px'}}
                        onClick={() => {setCurrExerciseId(exercise.id); setCurrExerciseName(exercise.name); setActiveDiagrams(true)}}>
                        <div className="exercise-row justify-content-between" key={exercise.id} id={exercise.id}>
                            <div className="d-flex align-items-center" style={{flex:'1 1 auto'}}>
                                <div className="exercise-row-img">
                                    <img src={"http://localhost:5001/"+exercise.img} alt="" />
                                </div>
                                <div className="exercise-row-title" style={{color:'white'}}>{exercise.name}</div>
                            </div>  
                            <div className="d-flex align-items-center ps-2 justify-content-between">
                                <div style={{fontSize:'18px', opacity:'0.8'}}>{countExercise[exercise.id]}</div>
                                <div className="ps-2" style={{flex:'0 1 35px', opacity:'.6'}}>
                                    <img src={ar} alt="" style={{width:'100%', height:'100%'}}/>
                                </div>
                            </div>
                        </div>

                        <Diagram trainings={trainings} 
                        show={acitveDiagrams} 
                        onHide={() => setActiveDiagrams(false)} 
                        exercisename={currExerciseName} 
                        exerciseId={currExerciseId}/>
                    </div>)
                }
            </>
        </>
    )
}
export default StatisticExercisesList