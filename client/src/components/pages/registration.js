import { useState, useContext } from 'react';
import {Container, Form, Card, Button} from 'react-bootstrap';
import { NavLink, useHistory} from 'react-router-dom';
import { registration } from '../../https/userApi';
import { MAIN_ROUTE } from '../utils/consts';
import { Context } from '../..';

const Registration = () => {
    const [nameUser, setNameUser] = useState('');
    const [dateBurnUser, setDateBurnUser] = useState('');
    const [weightUser, setWeightUser] = useState();
    const [heightUser, setHeightUser] = useState();
    const [genderUser, setGender] = useState('М');
    const [loginUser, setLoginUser] = useState('');
    const [passwordUser, setPasswordUser] = useState('');

    const history = useHistory();

    const {user} = useContext(Context);

    user.setIsAuth(false)
    const click = async () => {
        
        try {
            const response = await registration(nameUser, dateBurnUser, weightUser, heightUser, genderUser,loginUser, passwordUser);
            user.setUser(user);
            user.setIsAuth(true);
            user.setId(response.id);

            history.push(MAIN_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return(
        <section className="registration">
            <Container className='d-flex justify-content-center align-items-center' 
                style={{
                color: 'white'}}>
                <Card style={{borderColor: '#c43def', width: '700px', backgroundColor: 'transparent'}} 
                    className='p-5'>
                    <h2 className='auth-title m-auto' style={{color: 'white'}}>Регистрация</h2>
                    <Form className='d-flex flex-column'>
                        <Form.Control className='mt-3' placeholder='Как вас зовут?' 
                                    style={{color:'white', backgroundColor:'transparent', 
                                    borderTop: 'none', 
                                    borderLeft: 'none', 
                                    borderRight:'none', 
                                    borderColor:'#c43def'}}
                                    value={nameUser} onChange={e => setNameUser(e.target.value)}
                                    type='text'/>
                        <div className="date-burn d-flex flex-column mt-5">
                            <label htmlFor="date-burn" style={{color: 'rgb(108, 117, 125)', fontWeight: 400, paddingLeft: '10px'}}>Дата рождения?</label>
                            <input type="date" id="start" name="date-burn" className='date'
                                min="1965-01-01" max="2023-06-20"
                                style={{marginTop: '10px', color: 'rgb(108, 117, 125)'}}
                                value={dateBurnUser} onChange={e => setDateBurnUser(e.target.value)}></input>
                        </div>
                        <input type="number" className='weight' min="30" max="300" placeholder='Введите ваш вес'
                               value={weightUser} onChange={e => setWeightUser(e.target.value)}/>
                        <input type="number" className='height' min="30" max="300" placeholder='Введите ваш рост'
                               value={heightUser} onChange={e => setHeightUser(e.target.value)}/>
                        <div className='mt-4 mb-3' style={{color: 'rgb(108, 117, 125)', fontWeight: 400, paddingLeft: '10px'}}>Выберите пол</div>
                        <div className="gender" style={{paddingLeft: '0px'}}>
                            <select style={{border: '1px solid #c43def', 
                                            backgroundColor: 'transparent', 
                                            color: '#c43def',
                                            padding:'5px 10px'}}
                                    value={genderUser} onChange={e => setGender(e.target.value)}>
                                <option>М</option>
                                <option>Ж</option>
                            </select>
                        </div>
                        <Form.Control className='mt-3' placeholder='Введите логин' 
                                    style={{color:'white', backgroundColor:'transparent', 
                                    borderTop: 'none', 
                                    borderLeft: 'none', 
                                    borderRight:'none', 
                                    borderColor:'#c43def'}}
                                    value={loginUser} onChange={e => setLoginUser(e.target.value)}/>
                                    <b-calendar v-model="value" locale="ru"></b-calendar>
                        <Form.Control className='mt-5' placeholder='Введите пароль' 
                                    type='password'
                                    style={{color:'white', backgroundColor:'transparent', 
                                    borderTop: 'none', 
                                    borderLeft: 'none', 
                                    borderRight:'none', 
                                    borderColor:'#c43def'}}
                                    value={passwordUser} onChange={e => setPasswordUser(e.target.value)}/>
                        <Button onClick={click} className='mt-5 align-self-end' style={{border: 'none', minHeight: '40px'}}>Зарегистрироваться</Button>
                    </Form>
                </Card>
            </Container>
        </section>
    )
}

export default Registration;