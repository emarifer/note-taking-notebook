import { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../hooks/useNote";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Row, Col, Stack, Button, Badge } from "react-bootstrap";

interface NoteProps {
  onDelete: (id: string) => void;
}

export function Note({ onDelete }: NoteProps): ReactElement {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>

          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap mb-3">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>

        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>

            <Button
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
              variant="outline-danger"
            >
              Delete
            </Button>

            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>

      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{note.markdown}</ReactMarkdown>
    </>
  );
}

/**
 * AÑADIDA LA OPCIÓN DE ESCRIBIR MARKDOWN Y ETIQUETAS HTML. VER:
 * https://stackoverflow.com/questions/70548725/any-way-to-render-html-in-react-markdown
 */
