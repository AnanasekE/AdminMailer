import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Login, Dashboard} from './pages';

const App = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='*' element={<Login/>}/>
                    <Route path='dashboard' element={<Dashboard/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
