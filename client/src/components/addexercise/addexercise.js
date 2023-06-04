import './addexercise.scss'
import { Link } from 'react-router-dom';

const AddExercise = ({active, setExercisesModal}) => {
    return (
        <div className={"add-btn"} onClick={() => setExercisesModal(true)}>
            <div className="container add-btn-container">
                <div className="add-btn-container__item">+</div>
            </div>
        </div>
    )
}

export default AddExercise;