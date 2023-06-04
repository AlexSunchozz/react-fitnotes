import { Modal, Button} from "react-bootstrap";
import './exercises.scss';

import { observer } from "mobx-react-lite";
import Types from "../types/types";
import { useContext, useEffect, useRef, useState } from "react";
import ExercisesWithType from "../exercisesWithType/exercisesWithType";
import { Context } from "../..";

const Exercises = observer(({ customEx, setCustomEx, start, addExerciseInTraining, startTraining, saveExInTraining, setSaveExInTraining, 
    currentExercises, setExercisesCurrent, types, show, onHide}) => {

    const {user} = useContext(Context)
    const [exercisesWithType, setExercisesWirhType] = useState(false);
    const [typeId, setTypeId] = useState();
    const [typeName, setTypeName] = useState('');

    useEffect(() => {
        if (startTraining) {
            setSaveExInTraining([])
            setExercisesCurrent(currentExercises)
        }
    }, [startTraining])

    return(
        <>
            {
                !exercisesWithType ? 

                <Modal show={show} onHide={onHide}>
                    <Modal.Header>
                        <Modal.Title>Выберите упражнения</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{color:'white', border: 'none'}}>
                        <Types typeName={typeName} 
                        setTypeName={setTypeName} types={types} 
                        typeId={typeId} setTypeId={setTypeId} 
                        exercisesWithType={exercisesWithType} 
                        setExercisesWirhType={setExercisesWirhType}/> 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='btn-border' 
                                style={{border:'1px solid #c43def'}} 
                                onClick={() => {onHide(); setSaveExInTraining(currentExercises)}}>
                             Отмена
                        </Button>
                        <Button className='btn-border' 
                                onClick={() => {onHide(); !startTraining ? start() : addExerciseInTraining()}}>
                            {!startTraining? 'Сохранить тренировку' : 'Добавить упражнения'}
                        </Button>
                    </Modal.Footer>
                </Modal>

                :
                
                <ExercisesWithType  
                    customEx={customEx}
                    setCustomEx={setCustomEx}
                    saveExInTraining={saveExInTraining}
                    setSaveExInTraining={setSaveExInTraining}
                    typeName={typeName} 
                    typeId={typeId} 
                    show={exercisesWithType} 
                    onHide={() => setExercisesWirhType(false)}/>
            }
            
        </>
    )
})

export default Exercises;