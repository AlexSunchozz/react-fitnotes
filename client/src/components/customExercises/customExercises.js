import { Form, Modal, Button } from "react-bootstrap"
import './customExercises.scss'
import { useContext, useState } from "react"
import { Context } from "../.."
import { postCustomExercise } from "../../https/customExerciseApi"
import { getExercises } from "../../https/customExerciseApi"


const CustomExercises = ({customEx, setCustomEx, typeId, show, onHide}) => {

    const {user} = useContext(Context)

    const [file, setSelectFile] = useState(null);
    const [nameExercise, setNameExercise] = useState('');
    const [descriptionExercise, setDescriptionExercise] = useState('');

    const selectFile = (e) => {
        setSelectFile(e.target.files[0])
    }

    const addCustomExercise = () => {
        const formData = new FormData();
        formData.append('name', nameExercise);
        formData.append('description', descriptionExercise);
        formData.append('img', file);
        formData.append('userId', user.userId);
        formData.append('typeId', typeId);

        postCustomExercise(formData).then(data => {
            localStorage.setItem('customEx', true);
            if (localStorage.getItem('customEx') === 'true') {
                getExercises(user.userId, typeId).then(data => console.log(data))
                setCustomEx(true)
            }
        })
    }

    return (
        <Modal show={show} onHide={onHide} className='custom'>
            <Modal.Header>
                <Modal.Title>
                    Ваши упражнения
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{color:'white', border: 'none'}}>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Введите название упражнения</Form.Label>
                        <Form.Control type="text" placeholder="Моё упражнение"
                                        id='name-custom-exercise'
                                        onInput={(e) => setNameExercise(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control as="textarea" name="description" id="description-custom-exercise" rows={3} 
                                        onInput={(e) => setDescriptionExercise(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Изображение</Form.Label>
                        <Form.Control type="file" id='custom-exercise-file' name='file'
                            onChange={(e) => selectFile(e)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-border' 
                        style={{border:'1px solid #c43def'}} 
                        onClick={() => {onHide()}}
                        >
                        Отмена
                </Button>
                <Button className='btn-border' 
                        onClick={() => {onHide(); 
                             addCustomExercise()           
                        }}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomExercises;