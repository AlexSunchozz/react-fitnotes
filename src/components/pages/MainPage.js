import Timer from "../timer/timer";
import AddExercise from "../addexercise/addexercise";
import TimerSettings from "../app/timersettings/timersettings";

const MainPage = () => {
    return(
        <section className="main-page">
            <div className="container">
                <Timer />
                <AddExercise/>
            </div>
        </section>
    )
}
export default MainPage;