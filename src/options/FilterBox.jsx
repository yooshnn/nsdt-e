import { useState, useEffect } from 'react';
import {
  faTrash,
  faWrench,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import RoundButton from '../components/UI/RoundButton';
import { DefaultFilter } from './DefaultFilter';
import EditUI from './EditUI';

const Box = styled.div`
  display: flex;
  flex-direction: column;

  background: #f7f7f7;

  border: 1px solid #333333;

  width: auto;
  min-width: 28rem;

  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 0.2rem;

  transition-duration: 0.15s;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: calc(100% - 4.8rem - 12px);
  height: 1.5rem;
  padding-left: 12px;
  border-radius: 1rem;

  margin: 0.2rem;

  background: #e1e1e1;
  border: 1px solid #e1e1e1;
  outline: none;

  transition-duration: 0.15s;

  &:focus {
    background: #efefef;
  }
`;

const FilterBox = ({ index, filter, onChange, onDelete }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(filter.name);

  useEffect(() => {
    for (let key in DefaultFilter) {
      if (!Object.prototype.hasOwnProperty.call(DefaultFilter, key)) continue;
      if (!Object.prototype.hasOwnProperty.call(filter, key)) {
        onChange(index, {
          ...filter,
          [key]: DefaultFilter[key],
        });
      }
    }
  }, []);

  useEffect(() => {
    setName(filter.name);
  }, [filter]);

  /*
  const nameChangeHandler = (name) => {
    setName(name);
    onChange(index, { ...filter, name: name });
  }; */
  const filterChangeHandler = (newFilter) => {
    onChange(index, { ...newFilter });
  };
  const filterDeleteHandler = () => {
    onDelete(index);
  };
  const toggleIsEditModeHandler = () => {
    setIsEditMode((prevIsEditMode) => !prevIsEditMode);
  };

  return (
    <Box editmode={isEditMode}>
      <Header>
        <Input
          type="text"
          value={name}
          onChange={(e) => {
            const newFilter = { ...filter, name: e.target.value };
            filterChangeHandler(newFilter);
          }}
          //onChange={(e) => nameChangeHandler(e.target.value)}
        />
        <RoundButton size="2rem" onClick={filterDeleteHandler} title="delete">
          <FontAwesomeIcon className="icon" icon={faTrash} />
        </RoundButton>
        <RoundButton
          size="2rem"
          onClick={toggleIsEditModeHandler}
          title={isEditMode ? 'save' : 'edit'}
        >
          <FontAwesomeIcon
            className="icon"
            icon={isEditMode ? faFloppyDisk : faWrench}
          />
        </RoundButton>
      </Header>
      {isEditMode ? (
        <EditUI filter={filter} onSave={filterChangeHandler} />
      ) : (
        JSON.stringify(filter).substring(0, 70) + '...'
      )}
    </Box>
  );
};

export default FilterBox;
