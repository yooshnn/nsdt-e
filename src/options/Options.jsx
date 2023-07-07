import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Editor from './Editor';
import Button from '../components/UI/Button';
import Select from '../components/UI/Select';

const Wrapper = styled.div`
  width: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function dec2hex(dec) {
  return dec.toString(16).padStart(2, '0');
}

function generateId(len) {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

const Options = () => {
  const [templates, setTemplates] = useState([]);
  const [cursor, setCursor] = useState(-1);

  useEffect(() => {
    const fetch = async () => {
      let templates = await chrome.runtime.sendMessage({
        action: 'DB_READ',
        param: { store: 'TEMPLATES' },
      });
      console.log(templates);
      setTemplates(templates);
    };
    fetch();
  }, []);

  const eraseHandler = async (id) => {
    console.log('eraseHandler call, id is ' + id);
    const response = await chrome.runtime.sendMessage({
      action: 'DB_ERASE',
      param: {
        store: 'TEMPLATES',
        key: id,
      },
    });
    if (response) {
      setCursor(-1);
      let templates = await chrome.runtime.sendMessage({
        action: 'DB_READ',
        param: { store: 'TEMPLATES' },
      });
      setTemplates(templates);
    }
  };

  const updateHandler = async (newTemplate) => {
    const response = await chrome.runtime.sendMessage({
      action: 'DB_WRITE',
      param: {
        store: 'TEMPLATES',
        value: newTemplate,
      },
    });
    if (response) {
      let templates = await chrome.runtime.sendMessage({
        action: 'DB_READ',
        param: { store: 'TEMPLATES' },
      });
      setTemplates(templates);
    }
  };

  const addHandler = async () => {
    const response = await chrome.runtime.sendMessage({
      action: 'DB_WRITE',
      param: {
        store: 'TEMPLATES',
        value: {
          id: generateId(),
          title: 'template ' + Math.random().toString(36).substring(2, 7),
          filters: [],
        },
      },
    });
    if (response) {
      let templates = await chrome.runtime.sendMessage({
        action: 'DB_READ',
        param: { store: 'TEMPLATES' },
      });
      setTemplates(templates);
    }
  };

  return (
    <Wrapper>
      <h1>NSDT(e)</h1>
      <span>
        <Select
          labels={templates.map((template) => template.title)}
          width="19rem"
          placeholder="템플릿을 선택해주세요."
          index={cursor}
          onChange={(e) => {
            setCursor(+e.target.value);
          }}
        />
        <Button width="8rem" onClick={addHandler}>
          빈 템플릿 추가
        </Button>
      </span>
      <Editor
        templates={templates}
        cursor={cursor}
        onSave={updateHandler}
        onErase={eraseHandler}
      />
    </Wrapper>
  );
};

export default Options;
