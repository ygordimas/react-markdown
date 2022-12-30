import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NoteData, Tag } from "../../App";
import { NoteForm } from "../Components/NoteForm";
import { useNote } from "../Components/NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
  const note = useNote();
  return (
    <>
      <Box
        height={"80px"}
        sx={{ display: "flex", alignItems: "center" }}
        borderBottom="1px solid lightgray"
      >
        <Typography variant="h3">Edit Note</Typography>
      </Box>
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
