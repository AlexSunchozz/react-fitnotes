import './exercisesWithType.scss';
import plus from './img/plus.png';
import search from './img/search.png';
import arrow from './img/arrow.png';
import { Modal, Button, Row} from "react-bootstrap";
import { useState, useContext, useEffect, useRef } from 'react';
import ExercisesList from '../exercisesList/exercisesList';
import { Context } from "../../index";
import { fetchExercisesWithType, getAll } from "../../https/exercisesApi";
import { observer } from 'mobx-react-lite';
import { addTraining } from '../../https/ExercisesInTrainingApi';
import { fetchMuscle } from '../../https/musculApi';
import { getType } from '../../https/customExerciseApi';
import { getExercises } from "../../https/customExerciseApi"
import CustomExercises from '../customExercises/customExercises';


const ExercisesWithType = observer(({customEx, setCustomEx, saveExInTraining, setSaveExInTraining, typeName, typeId, show, onHide}) => {

    const [term, setTerm] = useState('');
    const [activeSearch, setActiveSearch] = useState(false);
    const {exercises, user, musculs, addExersisesInTrainingStore, CustomExercisesOfUserStore} = useContext(Context);
    const [filterEx, setFilter] = useState(0);
    const [custom, setCustom] = useState()

    //Modal Custom Exercises
    const [activeCustomModal, setActiveCustomModal] = useState(false);

    const handleClick = (exercise) => {

        const valide = saveExInTraining.find(el => el.id === exercise.id)

        if (valide) {

            let exerciseArr = saveExInTraining.filter(el => el.id !== exercise.id)
            setSaveExInTraining(exerciseArr)

        } else {
            setSaveExInTraining([...saveExInTraining, exercise])
        }
    }


    useEffect(() => {
        
        fetchExercisesWithType(typeId).then(data => {

            exercises.setExercises(data); 
     
            let promises = [];

            data.forEach((exercise, i) => {
                promises.push(fetchMuscle(exercise.targetmuscleId));
            })

            let musculsNames = Promise.all(promises).then(data => {
                data.forEach(name => {
                    if (musculs.musculs.indexOf(name[0].name) == -1) {
                        musculs.puschMusculs(name[0].name)
                    } 
                })
            });
        });

        return () => {
            exercises.setExercises([]);
            musculs.clearMusculs();
        }
    },[typeId])

    const onUpdateSearch = (e) => {
        const term = e.target.value;
        setTerm(term);
    }

    return(
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header className='d-flex flex-column'>
                    <Row className='d-flex justify-content-between' style={{width: '100%'}}>
                        <Row className="top d-flex justify-content-between align-items-center">
                            <div className="left-title d-flex align-items-center" style={{flex:"0 1 50%"}}>
                                <div className="arrow" onClick={onHide} 
                                                    style={{flex:'0 0 20px', 
                                                    marginRight: '20px', 
                                                    cursor: 'pointer'}}>
                                    <img style={{width: '100%', 
                                        height: '100%'}} 
                                        src={arrow} alt="" /></div>
                                <Modal.Title>{typeName}</Modal.Title>
                            </div>
                            <div className="left-title d-flex align-items-center justify-content-end" style={{flex:"0 1 50%"}}>
                                <div className="search" 
                                    style={{flex: '0 0 20px', 
                                    marginRight: '20px', 
                                    cursor: 'pointer'}} 
                                    onClick={() => {
                                        if (activeSearch) {
                                            setTerm('')
                                            setActiveSearch('')
                                        } else setActiveSearch(!activeSearch)}
                                    }>
                                        <img style={{width: '100%', height: '100%'}} src={search} alt="" />
                                    </div>
                                {/* <div className="add-custom" style={{flex: '0 0 20px'}}>
                                    <img style={{width: '100%', height: '100%', cursor: 'pointer'}} 
                                        src={plus} alt="" 
                                        onClick={() => setActiveCustomModal(!activeCustomModal)}/>
                                </div> */}
                            </div>
                        </Row>
                        <Row>
                            <input type="text" value={term} onChange={onUpdateSearch} placeholder='Грудь' className={activeSearch ? 'input-search active' : 'input-search'}/>
                        </Row>
                    </Row>
                    <Row  style={{width: '100%'}}>
                        <div className="filter-content mt-4 d-flex align-items-senter flex-wrap">
                        <div style={{margin:'0 10px 10px 0'}}>
                            <div onClick={() => setFilter(0)} className="filter-content-item active">Все</div>
                        </div>
                            {musculs.musculs.map((muscul, i) => 
                                <div style={{margin:'0 10px 10px 0'}}>
                                    <div onClick={() => setFilter(i+1)} className="filter-content-item active mb-2" key={i}>{muscul}</div>
                                </div>
                            )}
                            {custom ?
                            <div style={{margin:'0 10px 10px 0'}}>
                                <div onClick={() => setFilter(15)} className="filter-content-item active">Ваши упражнения</div>
                            </div> : <></>
                            }
                        </div>
                    </Row>
                </Modal.Header>
                <Modal.Body style={{color:'white', border: 'none'}} className='exercises-modal'>
                    <ExercisesList 
                        term={term} 
                        activeFilter={filterEx} 
                        setFilter={setFilter} 
                        handleClick={handleClick} 
                        typeId={typeId}
                        saveExInTraining={saveExInTraining}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-border' style={{border:'1px solid #c43def'}} onClick={onHide}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={() => {
                        onHide();
                    }} style={{border:'none'}}>
                        {`Добавить ${saveExInTraining.length}`}
                    </Button>
                </Modal.Footer>
            </Modal>
            {
                <CustomExercises customEx={customEx} setCustomEx={setCustomEx} typeId={typeId} show={activeCustomModal} onHide={() => setActiveCustomModal(false)}/>
            }
        </> 
    )
})

export default ExercisesWithType;