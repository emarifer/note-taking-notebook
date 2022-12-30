import { useMemo } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { EditNote, NewNote, Note, NoteLayout, NoteList } from "./components";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { RawNote, Tag, NoteData } from "./types/types";
import { v4 as uuidV4 } from "uuid";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
    ]);
  };

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      })
    );
  };

  const onDeleteNote = (id: string) =>
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

  const addTag = (tag: Tag) => setTags((prevTags) => [...prevTags, tag]);

  const onUpdateTag = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  };

  const onDeleteTag = (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          // Aquí se hace un «casteo» automático del tipo de «notesWithTags» hacia el tipo «SimpliedNote»
          element={
            <NoteList
              availableTags={tags}
              notes={notesWithTags}
              onUpdateTag={onUpdateTag}
              onDeleteTag={onDeleteTag}
            />
          }
        />

        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />

        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />

          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;

/**
 * https://www.youtube.com/watch?v=j898RGRw0b4
 * https://github.com/WebDevSimplified/react-note-taking-app
 * https://react-bootstrap.github.io/
 * https://getbootstrap.com/
 *
 * AÑADIDA LA OPCIÓN DE ESCRIBIR MARKDOWN Y ETIQUETAS HTML. VER:
 * https://stackoverflow.com/questions/70548725/any-way-to-render-html-in-react-markdown
 */
