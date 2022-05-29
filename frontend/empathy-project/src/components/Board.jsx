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
// TODO: only definitions for now
      "Honest:telling the truth or able to be trusted and not likely to steal, cheat, or lie",
      "Brave:showing no fear of dangerous or difficult things",
      "Compassionate:feeling or showing sympathy and sadness for the suffering or bad luck of others, and wanting to help them",
      "Leader:a person in control of a group, country, or situation",
      "Unselfish:An unselfish person thinks about what is good for other people, not just about their own advantage",
      "Loyal:firm and not changing in your friendship with or support for a person or an organization, or in your belief in your principles",
      "Humble:not proud or not believing that you are important",
      "Selfish:Someone who is selfish only thinks of their own advantage",
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
