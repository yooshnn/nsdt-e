import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Selecto from 'react-selecto';
import { DefaultFilter } from './DefaultFilter';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  max-width: 36.8rem;
  width: auto;
  flex-wrap: wrap;
  justify-content: space-between;

  padding: 0;
  margin: 0.5rem 0;
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;

  background: #f7f7f7;

  border: 1px solid #333333;

  width: auto;

  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 0.2rem;
`;
const Label = styled.div`
  margin: 0 0 0 0.5rem;
`;
const Dot = styled.div`
  width: 0.3rem;
  height: 0.3rem;
  background: #3f3f3f;
  border-radius: 50%;
  margin: 0.2rem;
  align-self: center;
`;
const ListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 3rem;
`;
const ListItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || '2rem'};
  height: ${(props) => props.height};
  color: #ffffff;
  background: #aeaeae;
  transition-duration: 0.15s;
  &.selected {
    background: #6a0dad;
  }
`;
const Number = styled.input.attrs({
  type: 'number',
})`
  width: 6.5rem;
  height: 1rem;
  padding-left: 12px;
  border-radius: 1rem;

  margin: 0.135rem;

  background: #e1e1e1;
  border: 1px solid #e1e1e1;
  outline: none;

  transition-duration: 0.15s;

  &:focus {
    background: #efefef;
  }
`;

const EditUI = ({ filter, onSave }) => {
  const [selectedLevel, setSelectedLevel] = useState([...filter.level]);
  const levelSelecto = useRef();

  const [selectedDiff, setSelectedDiff] = useState([...filter.diff]);
  const diffSelecto = useRef();

  const [selectedFc, setSelectedFc] = useState([...filter.fc]);
  const fcSelecto = useRef();

  const [selectedRank, setSelectedRank] = useState([...filter.rank]);
  const rankSelecto = useRef();

  const [basicScore, setBasicScore] = useState([...filter.basicScore]);
  const [basicGrade, setBasicGrade] = useState([...filter.basicGrade]);
  const [recitalScore, setRecitalScore] = useState([...filter.recitalScore]);
  const [recitalGrade, setRecitalGrade] = useState([...filter.recitalGrade]);

  useEffect(() => {
    let htmlElems;

    htmlElems = Array.from(document.querySelectorAll('.level.selected'));
    levelSelectHandler(levelSelecto.current.setSelectedTargets(htmlElems));

    htmlElems = Array.from(document.querySelectorAll('.diff.selected'));
    diffSelectHandler(diffSelecto.current.setSelectedTargets(htmlElems));

    htmlElems = Array.from(document.querySelectorAll('.fc.selected'));
    fcSelectHandler(fcSelecto.current.setSelectedTargets(htmlElems));

    htmlElems = Array.from(document.querySelectorAll('.rank.selected'));
    rankSelectHandler(rankSelecto.current.setSelectedTargets(htmlElems));
  }, []);

  useEffect(() => {
    const newFilter = {
      ...filter,
      level: [...selectedLevel],
      diff: [...selectedDiff],
      fc: [...selectedFc],
      rank: [...selectedRank],
      basicScore: [...basicScore],
      basicGrade: [...basicGrade],
      recitalScore: [...recitalScore],
      recitalGrade: [...recitalGrade],
    };
    onSave(newFilter);
  }, [
    selectedDiff,
    selectedFc,
    selectedLevel,
    selectedRank,
    basicScore,
    basicGrade,
    recitalScore,
    recitalGrade,
  ]);

  const getAddRemove = (e) => {
    let added = [],
      removed = [];
    e.added.forEach((elem) => {
      added.push(elem.getAttribute('value'));
    });
    e.removed.forEach((elem) => {
      removed.push(elem.getAttribute('value'));
    });
    return [added, removed];
  };

  const levelSelectHandler = (e) => {
    const [added, removed] = getAddRemove(e);

    setSelectedLevel((pre) => {
      let newVal = [...pre, ...added];
      newVal = newVal.filter((i) => !removed.includes(i));
      newVal = newVal.filter((e, i) => newVal.indexOf(e) === i);
      return newVal;
    });
  };
  const diffSelectHandler = (e) => {
    const [added, removed] = getAddRemove(e);

    setSelectedDiff((pre) => {
      let newVal = [...pre, ...added];
      newVal = newVal.filter((i) => !removed.includes(i));
      newVal = newVal.filter((e, i) => newVal.indexOf(e) === i);
      return newVal;
    });
  };
  const fcSelectHandler = (e) => {
    const [added, removed] = getAddRemove(e);

    setSelectedFc((pre) => {
      let newVal = [...pre, ...added];
      newVal = newVal.filter((i) => !removed.includes(i));
      newVal = newVal.filter((e, i) => newVal.indexOf(e) === i);
      return newVal;
    });
  };
  const rankSelectHandler = (e) => {
    const [added, removed] = getAddRemove(e);

    setSelectedRank((pre) => {
      let newVal = [...pre, ...added];
      newVal = newVal.filter((i) => !removed.includes(i));
      newVal = newVal.filter((e, i) => newVal.indexOf(e) === i);
      return newVal;
    });
  };

  const basicScoreHandler = (e, i) => {
    setBasicScore((pre) => {
      let newVal = [
        i == 0 ? e.target.value : pre[0],
        i == 1 ? e.target.value : pre[1],
      ];
      newVal[0] = Math.max(newVal[0], 0);
      newVal[1] = Math.min(newVal[1], 1000000);
      return newVal;
    });
  };
  const basicGradeHandler = (e, i) => {
    setBasicGrade((pre) => {
      let newVal = [
        i == 0 ? e.target.value : pre[0],
        i == 1 ? e.target.value : pre[1],
      ];
      newVal[0] = Math.max(newVal[0], 0.0);
      newVal[1] = Math.min(newVal[1], 300.0);
      return newVal;
    });
  };
  const recitalScoreHandler = (e, i) => {
    setRecitalScore((pre) => {
      let newVal = [
        i == 0 ? e.target.value : pre[0],
        i == 1 ? e.target.value : pre[1],
      ];
      newVal[0] = Math.max(newVal[0], 0.0);
      newVal[1] = Math.min(newVal[1], 40.0);
      return newVal;
    });
  };
  const recitalGradeHandler = (e, i) => {
    setRecitalGrade((pre) => {
      let newVal = [
        i == 0 ? e.target.value : pre[0],
        i == 1 ? e.target.value : pre[1],
      ];
      newVal[0] = Math.max(newVal[0], 0.0);
      newVal[1] = Math.min(newVal[1], 300.0);
      return newVal;
    });
  };

  return (
    <Wrapper>
      <Selecto
        ref={levelSelecto}
        onSelect={levelSelectHandler}
        dragContainer={'.levelContainer'}
        selectableTargets={['.level']}
        hitRate={0}
        selectByClick={true}
        selectFromInside={true}
        continueSelect={true}
        continueSelectWithoutDeselect={false}
        ratio={0}
      />
      <Selecto
        ref={diffSelecto}
        onSelect={diffSelectHandler}
        dragContainer={'.diffContainer'}
        selectableTargets={['.diff']}
        hitRate={0}
        selectByClick={true}
        selectFromInside={true}
        continueSelect={true}
        continueSelectWithoutDeselect={false}
        ratio={0}
      />
      <Selecto
        ref={fcSelecto}
        onSelect={fcSelectHandler}
        dragContainer={'.fcContainer'}
        selectableTargets={['.fc']}
        hitRate={0}
        selectByClick={true}
        selectFromInside={true}
        continueSelect={true}
        continueSelectWithoutDeselect={false}
        ratio={0}
      />
      <Selecto
        ref={rankSelecto}
        onSelect={rankSelectHandler}
        dragContainer={'.rankContainer'}
        selectableTargets={['.rank']}
        hitRate={0}
        selectByClick={true}
        selectFromInside={true}
        continueSelect={true}
        continueSelectWithoutDeselect={false}
        ratio={0}
      />

      <div>
        <Label>level</Label>
        <Box className="levelContainer">
          {DefaultFilter.level.slice(0, 12).map((lev) => (
            <ListItemWrapper key={lev}>
              <ListItem
                className={
                  selectedLevel.includes(lev) ? 'level selected' : 'level'
                }
                key={lev}
                value={lev}
                height="3rem"
              >
                {lev}
              </ListItem>
            </ListItemWrapper>
          ))}
          <Dot />
          {DefaultFilter.level.slice(12, 15).map((lev) => (
            <ListItemWrapper key={lev}>
              <ListItem
                className={
                  selectedLevel.includes(lev) ? 'level selected' : 'level'
                }
                key={lev}
                value={lev}
                height="3rem"
              >
                {lev}
              </ListItem>
            </ListItemWrapper>
          ))}
          {[
            ['12.0', '12.5'],
            ['13.0', '13.5'],
          ].map((lev) => (
            <ListItemWrapper key={lev[0]}>
              <ListItem
                className={
                  selectedLevel.includes(lev[0]) ? 'level selected' : 'level'
                }
                key={lev[0]}
                value={lev[0]}
                height="1.5rem"
              >
                {lev[0]}
              </ListItem>
              <ListItem
                className={
                  selectedLevel.includes(lev[1]) ? 'level selected' : 'level'
                }
                key={lev[1]}
                value={lev[1]}
                height="1.5rem"
              >
                {lev[1]}
              </ListItem>
            </ListItemWrapper>
          ))}
        </Box>
      </div>

      <div>
        <Label>difficulty</Label>
        <Box className="diffContainer">
          {DefaultFilter.diff.map((elem) => (
            <ListItem
              className={selectedDiff.includes(elem) ? 'diff selected' : 'diff'}
              key={elem}
              value={elem}
              width="4.25rem"
              height="1.5rem"
            >
              {elem}
            </ListItem>
          ))}
        </Box>
      </div>

      <div>
        <Label>full combo</Label>
        <Box className="fcContainer">
          {DefaultFilter.fc.map((elem) => (
            <ListItem
              className={selectedFc.includes(elem) ? 'fc selected' : 'fc'}
              key={elem}
              value={elem}
              width="5rem"
              height="1.5rem"
            >
              {elem}
            </ListItem>
          ))}
        </Box>
      </div>

      <div>
        <Label>rank</Label>
        <Box className="rankContainer">
          {DefaultFilter.rank.map((elem) => (
            <ListItem
              className={selectedRank.includes(elem) ? 'rank selected' : 'rank'}
              key={elem}
              value={elem}
              width="3rem"
              height="1.5rem"
            >
              {elem}
            </ListItem>
          ))}
        </Box>
      </div>

      <div>
        <Label>basic score</Label>
        <Box>
          <Number
            value={basicScore[0]}
            onChange={(e) => basicScoreHandler(e, 0)}
          />
          ...
          <Number
            value={basicScore[1]}
            onChange={(e) => basicScoreHandler(e, 1)}
          />
        </Box>
      </div>

      <div>
        <Label>basic grade</Label>
        <Box>
          <Number
            step="0.01"
            value={basicGrade[0]}
            onChange={(e) => basicGradeHandler(e, 0)}
          />
          ...
          <Number
            step="0.01"
            value={basicGrade[1]}
            onChange={(e) => basicGradeHandler(e, 1)}
          />
        </Box>
      </div>

      <div>
        <Label>recital score</Label>
        <Box>
          <Number
            step="0.1"
            value={recitalScore[0]}
            onChange={(e) => recitalScoreHandler(e, 0)}
          />
          ...
          <Number
            step="0.1"
            value={recitalScore[1]}
            onChange={(e) => recitalScoreHandler(e, 1)}
          />
        </Box>
      </div>

      <div>
        <Label>recital grade</Label>
        <Box>
          <Number
            step="0.01"
            value={recitalGrade[0]}
            onChange={(e) => recitalGradeHandler(e, 0)}
          />
          ...
          <Number
            step="0.01"
            value={recitalGrade[1]}
            onChange={(e) => recitalGradeHandler(e, 1)}
          />
        </Box>
      </div>
    </Wrapper>
  );
};

export default EditUI;
