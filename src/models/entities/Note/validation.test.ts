import { getNoteValidation, Note } from './Note';

test('getNoteValidation', () => {
  const source = { id: 'id', text: 'text', createdAt: 1 } as Note;
  const valid = { id: 'id', text: 'changed', createdAt: 1 } as Note;
  const validation = getNoteValidation(source);

  expect(validation({ ...valid })).toBeNull();
  // text
  expect(validation({ ...valid, text: '' })).toEqual(expect.arrayContaining(['text should not be empty']));
  expect(validation({ ...valid, text: ' \n\t　' })).toEqual(expect.arrayContaining(['text should not be only whitespaces']));
  expect(validation({ ...valid, text: source.text })).toEqual(expect.arrayContaining(['text should be changed']));
});
