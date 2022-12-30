import { Box, Typography } from "@mui/material";
import { NoteData, Tag } from "../../App";
import { NoteForm } from "../Components/NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
  return (
    <>
      <Box
        sx={{
          height: "80px",
          borderBottom: "1px solid lightgray",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">New Note</Typography>
      </Box>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
      ;
    </>
  );
}
