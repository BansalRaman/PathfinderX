import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import Response from './components/Response';
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/response" element={<Response />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
