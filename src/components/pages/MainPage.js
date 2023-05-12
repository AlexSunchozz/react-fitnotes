import Timer from "../timer/timer";
import AddExercise from "../addexercise/addexercise";
import ExercisesMain from "../exercisesMain/exrcisesMain";
import TimerSettings from "../app/timersettings/timersettings";

const MainPage = () => {
    return(
        <section className="main-page" style={{display: 'flex', flexDirection: 'column'}}>
            <div className="container">
                <Timer />
            </div>
            <ExercisesMain/>
            <AddExercise/>
        </section>
    )
}
export default MainPage;