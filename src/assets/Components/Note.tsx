import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from "react-markdown";
import { Box, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import remarkGfm from "remark-gfm";

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

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
            {note.title}
          </Typography>
        </Grid>

        <Grid item>
          <Link to={`/${note.id}/edit`}>
            <Button variant="contained">Edit</Button>
          </Link>
          <Button
            variant="outlined"
            color="error"
            sx={{ marginX: "8px" }}
            onClick={() => {
              onDelete(note.id);
              navigate("/");
            }}
          >
            Delete
          </Button>
          <Link to="/">
            <Button variant="outlined">Back</Button>
          </Link>
        </Grid>
      </Grid>

      <Box marginTop={"16px"}>
        <Stack direction="row" spacing={0.5}>
          {note.tags.length > 0 && (
            <>
              {note.tags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.label}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </>
          )}
        </Stack>

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {note.markdown}
        </ReactMarkdown>
      </Box>
    </>
  );
}
