import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './UI/Card';
import Button from './UI/Button';

const Timestamp = styled.div`
  color: #888888;
  margin: 0.2rem 0;
`;

const Mypage = () => {
  const [isParsingPlaydata, setIsParsingPlaydata] = useState(false);
  const [latestUpdate, setLatestUpdate] = useState('-');

  useEffect(() => {
    const fetchLatestUpdate = async () => {
      const res = await chrome.runtime.sendMessage({
        action: 'DB_READ',
        param: {
          store: 'APP',
          key: 'latestUpdate',
        },
      });
      setLatestUpdate(res);
    };
    fetchLatestUpdate();
  }, []);

  const parsePlaydataHandler = async () => {
    setIsParsingPlaydata(true);
    const playdata = await parsePlaydata();
    await savePlaydata(playdata);
    setIsParsingPlaydata(false);
    /*
    parsePlaydata()
      .then(
        (res) => {
          console.log(res);
          setLatestUpdate(res.latestUpdate);
        },
        (rej) => {
          console.error(rej);
        }
      )
      .finally(setIsParsingPlaydata(false));
    */
  };

  return (
    <Card>
      <h1>NSDT(e)</h1>
      <div>
        <Timestamp>최종 갱신일 : {latestUpdate}</Timestamp>
        <Button
          textAlign="left"
          minWidth="360px"
          disabled={isParsingPlaydata}
          onClick={parsePlaydataHandler}
        >
          사용자 기록 불러오기
        </Button>
      </div>
    </Card>
  );
};

export default Mypage;

const parsePlaydata = async () => {
  const tableBasic = document.getElementById('querytable_ghost');
  const tableRecital = document.getElementById('querytable_ghost_R');

  let playdata = new Object();

  if (!tableBasic || !tableRecital) {
    return playdata;
  }

  const cellsBasic = Array.from(tableBasic.rows)
    .slice(1)
    .map((row) => row.cells);
  const cellsRecital = Array.from(tableRecital.rows)
    .slice(1)
    .map((row) => row.cells);

  cellsBasic.forEach((cell) => {
    const level = cell[0].querySelector('#reallevel').className;
    const code = cell[1].querySelector('a')?.href.split(/[?=&]/)[6];
    const diff = cell[1].querySelector('a')?.href.split(/[?=&]/)[8];
    const id = code + '.' + diff;

    playdata[id] = {
      id: id,
      level: level,
      code: code,
      diff: diff,
      fc: cell[3].textContent,
      title: cell[1].textContent,
      basicScore: cell[2].textContent,
      basicGrade: cell[5].textContent,
      recitalScore: '0.0',
      recitalGrade: '0.0',
    };
  });

  cellsRecital.forEach((cell) => {
    const code = cell[2].querySelector('a').href.split(/[?=&]/)[6];
    const diff = cell[2].querySelector('a').href.split(/[?=&]/)[8];
    const id = code + '.' + diff;

    playdata[id] = {
      ...playdata[id],
      recitalScore: cell[3].textContent,
      recitalGrade: cell[4].textContent,
    };
  });

  return playdata;
};

const savePlaydata = async (playdata) => {
  chrome.runtime.sendMessage({
    action: 'DB_WRITE_MULTIPLE',
    param: {
      store: 'PLAYDATA',
      data: playdata,
    },
  });
  chrome.runtime.sendMessage({
    action: 'DB_WRITE',
    param: {
      store: 'APP',
      value: new Date().toLocaleString('sv'),
      key: 'latestUpdate',
    },
  });
  /*
  return Promise.resolve({
    playdata: await chrome.runtime.sendMessage({
      action: 'DB_READ',
      param: {
        store: 'PLAYDATA',
      },
    }),
    latestUpdate: await chrome.runtime.sendMessage({
      action: 'DB_READ',
      param: {
        store: 'APP',
        key: 'latestUpdate',
      },
    }),
  });
  */
};
