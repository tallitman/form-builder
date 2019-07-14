import React from 'react';

import Routes from './Routes';

import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<div className="App">
      		<Routes />
			  <ToastContainer />
		</div>
	);
}

export default App;
