import {Container, Form, Card, Button, Row} from 'react-bootstrap';
import { REGISTRATION_ROUTE, MAIN_ROUTE } from '../utils/consts';
import { NavLink } from 'react-router-dom';
import { login } from '../../https/userApi';
import { useContext, useState } from 'react';
import { Context } from "../../index";
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';


const Auth = observer(() => {
    const {user} = useContext(Context)
    const [loginUser, setLogin] = useState('');
    const [passwordUser, setPassword] = useState('');
    const history = useHistory();

    
    const click = async () => {
        try {
            let data;
            data = await login(loginUser, passwordUser);
            user.setUser(user);
            user.setIsAuth(true);
            user.setId(data.id);

            localStorage.setItem('userId', user.userId)

            history.push(MAIN_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return(
        <Container className='d-flex justify-content-center align-items-center' 
                   style={{position:'absolute', 
                   left:'50%',
                   top:'50%', 
                   transform: 'translate(-50%, -50%)',
                   color: 'white'}}>
            <Card style={{borderColor: '#c43def', width: '600px', backgroundColor: 'transparent'}} 
                  className='p-5'>
                <h2 className='auth-title m-auto' style={{color: 'white'}}>Авторизация</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control value={loginUser} onChange={e => setLogin(e.target.value)} className='mt-3' placeholder='Введите логин' 
                                  style={{color:'white', backgroundColor:'transparent', 
                                  borderTop: 'none', 
                                  borderLeft: 'none', 
                                  borderRight:'none', 
                                  borderColor:'#c43def'}}/>
                    <Form.Control value={passwordUser} onChange={e => setPassword(e.target.value)} className='mt-5' placeholder='Введите пароль' 
                                  type='password'
                                  style={{color:'white', backgroundColor:'transparent', 
                                  borderTop: 'none', 
                                  borderLeft: 'none', 
                                  borderRight:'none', 
                                  borderColor:'#c43def'}}/>
                    <Row className='d-flex justify-content-between mt-3'>
                        <div style={{color:'white', width: 'fit-content'}}>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} style={{color:'#c43def'}} className='d-block ml-2'>Зарегистрируйтесь</NavLink></div>
                        <Button onClick={click} style={{width: '40%', border: 'none'}} className='reg-btn'>Войти</Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth;