import { Migration } from '@mikro-orm/migrations';

export class Migration20211120004913 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "example" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "example" varchar(255) not null);');
    this.addSql('create index "example_example_index" on "example" ("example");');
  }

}
