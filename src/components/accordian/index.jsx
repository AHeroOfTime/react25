// single selection
// multiple selection

import { useState } from 'react';
import data from './data';
import './styles.css';

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    // copy state
    let cpyMultiple = [...multiple];
    // check if currentId is in state/array
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

    console.log(findIndexOfCurrentId);
    // if -1, not present
    if (findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId);
    else cpyMultiple.splice(findIndexOfCurrentId, 1);

    // update state
    setMultiple(cpyMultiple);
  }

  console.log(selected, multiple);

  return (
    <div className='wrapper'>
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className='accordian'>
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className='item' key={dataItem.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className='title'
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {/* check to see if selected id is present OR if multi is enabled AND there is an item present (not = to -1) */}
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className='content'>{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className='content'>{dataItem.answer}</div>
                  )}
              {/* {selected === dataItem.id ||
              multiple.indexOf(dataItem.id) !== -1 ? (
                <div className='content'>{dataItem.answer}</div>
              ) : null} */}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}
