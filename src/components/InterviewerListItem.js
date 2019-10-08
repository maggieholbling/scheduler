import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require('classnames');

export default function InterviewerListItem(props) {
  const {name, avatar, selected, setInterviewer} = props;
  const interviewerClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": selected
  });

  return (
    <li
      className={interviewerClass}
      onClick={setInterviewer}
      data-testid="interviewer"
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {props.selected && props.name}
    </li>
  );
}