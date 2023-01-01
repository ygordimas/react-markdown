import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Tag } from "../../App";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
  markdown: string;
};
type NoteListProp = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  deleteTag: (id: string) => void;
  updateTag: (id: string, label: string) => void;
};

type EditTagsModalProps = {
  show: boolean;
  availableTags: Tag[];
  handleClose: () => void;
  deleteTag: (id: string) => void;
  updateTag: (id: string, label: string) => void;
};

export function NoteList({
  availableTags,
  notes,
  deleteTag,
  updateTag,
}: NoteListProp) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  //checks for matches
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id == tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Grid
        container
        spacing={0.5}
        alignItems="center"
        alignSelf="flex-start"
        borderBottom="1px solid lightgray"
        minHeight="80px"
        padding="8px"
        sx={{
          justifyContent: { xs: "center", md: "space-between" },
        }}
      >
        <Grid item xs={12} md={8}>
          <Typography
            variant="h3"
            sx={{
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Markdown Notes
          </Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={0.5}>
            <Grid item>
              <Link to="/new">
                <Button variant="contained">Create</Button>
              </Link>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => setEditTagsModalIsOpen(true)}
              >
                Edit Tags
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={0.5}
        marginTop="16px"
      >
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Search Notes by Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <ReactSelect
            styles={{
              container: (baseStyles, state) => ({
                ...baseStyles,

                fontFamily: "Roboto",
                height: "56px",
              }),
              valueContainer: (baseStyles, state) => ({
                ...baseStyles,
                height: "56px",
              }),
            }}
            placeholder="Search Note by Tags"
            isMulti
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
          />
        </Grid>
      </Grid>

      <Grid container marginTop="24px" spacing={2}>
        {filteredNotes.map((note) => (
          <Grid
            xs={12}
            sm={6}
            md={4}
            item
            key={note.id}
            sx={{
              flexGrow: "1",
            }}
          >
            <NoteCard
              id={note.id}
              title={note.title}
              tags={note.tags}
              markdown={note.markdown}
            />
          </Grid>
        ))}
      </Grid>

      {/* <div>
        {filteredNotes.map((note) => (
          <div key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div> */}
      <EditTagsModal
        availableTags={availableTags}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </>
  );
}

function NoteCard({ id, title, tags, markdown }: SimplifiedNote) {
  return (
    <Link to={`/${id}`}>
      <Paper
        variant="outlined"
        sx={{
          minHeight: "100%",
          padding: "8px",
          marginBottom: "8px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: "32px", width: "100%", overflow: "hidden" }}>
          <Typography variant="h6">{title}</Typography>
        </Box>

        {/* <Divider /> */}
        <Box
          sx={{
            maxHeight: "160px",

            flex: "1",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 95%)",
            }}
          ></Box>
        </Box>

        {markdown.length > 0 && tags.length > 0 && <Divider />}

        {tags.length > 0 && (
          <Grid
            container
            spacing={0.5}
            sx={{ marginTop: "8px", justifySelf: "flex-end" }}
          >
            {tags.map((tag) => (
              <Grid item>
                <Chip
                  key={tag.id}
                  label={tag.label}
                  sx={{ cursor: "pointer" }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Link>
  );
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EditTagsModal({
  availableTags,
  deleteTag,
  updateTag,
  show,
  handleClose,
}: EditTagsModalProps) {
  useEffect(() => {
    if (availableTags.length == 0) {
      handleClose();
    }
  }, [availableTags]);

  return (
    <Modal open={show} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5">Edit Tags</Typography>
        <Divider />

        <Stack
          marginTop="16px"
          spacing={1}
          sx={{ maxHeight: "400px", overflowY: "scroll" }}
        >
          {availableTags.map((tag) => (
            <Box
              key={tag.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <TextField
                sx={{ flex: "1" }}
                type="text"
                value={tag.label}
                onChange={(e) => updateTag(tag.id, e.target.value)}
              />

              <Button
                color="error"
                variant="outlined"
                onClick={() => deleteTag(tag.id)}
                sx={{ marginLeft: "8px" }}
              >
                <DeleteIcon />
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
}
