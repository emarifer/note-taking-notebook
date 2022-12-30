import { ReactElement } from "react";
import { useNote } from "../hooks/useNote";
import { NoteData, Tag } from "../types/types";
import { NoteForm } from "./NoteForm";

interface EditNoteProps {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

export function EditNote({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps): ReactElement {
  const note = useNote();

  return (
    <>
      <h1>Edit Note</h1>

      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
