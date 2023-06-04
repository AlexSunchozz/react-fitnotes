import ExercisesPrevTraining from "../exercisesPrevTraining/exercisesPrevTraining";
import Calendar from "../calendar/calendar";
import { Container } from 'react-bootstrap';
import { useContext, useEffect, useState } from "react";
import Header from "../header/header";
import Timer from "../timer/timer";
import { Context } from "../..";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { getExercisesInTraining, getNamePrevTraining } from "../../https/ExercisesInTrainingApi";

const Trainings = ({dateTraining, activeCalendar, activeTimer}) => {

    const {user} = useContext(Context);
    const [exercises, setExercises] = useState([]);
    const [nameTraining, setNameTraining] = useState()
    
    // console.log(dateTraining.toLocaleDateS/tring(), getLocalTime(dateTraining))

    useEffect(() => {
        // getNamePrevTraining(user.userId, dateTraining).then(data => setNameTraining(data))
        // getExercisesInTraining(user.userId, dateTraining).then(data => {
        //     setExercises(data)
        // })
    }, [])
    console.log(nameTraining)
    return(
        <>
            <section className="training-page" 
                    style={!activeTimer && !activeCalendar ? {
                        display: 'flex', 
                        flex:'1 1 auto', 
                        flexDirection: 'column', 
                        paddingTop:'110px'} 
                        : 
                        {display: 'flex', 
                        flex:'1 1 auto', 
                        flexDirection: 'column', 
                        paddingTop:'0px'}}>
                <div className="container" style={{flex: '1 1 auto'}}>
                    <Container style={{padding:'0px'}}>
                        <div className='d-flex justify-content-center align-items-center flex-column' 
                        style={{width: '100%'}}>
                            <input
                                type="text" id="training-name" 
                                name="training-name" 
                                className='training-name'
                                value={nameTraining}
                                style={{marginTop: '0px', 
                                        color: 'rgb(108, 117, 125)', 
                                        width: '300px', 
                                        fontSize: '20px', 
                                        textAlign: 'center'}}>
                            </input>
                            
                        </div>
                        <div className='exercises-content mt-4'>
                           <ExercisesPrevTraining exercises={exercises}/>
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
}

export default Trainings;