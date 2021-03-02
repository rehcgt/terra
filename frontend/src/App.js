import JobsDataGrid from './components/JobsDataGrid'

import './assets/css/App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <Header />
            <div className="container">
                <JobsDataGrid />
            </div>
            <Footer />
        </>
    );
}

export default App;
