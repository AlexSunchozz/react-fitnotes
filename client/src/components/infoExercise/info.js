import { Modal, Button } from "react-bootstrap"
import './info.scss';
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { fetchMuscle } from "../../https/musculApi";

const Info = ({show, onHide, exerciseName, exerciseDescr, exerciseImg, targetMuscul}) => {

    const {musculs} = useContext(Context);
    const [musculName, setMusculName] = useState()

    useEffect(() => {

        if (targetMuscul) {
            fetchMuscle(targetMuscul).then(data => setMusculName(data[0].name))
        }
    }, [targetMuscul])

    return(
        <Modal show={show} onHide={onHide} className='info'>
            <Modal.Header>
                <Modal.Title>
                    {exerciseName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{color:'white', border: 'none'}}>
                <div className="info-content">
                    <div className="info-content-img">
                        <img src={"http://localhost:5001/" + exerciseImg} alt="exercise" />
                    </div>
                    <div className="info-content-description">
                        {exerciseDescr}
                    </div>
                    <div className="info-content-musuls-type">
                        {musculName}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-border' 
                        style={{border:'1px solid #c43def'}} 
                        onClick={() => {onHide()}}
                        >
                        Назад
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Info;