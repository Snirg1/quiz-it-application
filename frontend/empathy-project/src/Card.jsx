import React from "react";

// ======= CARD COMPONENT ========
const Card = (props) => {
  let Cardclasses = ["Card"];
  let contentClasses = ["iconify"];

  if (props.active) {
    Cardclasses.push("active");
  }

  return (
    <button
      className={Cardclasses.join(" ")}
      onClick={props.clicked}
      disabled={props.active}
    >
      <span
        class={contentClasses.join(" ")}
        data-icon={props.value}
        data-inline="false"
        data-width="60"
        data-height="60"
      ></span>
    </button>
  );
};

export default Card;
