// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './HomePage.module.scss';
import { addHobby, deleteHobby } from '../../redux/hobbySlice';
import ModalLogin from '../../components/ModalLogin/ModalLogin';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);

function HomePage() {
  const hobbyList = useSelector((state) => state.hobby.listHobby);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addHobby(value));
    setValue('');
  };
  const handleDelete = (index) => {
    dispatch(deleteHobby(index));
  };
  return (
    <div className="ml-7">
      <h1>HomePage</h1>
      <input className="border border-solid" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button
        onClick={() => {
          handleAdd();
        }}
      >
        Dispatch Add
      </button>
      <ul>
        {hobbyList.map((hobby, index) => {
          return (
            <li className="w-[15rem] relative " key={index}>
              {hobby}
              <span
                className="underline ml-24 hover:cursor-pointer absolute right-0"
                onClick={() => {
                  handleDelete(index);
                }}
              >
                delete
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HomePage;
