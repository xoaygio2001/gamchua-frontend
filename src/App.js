import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';

import HomePage from './containers/client/home-page/HomePage';
import Detail from './containers/client/detail-game/DetailGame';

import Login from './containers/admin/Login/Loginn';
import MangeGame from './containers/admin/manage-game/MangeGame';

import { ToastContainer, toast } from 'react-toastify';




function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/detail-game/:id' element={<Detail />} />
        <Route path='/admin' element={<MangeGame />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
