import { useContext, useEffect, useState } from "react";
import { getProgress } from "../../https/ProgressApi";
import './progress-bar.scss'
import { Context } from "../..";
import Progress from "../progress/progress";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { MAIN_ROUTE } from "../utils/consts";

const ProgressBar = ({ activeProgress, setActiveProgress, exerciseId, tainingID }) => {
    const [progresExists, setProgressExists] = useState(false);
    const [progressData, setProgressData] = useState([])
    const {progress} = useContext(Context);

    useEffect(() => {
        getProgress(exerciseId, tainingID).then(data => {
            if (data.length !== 0) {
                setProgressData(data)
                setProgressExists(true)
                setActiveProgress(!activeProgress)
            } else {
                setProgressExists(false)    
            }
        })
    }, [tainingID, exerciseId])

    useEffect(() => {
        
        getProgress(exerciseId, tainingID).then(data => {
            if (data.length !== 0) {
                setProgressData(data)
                setProgressExists(true)
                setActiveProgress(!activeProgress)
            } else {
                setProgressExists(false)    
            }
        })
    }, [])
    setActiveProgress(false);

    useEffect(() => {
        getProgress(exerciseId, tainingID).then(data => {
            if (data.length !== 0) {
                setProgressData(data)
                setProgressExists(true)
            } else {
                setProgressExists(false)    
            }
        })
    }, [activeProgress])

    return(
        <>
            {
                progresExists ? 
   
                <>
                    {
                        progressData.map((progress, i) => 
                            <>
                                <div className="progress-items" key={i} style={{marginBottom:'10px', marginRight:'15px'}}>
                                    <div className="progress-items d-flex align-items-center">
                                        <div className="progress-items__item item-progress d-flex flex-column">
                                            <div className="item-progress-weight d-flex align-items-center">
                                                <div className="weight-exer">{progress.weightofinventory}</div>
                                                <div className="label">КГ</div>
                                            </div>
                                            <div className="item-progress-height d-flex align-items-center">
                                                <div className="height-exer">{progress.repetition}</div>
                                                <div className="label">ПОВТ</div>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            </>
                        )
                    }
                </>
                :
                <></>
            }

        </>
    )
}

export default ProgressBar;