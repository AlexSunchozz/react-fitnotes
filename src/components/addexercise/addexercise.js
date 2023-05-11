import './addexercise.scss'
import { Link } from 'react-router-dom';
const AddExercise = () => {
    return (
        <div className="add-btn">
            <div className="container add-btn-container">
                <Link to="/exercises" className="add-btn-container__item">+</Link>
            </div>
        </div>
    )
}

export default AddExercise;