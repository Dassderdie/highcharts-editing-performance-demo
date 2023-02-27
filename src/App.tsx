import './App.css';
import HighchartsChart from './highchartsChart/HighchartsChart';
import TitleInput from './titleInput/TitleInput';

function App() {
    return (
        <div className="App">
            <TitleInput></TitleInput>
            <HighchartsChart></HighchartsChart>
        </div>
    );
}

export default App;
