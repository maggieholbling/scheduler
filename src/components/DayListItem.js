import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props;
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  const formatSpots = (spots) => {
    if (spots === 1) return `${spots} spot remaining`;

    if (spots > 1) return `${spots} spots remaining`;

    return 'no spots remaining';
  };

  return (
    <li
      className={dayClass}
      onClick={() => setDay(name)}
      data-testid="day"
    >
      <h2 className="text--regular"
      >{name}</h2>
      <h3 className="text--light"
      >{formatSpots(spots)}
      </h3>
    </li>
  );
}