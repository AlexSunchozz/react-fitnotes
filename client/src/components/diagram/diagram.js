import { Modal, Button, Row} from "react-bootstrap";
import arrow from '../calculate/img/arrow.png';
import { useEffect, useState } from "react";
import ChartComponent from "../bar/char";
import { findProgressOfExercise } from "../../https/ProgressApi";
import './diagram.scss'

const Diagram = ({trainings, show, onHide, exercisename, exerciseId}) => {
    
    const [filter, setFilter] = useState("Макс. вес");
    const [chartData, setChartData] = useState({ labels: [], values: [] });
    const [nameExercise, setNameExercise] = useState()
    const [progressOfExercise, setProgressOfExercise] = useState([]);
    const [maxWeight, setMaxWeight] = useState(0);
    const [maxRepititions, setMaxRepititions] = useState(0);
    const [maxWeightDate, setMaxWeightDate] = useState();
    const [maxRepititionsDate, setMaxRepititionsDate] = useState();
    const [totalRepetition, setTotalRepetition] = useState(0);
    const [numberApproach, setNumberApproach] = useState(0);
    const [loading, setLoading] = useState(true)

    const updateChartData = () => {
        if (filter === "Макс. вес") {
            const { labels, values } = filterData("weightofinventory", progressOfExercise);
            const formattedLabels = formatDate(labels);
            setChartData({ labels: formattedLabels, values: values });
        } else if (filter === "Макс. число повторений") {
            const { labels, values } = filterData("repetition", progressOfExercise);
            
            const formattedLabels = formatDate(labels).reverse();
            
            setChartData({ labels: formattedLabels, values: values });
        }
    };

    const filterData = (property, data) => {
        // Группировка объектов по дате
        const groupedData = data.reduce((groups, obj) => {
        const date = obj.date || 'Unknown';
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(obj);
        return groups;
        }, {});
    
        // Фильтрация данных и выбор объекта с максимальным значением свойства
        const filteredData = Object.keys(groupedData).map((date) => {
        const objects = groupedData[date];
        const maxObject = objects.reduce((maxObj, obj) => {
            const value = parseInt(obj[property]);
            const maxValue = parseInt(maxObj[property]);
            return value > maxValue ? obj : maxObj;
        }, objects[0]);
        return { date, [property]: parseInt(maxObject[property]) };
        });
    
        // Создание массива меток и массива значений для графика
        const labels = filteredData.map((obj) => obj.date);
        const values = filteredData.map((obj) => obj[property]);
    
        return { labels, values };
    };

    useEffect(() => {
        if (loading) {
            setNameExercise(exercisename)
            if (trainings && exerciseId) {
                findProgressOfExercise(trainings, exerciseId).then(data => {

                    const maxWeight = Math.max(...data.map((item) => parseInt(item.weightofinventory)));
                    const maxRepetition = Math.max(...data.map((item) => item.repetition));

                    // Подсчет суммы repetition
                    const totalRepetition = data.reduce((sum, item) => sum + item.repetition, 0);
                    // Фильтруем объекты с максимальными значениями
                    const maxWeightItems = data.filter(item => parseInt(item.weightofinventory) === maxWeight);
                    const maxRepetitionItems = data.filter(item => item.repetition === maxRepetition);

                    // Получаем даты для объектов с максимальными значениями weightofinventory
                    const maxWeightDates = maxWeightItems.map(item => item.date);

                    // Получаем даты для объектов с максимальными значениями repetition
                    const maxRepetitionDates = maxRepetitionItems.map(item => item.date);
                
                    setMaxRepititionsDate(formatDate(maxRepetitionDates)[formatDate(maxRepetitionDates).length-1]);
                    setMaxWeightDate(formatDate(maxWeightDates)[formatDate(maxWeightDates).length-1]);
                    setMaxWeight(maxWeight);
                    setMaxRepititions(maxRepetition);
                    setTotalRepetition(totalRepetition);
                    setNumberApproach(data.length);

                    setProgressOfExercise(data)
                })
                setLoading(false)
        }}
        
   
    }, [trainings, exerciseId, loading])
    
    useEffect(() => {

        if (progressOfExercise.length > 0) {
            updateChartData();
        } else {
            setMaxRepititions(0)
            setMaxWeight(0)
        }

    }, [filter, progressOfExercise]);
      
    const formatDate = (labels) => {
        if (!labels) {
            return [];
        }
        return labels.map((label) => {
            if (label === "Unknown") {
            return label; // Если значение метки "Unknown", оставляем его без изменений
            } else {
            const date = new Date(label);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}.${month}.${year}`; // Форматируем дату в формат "д.м.г"
            }
        });
    };

    return (
        <Modal show={show} onHide={onHide} className="diagram-modal">
            <Modal.Header className='d-flex align-items-center justify-content-between'>
                <div className="calculator-left d-flex align-items-center">
                    <a href="/statistic" className="calculator-back" style={{flex:'0 0 20px', marginRight:'20px', cursor:'pointer'}}>
                        <img src={arrow} alt="" style={{width:'100%', height:'100%'}}/>
                    </a>
                    <Modal.Title>{nameExercise}</Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body style={{color:'white', border: 'none'}} className='exercises-modal'>
               
                <ChartComponent setFilter={setFilter} filter={filter}  labels={chartData.labels} values={chartData.values}/>
                
                <div className="d-flex flex-column p-4">
                    <div className="d-flex mb-4">
                        <div className="me-3 item-calories d-flex flex-column p-3 align-items-center justify-content-center"
                            style={{ backgroundColor:'rgb(75 75 75)', 
                            flex:'0 1 50%',
                            boxShadow:'3px 5px 15px rgb(28 28 28)', borderRadius:'10px'}}>
                            <div className="total-calories-title mb-1 text-center d-flex align-items-center" style={{fontSize:'10px', color:'#808080'}}>МАКС. ВЕС</div>
                            <div className="total-count d-flex flex-column align-items-center justify-content-center" style={{fontSize:'18px'}}>
                                <div className="weight  mb-1">{maxWeight} кг</div>
                                <div className="dateWeight mb-2" style={{color:'green', fontSize:'12px', letterSpacing:'1px', fontWeight:'700'}}>{maxWeightDate}</div>
                            </div>
                        </div>
                        <div className="item-calories d-flex flex-column p-3 align-items-center justify-content-center"
                            style={{ backgroundColor:'rgb(75 75 75)', 
                            flex:'0 1 50%',
                            boxShadow:'3px 5px 15px rgb(28 28 28)', borderRadius:'10px'}}>
                            <div className="total-calories-title mb-1 text-center d-flex align-items-center" style={{fontSize:'10px', color:'#808080'}}>МАКС. ПОВВТОРЕНИЙ</div>
                            <div className="total-count d-flex flex-column align-items-center justify-content-center" style={{fontSize:'18px'}}>
                                <div className="weight mb-1">{maxRepititions} повт</div>
                                <div className="dateWeight mb-2" style={{color:'green', fontSize:'12px', letterSpacing:'1px', fontWeight:'700'}}>{maxRepititionsDate}</div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="me-3 item-calories d-flex flex-column p-3 align-items-center justify-content-center"
                            style={{ backgroundColor:'rgb(75 75 75)', 
                            flex:'0 1 50%',
                            height:'80px',
                            boxShadow:'3px 5px 15px rgb(28 28 28)', borderRadius:'10px'}}>
                            <div className="total-calories-title mb-1 text-center d-flex align-items-center" style={{fontSize:'10px', color:'#808080'}}>ВСЕГО ПОВТОРЕНИЙ</div>
                            <div className="total-count d-flex flex-column align-items-center justify-content-center" style={{fontSize:'18px'}}>
                                <div className="weight">{totalRepetition}</div>
                            </div>
                        </div>
                        <div className="item-calories d-flex flex-column p-3 align-items-center justify-content-center"
                            style={{ backgroundColor:'rgb(75 75 75)', 
                            flex:'0 1 50%',
                            height:'80px',
                            boxShadow:'3px 5px 15px rgb(28 28 28)', borderRadius:'10px'}}>
                            <div className="total-calories-title mb-1 text-center d-flex align-items-center" style={{fontSize:'10px', color:'#808080'}}>ВСЕГО ПОДХОДОВ</div>
                            <div className="total-count d-flex flex-column align-items-center justify-content-center" style={{fontSize:'18px'}}>
                                <div className="weight">{numberApproach}</div>                            </div>
                        </div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-border' style={{border:'1px solid #c43def'}}>
                   <a href="/statistic">Назад</a>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Diagram;