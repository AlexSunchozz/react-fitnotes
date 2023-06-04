import { Modal, Button, Row} from "react-bootstrap";
import arrow from '../calculate/img/arrow.png';
import calc from '../calculate/img/calc.png'
import '../calculate/calculate.scss';
import { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from "react-router-dom";
import Calories from "../calories/calories";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { MAIN_ROUTE } from "../utils/consts";

let calcul = [];

const CalculatorPage = () => {
    const [weight, setWeight] = useState(0);
    const [repition, setRepition] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    const [calculArr, setCalc] = useState([])
    const [activeCalories, setCaloriesActive] = useState(false);
    const [show, onHide] = useState(true)
    
    const history = useHistory()

    const checkWeight = () => {
        if (weight <=0 ) {
            setWeight(0)
        } else {
            setWeight(weight - 1);
            calculating(+weight, +repition)
        }
    }

    const checkWarning = () => {
        if (repition >= 15) {
            setRepition(15); 
            setShowWarning(true);
            calculating(weight, repition)
        } else {
            calculating(weight, repition)
            setRepition(repition + 1)
        }
    }

    const checkRepeations = () => {
        if (repition <= 0) {
            setRepition(0);
            setShowWarning(false);
            calculating(+weight, +repition)
        } else {
            setRepition(repition - 1);
            setShowWarning(false);
            calculating(weight, repition)
        }
    }



    const calculating = (weight, repeation) => {
        if (weight !== 0 && repeation !==0) {
            const RM = Math.round(weight * (36 / (37 - repeation)));
            let i = 15;
            while (i >= 2) {
                if (i === repeation) {
                    calcul.push({repition: repeation, weight: weight})
                    i--
                } else {
                    let w = RM * (37 - i) / 36
                    if (w % 10 < 5) {
                        w = Math.round(w)
                    } else if (w % 10 >= 5) {
                        w = Math.round(w)
                    }
                    calcul.push({repition: i, weight: w})
                    i--
                }
            }
    
            calcul.push({repition: 1, weight: RM})
            console.log(calcul)
            setCalc(calcul)
            calcul = []
        } else {
            setCalc([])
        }
        
    }

    return(
        <Modal show={show} onHide={onHide} className={calculArr.length !== 0 ? "calc-modal active" : "calc-modal"}>
            <Modal.Header className='d-flex align-items-center justify-content-between'>
                <a href="/" className="calculator-left d-flex align-items-center" style={{color:'white'}}>
                    <div className="calculator-back" style={{flex:'0 0 20px', marginRight:'20px', cursor:'pointer'}}
                    >
                        <img src={arrow} alt="" style={{width:'100%', height:'100%'}}/>
                    </div>
                    <Modal.Title>Калькулятор</Modal.Title>
                </a>
            </Modal.Header>
            <Modal.Body style={{color:'white', border: 'none'}} className='exercises-modal'>
                <Tabs
                    defaultActiveKey="Рабочий вес"
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                    >
                    <Tab eventKey="Рабочий вес" title="Рабочий вес">
                        <div className="calculator-content d-flex flex-column" 
                            style={{backgroundColor:'rgb(48 48 48)', position:'relative'}}>
                            <Row className='d-flex align-items-center justify-content-between'>
                                <div className="d-flex align-items-center prog-label" style={{width:'fit-content', padding:'15px 0 15px 40px'}}>
                                    <div className="me-4">
                                            ВЕС
                                    </div>
                                    <input type="number" name='calc-weight' id='calc-weight'
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}/>
                                </div>
                                <div className="d-flex align-items-center plus-minus-prog" style={{width:'fit-content', paddingRight:'40px'}}>
                                    <div className="progress-plus"
                                        onClick={() => {setWeight(weight + 1); calculating(+weight, +repition)}}>+</div>
                                    <div className="progress-minus"
                                        onClick={() => {checkWeight()}}>—</div>
                                </div>
                            </Row>
                            <Row className='mt-0 d-flex align-items-center justify-content-between'>
                                <div className="d-flex d-flex align-items-center prog-label" style={{width:'fit-content',  padding:'5px 0 40px 40px'}}>
                                    <div className="me-4">
                                            ПВТ
                                    </div>
                                    <input type="number" name='calc-repition' id='calc-repition'
                                        value={repition}
                                        onChange={(e) => setRepition(e.target.value)}/>
                                </div>
                                <div className="d-flex align-items-center plus-minus-prog" style={{width:'fit-content', paddingRight:'40px'}}>
                                    <div className="progress-plus"
                                        onClick={() => {checkWarning()}}>+</div>
                                    <div className="progress-minus"
                                        onClick={() => {checkRepeations()}}>—</div>
                                </div>
                            </Row>
                            {showWarning ? <></> : <div className="calculate-icon d-flex align-items-center justify-content-center" style={{width:'60px', height:'60px', position:'absolute',
                                right:'15px', bottom:'-17%', 
                                backgroundColor:'rgb(75 75 75)', boxShadow:'3px 5px 15px rgb(28 28 28)', borderRadius:'50%', cursor:'pointer'}}>
                                <img src={calc} alt="" style={{width:'30px', height:'30px'}}
                                onClick={() => calculating(+weight, +repition)}/>
                            </div>}
                        </div>
                        {showWarning ? 
                            <div className="warning mt-4" style={{color:'#d2d2d2', 
                            textAlign:'center'}}>
                                Число повторений не должно превышать 15 для корректных результатов</div> 
                        :
                        <></>
                        }
                        <div className="calculator-content" style={{marginTop:'60px', padding:'0 30px'}}>
                            {calculArr.length > 0 ? <div className="titles d-flex">
                                <div className="rep" style={{color:'#d2d2d2', 
                                    
                                    textAlign:'center', flex:'0 1 50%'}}>Повторения</div>   
                                <div className="wei"
                                    style={{color:'#d2d2d2', 
                                    textAlign:'center', flex:'0 1 50%'}}>Расчетный рабочий вес</div>
                            </div> : <></>}
                            {calculArr.length > 0 ? 
                                <div className="calculating d-flex flex-column mt-2">
                                {
                                    calculArr.map(element => 
                                        <div className="d-flex align-items-center" style={{padding:'5px 0'}}>
                                            <div className="repitions-calc">
                                                {element.repition}
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center" style={{flex:'0 1 50%'}}>
                                                <div className="weight-calc me-4">
                                                    {element.weight}
                                                </div>
                                                <div className="kg">кг</div>
                                            </div>
                                        </div>    
                                    )
                                }
                            </div> : <></>}
                        </div>
                    </Tab>
                    <Tab eventKey="Масса, калории и пульс" title="Масса, калории и пульс">
                        <Calories activeCalories={activeCalories}/>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-border' style={{border:'1px solid #c43def'}}>
                    <a href="/" style={{color:'white'}}>Назад</a>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CalculatorPage;