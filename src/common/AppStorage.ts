import { isSameNoteTo } from './functions';
import { Note } from './types';

/**
 * Database Schema
 *  - app/notes: string[]
 */
type StorageData = {
  'app/notes': Note[];
};

export class AppStorage<Data extends StorageData = StorageData> {
  loadNotes(): Note[] {
    return this.#load('app/notes') ?? [];
  }

  saveNote(note: Note) {
    const notes = this.loadNotes();
    const isSame = isSameNoteTo(note);

    if (notes.find(isSame)) {
      this.#save(
        'app/notes',
        notes.map((n) => (isSame(n) ? { ...n, ...note } : n)),
      );
    } else {
      this.#save('app/notes', [...notes, note]);
    }
  }

  #load<Key extends keyof Data & string>(key: Key): Data[Key] | null {
    const value = localStorage.getItem(key);
    return value === null ? null : (JSON.parse(value) as Data[Key]);
  }

  #save<Key extends keyof Data & string>(key: Key, value: Data[Key]) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
