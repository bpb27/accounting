import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const prisma = new PrismaClient();
const seedCsvPath = path.join(__dirname, "seed.csv");

async function main() {
	console.log("Deleting existing data...");
	await prisma.entry.deleteMany();
	await prisma.transaction.deleteMany();
	await prisma.account.deleteMany();
	await prisma.organization.deleteMany();

	console.log("Creating organization...");
	const organization = await prisma.organization.create({
		data: {
			name: "Otto's Onions",
		},
	});

	console.log("Creating accounts...");
	const acctRevenue = await prisma.account.create({
		data: {
			name: "Revenue",
			accountType: "income",
			organizationId: organization.id,
		},
	});

	const acctShippingRevenue = await prisma.account.create({
		data: {
			name: "Shipping Revenue",
			accountType: "income",
			organizationId: organization.id,
		},
	});

	const acctSalesTaxPayable = await prisma.account.create({
		data: {
			name: "Sales Tax Payable",
			accountType: "liability",
			organizationId: organization.id,
		},
	});

	const acctAccountsReceivable = await prisma.account.create({
		data: {
			name: "Accounts Receivable",
			accountType: "asset",
			organizationId: organization.id,
		},
	});

	const acctCash = await prisma.account.create({
		data: {
			name: "Cash",
			accountType: "asset",
			organizationId: organization.id,
		},
	});

	console.log("Reading CSV...");

	const results: Record<string, string>[] = [];
	fs.createReadStream(seedCsvPath)
		.pipe(csv())
		.on("data", row => {
			results.push(row);
		})
		.on("end", async () => {
			for (const row of results) {
				const orderId = row.order_id;
				const orderedAt = new Date(row.ordered_at);
				const pricePerItem = parseFloat(row.price_per_item);
				const quantity = parseInt(row.quantity, 10);
				const shipping = parseFloat(row.shipping);
				const taxRate = parseFloat(row.tax_rate);
				const paymentOneAmount = parseFloat(row.payment_1_amount);
				const paymentTwoAmount = parseFloat(row.payment_2_amount);

				const subtotal = pricePerItem * quantity;
				const tax = subtotal * taxRate;
				const total = subtotal + shipping + tax;

				const transactionEntries = [
					{
						accountId: acctAccountsReceivable.id,
						amount: total,
						description: "Debit for total order amount",
					},
					{
						accountId: acctRevenue.id,
						amount: -subtotal,
						description: "Credit for revenue",
					},
					{
						accountId: acctShippingRevenue.id,
						amount: -shipping,
						description: "Credit for shipping revenue",
					},
					{
						accountId: acctSalesTaxPayable.id,
						amount: -tax,
						description: "Credit for sales tax payable",
					},
				];

				if (paymentOneAmount > 0) {
					transactionEntries.push(
						{
							accountId: acctCash.id,
							amount: paymentOneAmount,
							description: "Debit for payment 1",
						},
						{
							accountId: acctAccountsReceivable.id,
							amount: -paymentOneAmount,
							description: "Credit for payment 1 applied",
						}
					);
				}

				if (paymentTwoAmount > 0) {
					transactionEntries.push(
						{
							accountId: acctCash.id,
							amount: paymentTwoAmount,
							description: "Debit for payment 2",
						},
						{
							accountId: acctAccountsReceivable.id,
							amount: -paymentTwoAmount,
							description: "Credit for payment 2 applied",
						}
					);
				}

				try {
					console.log(`Creating transaction for order ${orderId}...`);
					await prisma.transaction.create({
						data: {
							organizationId: organization.id,
							description: `Order #${orderId}`,
							occurredAt: orderedAt,
							Entries: {
								create: transactionEntries,
							},
						},
					});
				} catch (error) {
					console.error(`Failed to create transaction for Order #${orderId}: ${(error as any).message}`);
				}
			}

			console.log("Seeding completed.");
			await prisma.$disconnect();
		});
}

main().catch(async error => {
	console.error(error);
	await prisma.$disconnect();
	process.exit(1);
});
