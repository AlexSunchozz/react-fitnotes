import './progress.scss';
import calc from './img/calc.png';
import { Modal, Row, Button} from "react-bootstrap";
import { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import { addProgress } from '../../https/ProgressApi';
import { getProgress } from '../../https/ProgressApi';
import Calculator from '../calculate/calculate';


const Progress = ({ dateTraining, setActiveProgressModal, setActiveProgress, trainingId, numberOfApproach, currentExerciseId, currentExerciseName, show, onHide}) => {
    
    const [weightInventory, setWeightInventory] = useState(0)
    const [repeations, setRepeations] = useState(0)

    const [defaultWeightInventory, setDafaultInventory] = useState()
    const [dafaultRepeations, setDefaultRepeations] = useState()

    const [calculator, setCalculator] = useState()

    const {user, trainings, progress} = useContext(Context);
    console.log(dateTraining)
    const addProgressOfExercise = async () => {
        const res = await addProgress(numberOfApproach, weightInventory, repeations, currentExerciseId, trainingId, dateTraining).then(() => {
            setActiveProgress(true)
        })
    }

    return(
        <>
        <Modal show={show} onHide={onHide} className='progress'>
            <Modal.Header>
                <div>
                    <Modal.Title>{`Подход №${numberOfApproach}`}</Modal.Title>
                    <div className="name-exercise" style={{fontSize:'16px', color:'rgb(108, 117, 125)', fontWeight:'400'}}>{currentExerciseName}</div>
                </div>
                <div className="calculator" style={{flex:'0 0 30px'}}
                    onClick={() => setCalculator(!calculator)}>
                    <img src={calc} alt="calculate" style={{width:'100%', height:'100%'}}/>
                </div>
            </Modal.Header>
            <Modal.Body style={{color:'white', border: 'none'}}>
                <div className="progress-content">
                    <Row>
                        <div className="progress-content-input d-flex align-items-center justify-content-between">
                            <div className='d-flex align-items-center'>
                                <label htmlFor="weight" style={{marginRight:'35px'}}>КГ</label>
                                <input id="progress-weight" 
                                       type="number" 
                                       style={{marginTop:'0'}}
                                       onChange={(e) => setWeightInventory(e.target.value)}
                                       placeholder='Вес инвенторя'
                                       value={weightInventory}
                                       />
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="progress-plus"
                                    onClick={() => {setWeightInventory(+weightInventory + 1)}}>+</div>
                                <div className="progress-minus"
                                    onClick={() => {weightInventory <= 0 ? setWeightInventory(0) : setWeightInventory(weightInventory - 1)}}>—</div>
                            </div>
                        </div>
                    </Row>
                    <Row className='mt-4'>
                        <div className="progress-content-input d-flex align-items-center justify-content-between">
                            <div className='d-flex align-items-center'>
                                <label htmlFor="repeations" style={{marginRight:'15px'}}>ПОВТ</label>
                                <input id="repeations" 
                                        placeholder="количество повт"
                                       type="number" 
                                       style={{marginTop:'0'}}
                                       value={repeations}
                                       onChange={(e) => setRepeations(e.target.value)}
                                       />
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="progress-plus"
                                    onClick={() => {setRepeations(+repeations + 1)}}>+</div>
                                <div className="progress-minus"
                                    onClick={() => {repeations <= 0 ? setRepeations(0) : setRepeations(repeations - 1)}}>—</div>
                            </div>
                        </div>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-border' 
                        style={{border:'1px solid #c43def'}} 
                        onClick={() => {onHide(); setWeightInventory(defaultWeightInventory); 
                                        setDefaultRepeations(dafaultRepeations)}}
                                        >
                        Отмена
                </Button>
                <Button className='btn-border' 
                        onClick={() => {onHide(); 
                                        addProgressOfExercise();
                                        
                        }}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
        
        <Calculator show={calculator} onHide={() => setCalculator(false)} setActiveProgressModal={setActiveProgressModal}/>
        
        </>
    )
}

export default Progress

{/*             <Modal show={show} onHide={onHide} className='progress'>
            <Modal.Header>
                <div>
                    <Modal.Title>{numberOfApproach}</Modal.Title>
                    <div className="name-exercise" style={{fontSize:'16px', color:'rgb(108, 117, 125)', fontWeight:'400'}}>{currentExerciseName}</div>
                </div>
                <div className="calculator" style={{flex:'0 0 30px'}}>
                    <img src={calc} alt="calculate" style={{width:'100%', height:'100%'}}/>
                </div>
            </Modal.Header>
            <Modal.Body style={{color:'white', border: 'none'}}>
                <div className="progress-content">
                    <Row>
                        <div className="progress-content-input d-flex align-items-center justify-content-between">
                            <div className='d-flex align-items-center'>
                                <label htmlFor="weight" style={{marginRight:'35px'}}>КГ</label>
                                <input id="progress-weight" 
                                       type="number" 
                                       style={{marginTop:'0'}}
                                       onChange={(e) => setWeightInventory(e.target.value)}
                                       placeholder='Вес инвенторя'
                                       value={weightInventory}/>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="progress-plus"
                                    onClick={() => {setWeightInventory(+weightInventory + 1)}}>+</div>
                                <div className="progress-minus"
                                    onClick={() => {weightInventory <= 0 ? setWeightInventory(0) : setWeightInventory(weightInventory - 1)}}>—</div>
                            </div>
                        </div>
                    </Row>
                    <Row className='mt-4'>
                        <div className="progress-content-input d-flex align-items-center justify-content-between">
                            <div className='d-flex align-items-center'>
                                <label htmlFor="repeations" style={{marginRight:'15px'}}>ПОВТ</label>
                                <input id="repeations" 
                                        placeholder="количество повт"
                                       type="number" 
                                       style={{marginTop:'0'}}
                                       onChange={(e) => setRepeations(e.target.value)}
                                       value={repeations}/>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="progress-plus"
                                    onClick={() => {setRepeations(+repeations + 1)}}>+</div>
                                <div className="progress-minus"
                                    onClick={() => {repeations <= 0 ? setRepeations(0) : setRepeations(repeations - 1)}}>—</div>
                            </div>
                        </div>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-border' 
                        style={{border:'1px solid #c43def'}} 
                        onClick={() => {onHide(); setWeightInventory(defaultWeightInventory); 
                                        setDefaultRepeations(dafaultRepeations)}}
                                        >
                        Отмена
                </Button>
                <Button className='btn-border' 
                        onClick={() => {onHide(); 
                                        addProgressOfExercise();
                                        
                        }}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal> */}