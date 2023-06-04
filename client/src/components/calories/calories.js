import { useState } from "react";
import { Modal, Button, Row} from "react-bootstrap";
import calc from '../calculate/img/calc.png'

const Calories = () => {

    const [weightCalories, setWeightColories] = useState(0);
    const [heightCalories, setHeightColories] = useState(0);
    const [ageCalories, setAgeColories] = useState(0);
    const [activity, setActivity] = useState('Cидячий образ жизни');
    const [gender, setGender] = useState('Мужчина');
    const [target, setTarget] = useState('Поддерживать вес');

    const [calories, setCalories] = useState(0);

    const [activeDef, setActiveDef] = useState(false);
    const [activeNed, setActiveNed] = useState(false)
    const [activeNor, setActiveNor] = useState(false)
    const [activeIzb, setActiveIzb] = useState(false)
    const [activeOz1, setActiveOz1] = useState(false)
    const [activeOz2, setActiveOz2] = useState(false)
    const [activeOz3, setActiveOz3] = useState(false)

    const [imt, setImt] = useState()

    const calcImt = (height, weight, ageCalories, activity, gender, target) => {
        let BMR = 0
        if (gender === 'Мужчина') {
            BMR = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * ageCalories) 
        } else if (gender === 'Женщина') {
            BMR = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * ageCalories)
        }

        if (activity === 'Сидячий образ жизни') {
            BMR = BMR * 1.2
        } else if (activity === 'Легкая (спорт 1-3 раз/нед)') {
            BMR = BMR * 1.375
        } else if (activity === 'Средняя (спорт 3-5 раз/нед)') {
            BMR = BMR * 1.55
        } else if (activity === 'Высокая (спорт 6-7 раз/нед)') {
            BMR = BMR * 1.725
        } else if (activity === 'Максимальная (тяж. нагр. 2 раз/день)') {
            BMR = BMR * 1.9
        }

        if (target === 'Поддерживать вес') {
            setCalories(Math.round(BMR))
        } else if (target === 'Набрать вес') {
            setCalories(Math.round(BMR + 500))
        } else if (target === 'Сбросить вес') {
            setCalories(Math.round(BMR - 750))
        }

        let IMT;
        if (height !== 0 && weight !== 0) {
            IMT = (weight / Math.pow(height/100, 2)).toFixed(2);
            if (IMT <= 16) {
                setActiveDef(true)
                setActiveNed(false)
                setActiveNor(false)
                setActiveIzb(false)
                setActiveOz1(false)
                setActiveOz2(false)
                setActiveOz3(false)
                setImt(IMT)
            }
            if (IMT > 16 && IMT < 18.5) {
                setActiveNed(true)
                setActiveDef(false)
                setActiveNor(false)
                setActiveIzb(false)
                setActiveOz1(false)
                setActiveOz2(false)
                setActiveOz3(false)
                setImt(IMT)
            }
            if (IMT >= 18.5 && IMT < 25) {
                setActiveNed(false)
                setActiveDef(false)
                setActiveNor(true)
                setActiveIzb(false)
                setActiveOz1(false)
                setActiveOz2(false)
                setActiveOz3(false)
                setImt(IMT)
            }
            if (IMT >= 25 && IMT < 30) {
                setActiveNed(false)
                setActiveDef(false)
                setActiveNor(false)
                setActiveIzb(true)
                setActiveOz1(false)
                setActiveOz2(false)
                setActiveOz3(false)
                setImt(IMT)
            }
            if (IMT >= 30 && IMT < 45) {
                setActiveNed(false)
                setActiveDef(false)
                setActiveNor(false)
                setActiveIzb(false)
                setActiveOz1(true)
                setActiveOz2(false)
                setActiveOz3(false)
                setImt(IMT)
            }
            if (IMT >= 35 && IMT < 40) {
                setActiveNed(false)
                setActiveDef(false)
                setActiveNor(false)
                setActiveIzb(false)
                setActiveOz1(false)
                setActiveOz2(true)
                setActiveOz3(false)
                setImt(IMT)
            }
            if (IMT >= 40) {
                setActiveNed(false)
                setActiveDef(false)
                setActiveNor(false)
                setActiveIzb(false)
                setActiveOz1(false)
                setActiveOz2(false)
                setActiveOz3(true)
                setImt(IMT)
            }


        } else {
                setActiveNed(false)
                setActiveDef(false)
                setActiveNor(false)
                setActiveIzb(false)
                setActiveOz1(false)
                setActiveOz2(false)
                setActiveOz3(false)
                setActivity('Сидячий образ жизни');
                setGender('Мужчина');
                setTarget('Поддерживать вес');
                setImt(0)
        }
    }

    return(
        <>
            <div className="calories-content d-flex flex-column" 
                style={{backgroundColor:'rgb(48 48 48)', position:'relative', padding:'20px 10px 50px'}}>
                <div className='d-flex align-items-center'>
                    <div className="d-flex flex-column calories-label">
                        <div style={{color:'#d2d2d2', fontSize:' 10px'}}>
                                Рост, см
                        </div>
                        <input type="number" name='calories-height' id='calories-height'
                            onChange={(e) => setHeightColories(e.target.value)}
                            value={(heightCalories)}/>
                    </div>
                    <div className="d-flex flex-column calories-label" style={{ margin:'0 10px' }}>
                        <div style={{color:'#d2d2d2', fontSize:' 10px'}}>
                                Вес, кг
                        </div>
                        <input type="number" name='calories-weight' id='calories-weight'
                            onChange={(e) => setWeightColories(e.target.value)}
                            value={weightCalories}/>
                    </div>
                    <div className="d-flex flex-column calories-label">
                        <div style={{color:'#d2d2d2', fontSize:' 10px'}}>
                                Возраст
                        </div>
                        <input type="number" name='calories-age' id='calories-age'
                            onChange={(e) => setAgeColories(e.target.value)}
                            value={ageCalories}/>
                    </div>
                </div>
                <div className='d-flex align-items-center' style={{marginTop:'20px'}}>
                    <div className="d-flex flex-column calories-label" style={{flex: '0 1 33.333%'}}>
                        <div style={{color:'#d2d2d2', fontSize:' 10px'}}>
                            Активность
                        </div>
                        <select style={{borderBottom: '1px solid #c43def', 
                                        backgroundColor: 'transparent', 
                                        color: '#c43def',
                                        padding:'5px 10px', width:'100%'}}
                                        value={activity} onChange={e => setActivity(e.target.value)}
                               >
                            <option>Сидячий образ жизни</option>
                            <option>Легкая (спорт 1-3 раз/нед)</option>
                            <option>Средняя (спорт 3-5 раз/нед)</option>
                            <option>Высокая (спорт 6-7 раз/нед)</option>
                            <option>Максимальная (тяж. нагр. 2 раз/день)</option>
                        </select>
                    </div>
                    <div className="d-flex flex-column calories-label" style={{margin:'0 10px', flex: '0 1 33.333%'}}>
                        <div style={{color:'#d2d2d2', fontSize:' 10px'}}>
                                Пол
                        </div>
                        <select style={{borderBottom: '1px solid #c43def', 
                                        backgroundColor: 'transparent', 
                                        color: '#c43def',
                                        padding:'5px 10px', width:'100%'}}
                                        value={gender} onChange={e => setGender(e.target.value)}
                               >
                            <option>Мужчина</option>
                            <option>Женщина</option>
                        </select>
                    </div>
                    <div className="d-flex flex-column calories-label" style={{flex:'0 1 33.333%'}}>
                        <div style={{color:'#d2d2d2', fontSize:' 10px'}}>
                                Цель
                        </div>
                        <select style={{borderBottom: '1px solid #c43def', 
                                        backgroundColor: 'transparent', 
                                        color: '#c43def',
                                        padding:'5px 10px', width:'100%'}}
                                        value={target} onChange={e => setTarget(e.target.value)}
                               >
                            <option>Поддерживать вес</option>
                            <option>Набрать вес</option>
                            <option>Сбросить вес</option>
                        </select>
                    </div>
                </div>
               
                    <div className="calculate-icon d-flex align-items-center justify-content-center" 
                        style={{width:'60px', height:'60px', position:'absolute',
                        right:'15px', bottom:'-17%', 
                        backgroundColor:'rgb(75 75 75)', 
                        boxShadow:'3px 5px 15px rgb(28 28 28)', 
                        borderRadius:'50%', cursor:'pointer'}}
                        onClick={() => calcImt(heightCalories, weightCalories, ageCalories, activity, gender, target)}>
                        <img src={calc} alt="" style={{width:'30px', height:'30px'}}/>
                    </div>
                
            </div>
            <div className="calogies-content d-flex flex-column" style={{marginTop:'60px', padding:'0 10px'}}>
                <div style={{fontSize:'12px', color:'#808080'}}>ИНДЕКС МАССЫ ТЕЛА (ИМТ)</div>
                <div className="scale d-flex mt-3">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div>{'<16'}</div>
                        <span className={activeDef ? 'active scale-span' : 'scale-span'}></span> 
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div>{'<18.5'}</div>
                        <span className={activeNed ? 'active scale-span' : 'scale-span'}></span> 
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div>18,5–25</div>
                        <span className={activeNor ? 'active scale-span' : 'scale-span'}></span>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div>25–30</div>
                        <span className={activeIzb ? 'active scale-span' : 'scale-span'}></span> 
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div>30–35</div>
                        <span className={activeOz1 ? 'active scale-span' : 'scale-span'}></span> 
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div>35–40</div>
                        <span className={activeOz2 ? 'active scale-span' : 'scale-span'}></span>  
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div>{'>40'}</div>
                        <span className={activeOz3 ? 'active scale-span' : 'scale-span'}></span>  
                    </div>
                    
                </div>
                <div className="rezult">
                    {activeDef ? 
                        <div className="def d-flex align-items-center">
                            <span>{imt}</span>
                            <div>
                            Выраженный дефицит массы тела
                        </div>
                        </div>
                        : <></>
                    }  
                    {activeNed ? 
                    <div className="ned d-flex align-items-center">
                         <span>{imt}</span>
                        <div>
                            Недостаточная масса тела (дефицит)
                        </div>  </div>: <></>
                    }  
                    {activeNor ? 
                     <div className="nor d-flex align-items-center">
                         <span>{imt}</span>
                        <div>
                            Норма
                        </div> </div> : <></>
                    }   
                    {activeIzb ? 
                     <div className="izb d-flex align-items-center">
                        <span>{imt}</span>
                        <div >
                            Избыточная масса тела (состояние, предшествующее ожирению)
                        </div></div> : <></>
                    }  
                    {activeOz1 ? 
                     <div className="oz1 d-flex align-items-center">
                     <span>{imt}</span>
                        <div className="def">
                            Ожирение 1-й степени
                        </div> </div>: <></>
                    }  
                    {activeOz2 ? 
                     <div className="oz2 d-flex align-items-center">
                     <span>{imt}</span>
                        <div className="def">
                            Ожирение 2-й степени
                        </div></div> : <></>
                    } 
                    {activeOz3 ? 
                     <div className="oz3 d-flex align-items-center">
                     <span>{imt}</span>
                        <div className="def">
                            Ожирение 3-й степени
                        </div></div> : <></>
                    } 
                </div>
            </div>
            <div className="calogies-content d-flex flex-column" style={{marginTop:'30px', padding:'0 10px'}}>
                <div style={{fontSize:'12px', color:'#808080', marginBottom:'30px'}}>СУТОЧНАЯ НОРМА КАЛОРИЙ</div>
                <div className="calories-days d-flex flex-column align-items-center justify-content-between" style={{flex:'0 1 33.333$'}}>
                    <div className="item-calories d-flex flex-column p-3 align-items-center"
                        style={{ backgroundColor:'rgb(75 75 75)', 
                        width:'33.3333%',
                        height:'80px',
                        boxShadow:'3px 5px 15px rgb(28 28 28)', borderRadius:'10px'}}>
                        <div className="total-calories-title" style={{fontSize:'8px', color:'#808080'}}>КАЛОРИИ</div>
                        <div className="total-count" style={{fontSize:'18px'}}>
                            {calories}<span style={{fontSize:'8px', marginLeft:'5px'}}>ккал</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 calories-days d-flex align-items-center justify-content-between">
                    <div className="item-calories d-flex flex-column p-3 align-items-center me-3  justify-content-center"
                        style={{ backgroundColor:'rgb(75 75 75)', 
                        flex:'0 1 33.333%',
                        height:'80px',
                        boxShadow:'3px 5px 15px rgb(28 28 28)', borderRadius:'10px'}}>
                        <div className="total-calories-title" style={{fontSize:'8px', color:'#808080'}}>БЕЛКИ</div>
                        <div className="total-count" style={{fontSize:'18px'}}>
                            {`${Math.round(calories * 10 / 100 / 4) }-${Math.round(calories * 15 / 100 / 4)}`}<span style={{fontSize:'8px', marginLeft:'5px'}}>гр</span>
                        </div>
                    </div>
                    <div className="item-calories d-flex flex-column p-3 align-items-center me-3  justify-content-center"
                        style={{ backgroundColor:'rgb(75 75 75)', 
                        flex:'0 1 33.333%',
                        height:'80px',
                        boxShadow:'3px 5px 15px rgb(28 28 28)', borderRadius:'10px'}}>
                        <div className="total-calories-title" style={{fontSize:'8px', color:'#808080'}}>ЖИРЫ</div>
                        <div className="total-count" style={{fontSize:'18px'}}>
                        {`${Math.round(calories * 20 / 100 / 9)}-${Math.round(calories * 30 / 100 / 4)}`}<span style={{fontSize:'8px', marginLeft:'5px'}}>гр</span>
                        </div>
                    </div>
                    <div className="item-calories d-flex flex-column p-3 align-items-center justify-content-center"
                        style={{ backgroundColor:'rgb(75 75 75)', 
                        flex:'0 1 33.333%',
                        height:'80px',
                        boxShadow:'3px 5px 15px rgb(28 28 28)', borderRadius:'10px'}}>
                        <div className="total-calories-title" style={{fontSize:'8px', color:'#808080'}}>УГЛЕВОДЫ</div>
                        <div className="total-count" style={{fontSize:'18px'}}>
                        {`${Math.round(calories * 55 / 100 / 4)}-${Math.round(calories * 65 / 100 / 4)}`}<span style={{fontSize:'8px', marginLeft:'5px'}}>гр</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calories;