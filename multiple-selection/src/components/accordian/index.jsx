import { useState } from "react";
import data from "./data";
import "./style.css";

function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([]);
  function handleSingleSelecction(id) {
    setSelected(id === selected ? null : id);
    console.log(id);
  }
  function handleMultiSelection(id) {
    let cpyMultipleSelected = [...multipleSelected];
    const findIndexCurrentId = cpyMultipleSelected.indexOf(id);
    if (findIndexCurrentId === -1) cpyMultipleSelected.push(id);
    else cpyMultipleSelected.splice(findIndexCurrentId, 1);
    setMultipleSelected(cpyMultipleSelected);
  }

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelecction(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection
                ? multipleSelected.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )}
              {/* {selected === dataItem.id ||
                (multipleSelected.indexOf(dataItem.id) !== -1 && (
                  <div className="content">
                    <p>{dataItem.answer}</p>
                  </div>
                ))} */}
            </div>
          ))
        ) : (
          <div> No Data Found</div>
        )}
      </div>
    </div>
  );
}
export default Accordian;
