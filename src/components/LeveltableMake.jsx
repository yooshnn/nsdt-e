import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './UI/Card';
import Select from './UI/Select';
import Button from './UI/Button';

const LeveltableMake = () => {
  const [playdata, setPlaydata] = useState({});
  const [templates, setTemplates] = useState([]);
  const [cursor, setCursor] = useState(-1);

  useEffect(() => {
    const fetch = async () => {
      let templates = await chrome.runtime.sendMessage({
        action: 'DB_READ',
        param: { store: 'TEMPLATES' },
      });
      setTemplates(templates);
      let playdata = await chrome.runtime.sendMessage({
        action: 'DB_READ',
        param: { store: 'PLAYDATA' },
      });
      setPlaydata(playdata);
    };
    fetch();
  }, []);

  const sendRequest = () => {
    if (cursor < 0) return;

    const template = templates[cursor];

    let config = {
      classes: [],
      class_width: '15',
      class_kojinsa_width: '0',
      multilanguage: 0,
    };
    for (const filter of template.filters) {
      config.classes.push(filter.name);
    }

    let query = [];

    for (const item of playdata) {
      let obj = {
        class: null,
        kojinsa: '0',
        diff: item.diff,
        title: item.title,
        code: item.code,
      };

      for (let i = 0; i < template.filters.length; ++i) {
        const filter = template.filters[i];

        if (!filter.level.includes(item.level)) continue;
        if (!filter.diff.includes(item.diff.toLowerCase())) continue;

        let fcMark = item.fc;
        if (fcMark == 'F') fcMark = 'FC';
        if (fcMark == 'NF') fcMark = 'near FC';
        if (!filter.fc.includes(fcMark)) continue;

        if (+item.basicScore < +filter.basicScore[0]) continue;
        if (+item.basicScore > +filter.basicScore[1]) continue;
        if (+item.basicGrade < +filter.basicGrade[0]) continue;
        if (+item.basicGrade > +filter.basicGrade[1]) continue;
        if (+item.recitalScore < +filter.recitalScore[0]) continue;
        if (+item.recitalScore > +filter.recitalScore[1]) continue;
        if (+item.recitalGrade < +filter.recitalGrade[0]) continue;
        if (+item.recitalGrade > +filter.recitalGrade[1]) continue;

        obj.class = '' + i;
        break;
      }

      if (!obj.class) continue;
      query.push(obj);
    }

    let tempArr = [0, 0, 0, 0, 0, 0, 0, 0];
    for (const obj of query) {
      tempArr[+obj.class] += 1;
    }
    console.log(tempArr);
    console.log(template.filters);

    /*
    chrome.runtime.sendMessage({
      action: 'APPLY_TEMPLATE',
      param: { config: config, query: query },
    });
    */

    const s = document.createElement('script');
    s.src = chrome.runtime.getURL('/src/leveltable_inject.js');
    s.type = 'module';

    // Store the reference to the script element in a variable
    const currentScript = s;

    s.onload = () => {
      s.remove();
      // Dispatch a custom event containing the reference
      window.dispatchEvent(
        new CustomEvent('APPLY_TEMPLATE', {
          detail: {
            config: JSON.stringify(config),
            query: JSON.stringify(query),
          },
        })
      );
    };

    (document.head || document.documentElement).appendChild(s);
  };

  return (
    <Card>
      <h1>NSDT(e)</h1>
      <div>
        <Select
          labels={templates.map((template) => template.title)}
          width="24rem"
          placeholder="템플릿을 선택해주세요."
          index={cursor}
          onChange={(e) => {
            setCursor(+e.target.value);
          }}
        />
        <Button width="8rem" onClick={sendRequest}>
          적용하기
        </Button>
      </div>
    </Card>
  );
};

export default LeveltableMake;
