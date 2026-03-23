import * as migration_20260323_081453_migrate_books from './20260323_081453_migrate_books';
import * as migration_20260323_081954_make_images_nullable from './20260323_081954_make_images_nullable';
import * as migration_20260323_082013_seed_data_from_md from './20260323_082013_seed_data_from_md';
import * as migration_20260323_083341_clear_biography_content from './20260323_083341_clear_biography_content';

export const migrations = [
  {
    up: migration_20260323_081453_migrate_books.up,
    down: migration_20260323_081453_migrate_books.down,
    name: '20260323_081453_migrate_books',
  },
  {
    up: migration_20260323_081954_make_images_nullable.up,
    down: migration_20260323_081954_make_images_nullable.down,
    name: '20260323_081954_make_images_nullable',
  },
  {
    up: migration_20260323_082013_seed_data_from_md.up,
    down: migration_20260323_082013_seed_data_from_md.down,
    name: '20260323_082013_seed_data_from_md',
  },
  {
    up: migration_20260323_083341_clear_biography_content.up,
    down: migration_20260323_083341_clear_biography_content.down,
    name: '20260323_083341_clear_biography_content'
  },
];
