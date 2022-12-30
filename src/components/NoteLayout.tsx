import { ReactElement } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../types/types";

interface NoteLayoutProps {
  notes: Note[];
}

export function NoteLayout({ notes }: NoteLayoutProps): ReactElement {
  const { id } = useParams();
  const note = notes.find((nt) => nt.id === id);

  // ¡Ojo, no puede ser «estrictamente» ("===") igual a "null"
  if (note == null) return <Navigate to="/" replace />;

  return <Outlet context={note} />;
}
