import './App.css';
import { selectTitle } from './store/highchartsOptionsSlice';
import { useAppSelector } from './store/hooks';
import TitleInput from './titleInput/TitleInput';

function App() {
    const title = useAppSelector(selectTitle);
    return (
        <div className="App">
            <h1>{title}</h1>
            <TitleInput></TitleInput>
        </div>
    );
}

export default App;
