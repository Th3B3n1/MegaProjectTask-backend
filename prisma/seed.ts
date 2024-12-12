import { PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
	for (let i = 0; i < 100; i++) {
		await prisma.products.create({
			data: {
				name: faker.commerce.productName(),
				description: faker.commerce.productDescription(),
				price: Number(faker.commerce.price())
			}
		});
	}
	for (let i = 0; i < 100; i++) {
		await prisma.user.create({
			data: {
				name: faker.person.fullName(),
				email: faker.internet.exampleEmail(),
				password: faker.internet.password()
			}
		});
	}
	for (let i = 0; i < 100; i++)
	{
		await prisma.orders.create({
			data: {
				status: faker.helpers.arrayElements(["PENDING", "COMPLETED", "CANCELED"], 1)[0],
				date: faker.date.recent(),
				User: {
					connect: {
						id: faker.helpers.arrayElements(await prisma.user.findMany(), 1)[0].id,
					}
				},
				Products: {
					connect: faker.helpers.arrayElements(
						await prisma.products.findMany(), {min: 1, max: 5}
					),
				}
			}
		});
	}
}

seed()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	});