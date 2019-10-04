import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then((response) => {
        console.log(response);
        transition(SHOW);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const confirming = () => {
    transition(CONFIRM);
  };

  const deleting = () => {
    transition(DELETE);
    props.cancelInterview(props.id)
      .then((response) => {
        console.log(response);
        transition(EMPTY);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editing = () => {
    transition(CREATE);
  };

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirming}
          onEdit={editing}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message={"Saving..."}
        />
      )}
      {mode === DELETE && (
        <Status
          message={"Deleting..."}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure?"}
          onConfirm={deleting}
          onCancel={() => back()}
        />
      )}
    </article>
  );
}