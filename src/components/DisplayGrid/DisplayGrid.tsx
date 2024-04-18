import "./DisplayGrid.css";

import { useLoaderData } from "react-router-dom";

import { CompactCardSetType } from "@/types";

function DisplayGrid() {
  const items = useLoaderData() as CompactCardSetType[];

  return (
    <div className="main-content">
      <h1>Flash card sets:</h1>
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
    </div>
  );
}

export default DisplayGrid;
