import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

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
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };

  const confirming = () => {
    transition(CONFIRM);
  };

  const deleting = () => {
    transition(DELETE, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  const editing = () => {
    transition(EDIT);
  };

  return (
    <article className="appointment" data-testid="appointment">
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
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
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
      {mode === ERROR_SAVE && (
        <Error
          message={"There was an error saving your appointment"}
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"There was an error deleting your appointment"}
          onClose={() => back()}
        />
      )}
    </article>
  );
}