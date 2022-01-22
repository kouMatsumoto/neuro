import Box from '@mui/material/Box';
import React from 'react';
import { Editor } from 'slate';
import { Note } from '../../models';
import { useAppQuery, useAppUseCases } from '../../services';
import { EditableNote } from './EditableNote';
import { EditorOutputData } from './internal';

export const NoteListLayout: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexFlow: 'column-reverse',
        justifyContent: 'end',
        padding: '24px',
        gap: '24px',
        overflow: 'auto',
      }}
    >
      {children}
    </Box>
  );
};

export const NoteList = () => {
  const usecases = useAppUseCases();
  const notes = useAppQuery((us) => us.queryNotesWithReloading(), { initial: [] });

  const makeNote = (note: Note) => {
    const save = async (data: EditorOutputData) => await usecases.saveNote(note, { text: data.text, editorNodes: JSON.stringify(data.editorNodes) });
    const handleBlur = (data: EditorOutputData) => (save(data), usecases.resetActiveEditor());
    const handleFocus = (editor: Editor) => usecases.setActiveEditor(editor);

    return <EditableNote key={note.id} data={note} onBlur={handleBlur} onFocus={handleFocus} />;
  };

  return <NoteListLayout>{notes.map(makeNote)}</NoteListLayout>;
};
