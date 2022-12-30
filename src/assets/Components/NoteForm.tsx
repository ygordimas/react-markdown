import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../../App";
import { v4 as uuidV4 } from "uuid";
import { Box, Button, Grid, TextField } from "@mui/material";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      titleRef.current!.value == "" ||
      markdownRef.current!.value == "" ||
      selectedTags.length == 0
    ) {
      return;
    }

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  }

  return (
    <>
      <Box component="form" marginTop={"16px"}>
        <Grid container spacing={0.5}>
          <Grid item xs={12} md={8}>
            <TextField
              type="text"
              id="title"
              label="Note Title"
              variant="outlined"
              required
              inputRef={titleRef}
              defaultValue={title}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CreatableReactSelect
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
              isMulti
              onCreateOption={(label) => {
                const newTag = { id: uuidV4(), label };
                onAddTag(newTag);
                setSelectedTags((prev) => [...prev, newTag]);
              }}
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

          <Grid item xs={12}>
            <TextField
              required
              name="textbody"
              id="textbody"
              inputRef={markdownRef}
              fullWidth
              defaultValue={markdown}
              multiline
              minRows={4}
            />
          </Grid>

          <Grid xs={12} item>
            <Grid container justifyContent="flex-end" marginTop={"8px"}>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                >
                  Save Changes
                </Button>
              </Grid>

              <Grid item>
                <Link to="..">
                  <Button sx={{ marginLeft: "8px" }} variant="outlined">
                    Cancel
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
