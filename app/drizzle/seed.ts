import { faker } from '@faker-js/faker';
import { db } from "./config.server";
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { articles, magazines, languages } from "./schema.server";
import slugify from 'slugify';

const insertLanguageSchema = createInsertSchema(languages);
type LanguageToBeInserted = z.infer<typeof insertLanguageSchema>;
const insertMagazineSchema = createInsertSchema(magazines);
type MagazineToBeInserted = z.infer<typeof insertMagazineSchema>;
const insertArticleSchema = createInsertSchema(articles);
type ArticleToBeInserted = z.infer<typeof insertArticleSchema>;

const generateLanguageRows = (): LanguageToBeInserted[] => {
  const rows: LanguageToBeInserted[] = [];

  rows.push({
    id: 1,
    name: "English",
    slug: "english",
    code: "en",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  rows.push({
    id: 2,
    name: "German",
    slug: "german",
    code: "de",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  rows.push({
    id: 3,
    name: "Slovak",
    slug: "slovak",
    code: "sk",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  rows.push({
    id: 4,
    name: "Hungarian",
    slug: "hungarian",
    code: "hu",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return rows;
};

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
      originalUrl: faker.internet.url(),
      languageId: faker.number.int({ min: 1, max: 4 }),
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

  await db.delete(languages);
  const newLanguageRows = generateLanguageRows();
  await db.insert(languages).values(newLanguageRows).execute();


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