import React from "react";
import Card from "./Card.jsx";
// ========= UTILS =========
function randomSort(a, b) {
  return 0.5 - Math.random();
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    let val = [
      // TODO: change thats
      "strict:stress and feel bad to work with",
      "noto:blossom",
      "noto:cactus",
      "noto:avocado",
      "noto:cookie",
      "noto:crystal-ball",
      "noto:peach",
      "noto:gorilla",
    ];
    val = val.concat(val).sort(randomSort);
    this.state = {
      cards: [...Array(16).keys()].map((n) => false),
      values: val,
      selected: [],
      hits: 0,
    };
  }

  clickHandler(key) {
    let newCards = [...this.state.cards];
    let newSelected = [...this.state.selected];
    let newHits = this.state.hits;
    if (newSelected.length > 1) {
      newHits++;
      newCards[newSelected[0]] = false;
      newCards[newSelected[1]] = false;
      newSelected = [];
    }

    newCards[key] = true;
    newSelected.push(key);
    if (
      newSelected.length > 1 &&
      this.state.values[newSelected[0]] === this.state.values[newSelected[1]]
    ) {
      newSelected = [];
    }
    this.setState({ cards: newCards, selected: newSelected, hits: newHits });
  }

  render() {
    const cards = [...Array(this.state.cards.length).keys()].map((n) => (
      <Card
        key={n}
        value={this.state.values[n]}
        active={this.state.cards[n]}
        clicked={() => this.clickHandler(n)}
      />
    ));
    return (
      <>
        <div className="Board">{cards}</div>
        <p>Hits: {this.state.hits}</p>
      </>
    );
  }
}

export default Board;
