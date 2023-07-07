import { useState, useEffect } from 'react';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Button from '../components/UI/Button';
import RoundButton from '../components/UI/RoundButton';
import FilterBox from './FilterBox';

import { DefaultFilter } from './DefaultFilter';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterBoxList = ({
  template,
  filterChangeHandler,
  filterDeleteHandler,
}) => {
  return template.filters.map((filter, i) => (
    <FilterBox
      key={i}
      index={i}
      filter={filter}
      onChange={filterChangeHandler}
      onDelete={filterDeleteHandler}
    />
  ));
};

const Editor = ({ templates, cursor, onSave, onErase }) => {
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    setTemplate(
      0 <= cursor && cursor < templates.length ? templates[cursor] : null
    );
  }, [templates, cursor]);

  // template modification handlers
  const titleChangeHandler = (newTitle) => {
    setTemplate((prevTemplate) => ({ ...prevTemplate, title: newTitle }));
  };
  const filterChangeHandler = (index, newFilter) => {
    setTemplate((prevTemplate) => {
      let newFilters = [...prevTemplate.filters];
      newFilters.splice(index, 1, newFilter);
      return { ...prevTemplate, filters: newFilters };
    });
  };
  const filterDeleteHandler = (index) => {
    setTemplate((prevTemplate) => {
      let newFilters = [...prevTemplate.filters];
      newFilters.splice(index, 1);
      return { ...prevTemplate, filters: newFilters };
    });
  };
  const filterAppendHandler = () => {
    setTemplate((prevTemplate) => {
      console.log(prevTemplate);
      let newFilters = [...prevTemplate.filters];
      newFilters.push({ ...DefaultFilter, name: 'an unnamed class' });
      return { ...prevTemplate, filters: newFilters };
    });
  };

  if (!template) {
    return <div>선택한 템플릿이 없습니다.</div>;
  } else {
    return (
      <Wrapper>
        <input
          value={template.title}
          onChange={(e) => {
            titleChangeHandler(e.target.value);
          }}
        />
        <div>
          <Button
            width="4rem"
            onClick={() => {
              onErase(template.id);
            }}
          >
            삭제
          </Button>
          <Button
            width="4rem"
            onClick={() => {
              onSave(template);
            }}
          >
            저장
          </Button>
        </div>
        <FilterBoxList
          template={template}
          filterChangeHandler={filterChangeHandler}
          filterDeleteHandler={filterDeleteHandler}
        />
        <RoundButton onClick={filterAppendHandler}>
          <FontAwesomeIcon className="icon" icon={faCirclePlus} size="2xl" />
        </RoundButton>
      </Wrapper>
    );
  }
};

export default Editor;
