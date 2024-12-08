import { PrismaClient } from '@prisma/client';
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
			include: {
				Orders: true,
			},
			data: {
				name: faker.person.fullName(),
				email: faker.internet.exampleEmail(),
				Orders: {
					connect: faker.helpers.arrayElements(
						await prisma.products.findMany(),
						faker.number.int({ min: 1, max: 5 })
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