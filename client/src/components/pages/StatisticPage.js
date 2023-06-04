import { Modal, Button, Row} from "react-bootstrap";
import arrow from '../calculate/img/arrow.png';
import calc from '../calculate/img/calc.png'
import '../calculate/calculate.scss';
import { useContext, useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from "react-router-dom";
import Calories from "../calories/calories";
import { Context } from "../..";
import { getTrainings } from "../../https/TrainingApi";
import { getallexercisesofuser } from "../../https/ExercisesInTrainingApi";
import StatisticExercisesList from "../statisticExercisesList/statisticexercisesList";
import { getTypesOfExercise } from "../../https/TypesApi";


const StatisticPage = () => {
    const [show, onHide] = useState(true);
    const {user} = useContext(Context);
    const [trainings, setTtainings] = useState([]);

    const [totalExercises, setTotalExercises] = useState();
    const [exercisesList, setExercisesList] = useState([]);
    const [countExercise, setCountExercise] = useState()
    const [types, setTypes] = useState([])

    const typesStatystic = async () => {
        const promises = [];
        getTrainings(user.userId).then(data => {
            setTtainings(data)

            getallexercisesofuser(data).then(data => {
                
                setTotalExercises(data.length)

                // Количествоу упражнений
                let countById = data.reduce((count, obj) => {
                    count[obj.id] = (count[obj.id] || 0) + 1;
                    return count;
                  }, {});
                  setCountExercise(countById)
                  
                  // Фильтрация массива, исключая дубликаты объектов
                  let filteredArray = data.filter((obj, index, self) => {
                    return index === self.findIndex((o) => o.id === obj.id);
                  });

                  setExercisesList(filteredArray)
                  
                  getTypesOfExercise(filteredArray).then(data => {
                    let filteredArray = data.filter((obj, index, self) => {
                        return index === self.findIndex((o) => o.id === obj.id);
                      });
                      setTypes(filteredArray)
                  })
            })
        })
    }

    useEffect(() => {
        typesStatystic()
    }, [user])

    return(
        <Modal show={show} onHide={onHide} className="staticstic-modal">
            <Modal.Header className='d-flex align-items-center justify-content-between'>
                <div className="calculator-left d-flex align-items-center">
                    <a href="/" className="calculator-back" style={{flex:'0 0 20px', marginRight:'20px', cursor:'pointer'}}
                    onClick={onHide}>
                        <img src={arrow} alt="" style={{width:'100%', height:'100%'}}/>
                    </a>
                    <Modal.Title>Статистика</Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body style={{color:'white', border: 'none'}} className='exercises-modal'>
                
                <StatisticExercisesList trainings={trainings} exercises={exercisesList} countExercise={countExercise} types={types}/>

            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-border' style={{border:'1px solid #c43def'}} onClick={onHide}>
                    <a href="/" style={{color:'white'}}>Назад</a>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default StatisticPage;