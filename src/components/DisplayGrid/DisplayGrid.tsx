import "./DisplayGrid.css";

import { CompactCardSetType } from "@/types";

interface DisplayGridProps {
  items: CompactCardSetType[];
}

function DisplayGrid({ items }: DisplayGridProps) {
  return (
    <div className="display-grid" data-testid="display-grid">
      {items && items.length > 0
        ? items.map((element) => (
            <div key={element.id} className="display-grid-card">
              <div className="header">
                <h2>{element.title}</h2>
              </div>
              {element.description ? <div>{element.description}</div> : null}
              <div className="total-cards">{`${element.cards.length} ${
                element.cards.length === 1 ? "card" : "cards"
              }`}</div>
            </div>
          ))
        : "There are no items to display."}
    </div>
  );
}

export default DisplayGrid;
