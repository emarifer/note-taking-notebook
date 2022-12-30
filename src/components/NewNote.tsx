import { ReactElement } from "react";
import { NoteData, Tag } from "../types/types";
import { NoteForm } from "./NoteForm";

interface NewNoteProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

export function NewNote({
  onSubmit,
  onAddTag,
  availableTags,
}: NewNoteProps): ReactElement {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
