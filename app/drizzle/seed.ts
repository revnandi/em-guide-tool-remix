import { faker } from '@faker-js/faker';
import { db } from "./config.server";
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { articles, magazines } from "./schema.server";
import slugify from 'slugify';

const insertMagazineSchema = createInsertSchema(magazines);
type MagazineToBeInserted = z.infer<typeof insertMagazineSchema>;
const insertArticleSchema = createInsertSchema(articles);
type ArticleToBeInserted = z.infer<typeof insertArticleSchema>;


const generateMagazineRows = (count: number): MagazineToBeInserted[] => {
  const rows: MagazineToBeInserted[] = [];

  for (let i = 0; i < count; i++) {
    const name = faker.lorem.text()
    rows.push({
      id: Number(i),
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      slug: slugify(name, { lower: true, strict: true }),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return rows;
};

const generateArticleRows = (count: number): ArticleToBeInserted[] => {
  const rows: ArticleToBeInserted[] = [];

  for (let i = 0; i < count; i++) {
    const title = faker.lorem.sentence()
    rows.push({
      id: Number(i),
      title: title,
      slug: slugify(title, { lower: true, strict: true }),
      excerpt: faker.lorem.paragraphs({ min: 2, max: 5 }, '<br/>\n'),
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: false,
    });
  }

  return rows;
};

async function seed() {
  console.log('Seeding...');
  console.time('DB has been seeded!');

  // await db.delete(magazines);
  // const newMagazineRows = generateMagazineRows(10);
  // await db.insert(magazines).values(newMagazineRows).execute();

  await db.delete(articles);
  const newArticleRows = generateArticleRows(60);
  await db.insert(articles).values(newArticleRows).execute();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Seeding done!');
    process.exit(0);
  });