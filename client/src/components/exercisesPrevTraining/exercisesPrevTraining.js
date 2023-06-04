import { Row } from "react-bootstrap";
const ExercisesPrevTraining = ({exercises}) => {

    return(
        <>
            {
                exercises.map((exercise, i) => 
                    <div key={exercise.id} className="d-flex flex-column mb-4" style={{backgroundColor:"#202020", borderRadius:'20px'}}>
                        <div className="exercise-row justify-content-between" key={exercise.id} id={exercise[0].id}>
                            <div className="d-flex align-items-center" style={{flex:'1 1 auto'}}>
                                <div className="exercise-row-img">
                                    <img src={"http://localhost:5001/"+exercise[0].img} alt="" />
                                </div>
                                <div className="exercise-row-title" style={{color:'white'}}>{exercise[0].name}</div>
                            </div>  
                        </div>

                        {/* <Row style={{padding:"0 20px 15px"}}>
                            <div className="d-flex mt-1" style={{color:'white'}}>

                                {
                                    progressOfExercises.progressOfExercise.map(r => 
                                        <div className="d-flex flex-column me-4">
                                            <div className="kg d-flex align-items-center me-1">
                                                <div className="numer me-1">{r.weight}</div>
                                                <div className="">кг</div>
                                            </div>
                                            <div className="kg d-flex align-items-center">
                                                <div className="numer me-1">{r.repeation}</div>
                                                <div className="">повт</div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </Row> */}
                    </div>   
                )
            }
        </>
    )
}

export default ExercisesPrevTraining;