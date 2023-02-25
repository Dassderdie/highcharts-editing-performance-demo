import { selectTitle, setTitle } from '../store/highchartsOptionsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import './TitleInput.css';

function TitleInput() {
    const title = useAppSelector(selectTitle);
    const dispatch = useAppDispatch();

    return (
        <input
            type="text"
            value={title}
            onChange={(event) => dispatch(setTitle(event.target.value))}
        ></input>
    );
}

export default TitleInput;
