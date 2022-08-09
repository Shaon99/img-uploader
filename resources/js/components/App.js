import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
import AddImage from './AddImage';




function App() {
   
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={ <Login />} />
                    <Route path="/register" element={ <Register />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/addimage" element={<AddImage />} />
                    </Route>

                </Routes>
            </Router>

        </>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
