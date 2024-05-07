import "./DisplayGrid.css";

import { useLoaderData, useNavigate } from "react-router-dom";

import { CompactCardSetType } from "@/types";

import Button from "../Button/Button";

function DisplayGrid() {
  const items = useLoaderData() as CompactCardSetType[];
  const navigate = useNavigate();

  const viewRandomSet = () => {
    let selectedId = "";
    if (items && items.length) {
      const rando = Math.floor(Math.random() * items.length);
      selectedId = items[rando].id;
    }
    navigate(`/set/${selectedId}`);
  };

  return (
    <div className="main-content">
      <div className="content-heading">
        <h1 id="top" tabIndex={-1}>
          Flash card sets
        </h1>
        <div className="button-group large-btns">
          <a className="btn primary" href={`/set/create`}>
            Create card set
          </a>
          {items && items.length > 1 ? (
            <Button
              style="secondary"
              text="View a random set"
              clickHandler={viewRandomSet}
            />
          ) : null}
        </div>
      </div>
      <div className="display-grid" data-testid="display-grid">
        {items && items.length > 0
          ? items.map((element) => (
              <div key={element.id} className="display-grid-card">
                <div className="header">
                  <a href={`/set/${element.id}`}>
                    <h2>{element.title}</h2>
                  </a>
                </div>
                <div className="total-cards">{`${element.cards} ${
                  element.cards === 1 ? "card" : "cards"
                }`}</div>
                {element.description ? <div>{element.description}</div> : null}
              </div>
            ))
          : "There are no items to display."}
      </div>
      <div className="content-footer">
        <a href="#top">Return to top of page</a>
      </div>
    </div>
  );
}

export default DisplayGrid;
