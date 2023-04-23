//* Prisma client
const { PrismaClient } = require("@prisma/client");

//* Seed data
const pages = ["characters", "places", "items", "events"];

//* Seed function
async function main() {
  const p = new PrismaClient();
  try {
    console.log("Seeding pages types...");

    //verifies if page type already exists
    const pageTypes = await p.pageType.findMany();

    if (pageTypes.length > 0) {
      console.log("Page types already seeded!");
      return process.exit(0);
    }

    //creates page types
    for (const page of pages) {
      const createdPage = await p.pageType.create({
        data: {
          name: page,
        },
      });

      console.log(`Page type ${createdPage.name} created!`);
    }

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  } finally {
    await p.$disconnect();
  }
}

//* Seed execution
main();