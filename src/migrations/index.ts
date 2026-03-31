import * as migration_20260331_145043_full_initial_setup_with_revision from './20260331_145043_full_initial_setup_with_revision';
import * as migration_20260331_150436_seed_books_data from './20260331_150436_seed_books_data';

export const migrations = [
  {
    up: migration_20260331_145043_full_initial_setup_with_revision.up,
    down: migration_20260331_145043_full_initial_setup_with_revision.down,
    name: '20260331_145043_full_initial_setup_with_revision',
  },
  {
    up: migration_20260331_150436_seed_books_data.up,
    down: migration_20260331_150436_seed_books_data.down,
    name: '20260331_150436_seed_books_data'
  },
];
