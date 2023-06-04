import './app.scss'
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from '../appRouter/appRouter';
import HeaderNon from '../header/headernon';
import { useContext, useEffect, useState } from 'react';
import { Context } from "../../index";
import { observer } from 'mobx-react-lite';
import { check } from '../../https/userApi';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            check().then(data => {
                user.setId(data.id)
                user.setUser(true);
                user.setIsAuth(true);
            }).finally(() => setLoading(false))
        }, 1000)
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    
    return (  
        <Router>
            <div className='wrapper'>
                {!user.isAuth ?  <HeaderNon/> : <></>}
                <main className='main'>
                    <AppRouter />
                </main>
            </div> 
        </Router>
    );
})

export default App;