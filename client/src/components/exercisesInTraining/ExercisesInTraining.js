import { Row } from "react-bootstrap";
import progPlus from './img/progressplus.png'
import store from './img/store.png';
import './exercisesInTraining.scss';
import Progress from "../progress/progress";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../..";
import ProgressBar from "../progress-bar/prgress-bar";
import { getProgress } from "../../https/ProgressApi";

const ExercisesInTraining = ({dateTraining, tainingID, removeExercise, currentExercises}) => {

    const [activeProgressModal, setActiveProgressModal] = useState(false);
    const [addProgressOfEx, setAddProgressOfEx] = useState();
    const [currentExerciseId, setCurrentExerceiseId] = useState();
    const [currentExerciseName, setCurrentExerceiseName] = useState('');

    const [activeProgress, setActiveProgress] = useState(false)
    const [progressTitle, setProgressTitle] = useState(1)
    const {trainings} = useContext(Context);

    const [numberOfApproach, setNumberOfApproach] = useState(1)

    const getTitle = async (exerciseId, tainingID) => {

        const res = await getProgress(exerciseId, tainingID).then(data => {
            if (data.length == 0) {
                setNumberOfApproach(1)
            } else {
                setNumberOfApproach(data[data.length-1].numberapproach + 1)
            }
        })
    }

    return(
        <>
            {
                currentExercises.map((exercise, i) => 
                    <div key={exercise.id} className="d-flex flex-column mb-4" style={{backgroundColor:"#202020", borderRadius:'20px'}}>
                        <div className="exercise-row justify-content-between" key={exercise.id} id={exercise.id}>
                            <div className="d-flex align-items-center" style={{flex:'1 1 auto'}}>
                                <div className="exercise-row-img">
                                    <img src={"http://localhost:5001/"+exercise.img} alt="" />
                                </div>
                                <div className="exercise-row-title" style={{color:'white'}}>{exercise.name}</div>
                            </div>  
                            <div className="progress-add" onClick={() => {
                                    setActiveProgressModal(!activeProgressModal);
                                    setCurrentExerceiseId(exercise.id);
                                    setCurrentExerceiseName(exercise.name);
                                    getTitle(exercise.id, tainingID)
                            }}>
                                <img src={progPlus} alt="progres-add" style={{cursor:"pointer", padding:'0 10px'}}/>
                            </div>
                            <div className="remove-exercise" 
                                    onClick={() => removeExercise(exercise.id)}>
                                <img src={progPlus} alt="remove-exercise" style={{cursor:"pointer", padding:'0 10px', transform:'rotate(45deg)'}} />
                            </div>
                        </div>

                        <div className="d-flex flex-wrap" style={{paddingLeft:'20px'}}>
                            <ProgressBar 
                                tainingID = {tainingID}
                                activeProgress={activeProgress}
                                setActiveProgress={() => setActiveProgress(false)} 
                                exerciseId={exercise.id} 
                                setProgressTitle={setProgressTitle}
                            />
                        </div >
                        <Progress
                            dateTraining={dateTraining}
                            trainingId={tainingID}
                            numberOfApproach={numberOfApproach}
                            currentExerciseId={currentExerciseId}
                            currentExerciseName={currentExerciseName} 
                            activeProgress={activeProgress}
                            setActiveProgress={setActiveProgress}
                            setActiveProgressModal={setActiveProgressModal}
                            show={activeProgressModal} 
                            onHide={() => setActiveProgressModal(false)}/>
                    </div>   
                )
                
            }
        </>
    )
}

export default ExercisesInTraining;