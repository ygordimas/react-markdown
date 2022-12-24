import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../../../App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" required ref={titleRef} />
        <label htmlFor="tags">Tags</label>
        <CreatableReactSelect
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
        <label htmlFor="textbody">Body</label>
        <textarea
          required
          name="textbody"
          id="textbody"
          cols={30}
          rows={10}
          ref={markdownRef}
        ></textarea>
        <button type="submit">Save</button>
        <Link to="..">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </>
  );
}
