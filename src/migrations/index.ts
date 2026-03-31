import * as migration_20260328_105037_seed_home_page_data from './20260328_105037_seed_home_page_data';
import * as migration_20260328_105038_seed_biography_page_data from './20260328_105038_seed_biography_page_data';
import * as migration_20260331_145043_seed_initial_setup_data from './20260331_145043_seed_initial_setup_data';
import * as migration_20260331_150436_seed_books_data from './20260331_150436_seed_books_data';
import * as migration_20260331_160710_seed_faq_data from './20260331_160710_seed_faq_data';

export const migrations = [
  {
    up: migration_20260328_105037_seed_home_page_data.up,
    down: migration_20260328_105037_seed_home_page_data.down,
    name: '20260328_105037_seed_home_page_data',
  },
  {
    up: migration_20260328_105038_seed_biography_page_data.up,
    down: migration_20260328_105038_seed_biography_page_data.down,
    name: '20260328_105038_seed_biography_page_data',
  },
  {
    up: migration_20260331_145043_seed_initial_setup_data.up,
    down: migration_20260331_145043_seed_initial_setup_data.down,
    name: '20260331_145043_seed_initial_setup_data',
  },
  {
    up: migration_20260331_150436_seed_books_data.up,
    down: migration_20260331_150436_seed_books_data.down,
    name: '20260331_150436_seed_books_data'
  },
  {
    up: migration_20260331_160710_seed_faq_data.up,
    down: migration_20260331_160710_seed_faq_data.down,
    name: '20260331_160710_seed_faq_data'
  },
];
