import { z } from "zod";
import { prisma } from "../prisma/db";
import { utils } from "../utils";
import { EntrySchema, PaginationParamsSchema, PaginationResponseSchema, TransactionSchema } from "../utils/schemas";
import { Prisma } from "@prisma/client";
import { Service } from "../utils/types";

export const GetOrganizationJournalEntriesSchema = {
	queryParams: PaginationParamsSchema.extend({
		endDate: z.string().optional(),
		startDate: z.string().optional(),
	}),
	pathParams: z.object({
		organizationId: z.string(),
	}),
	response: z.object({
		metadata: PaginationResponseSchema,
		records: TransactionSchema.extend({
			entries: EntrySchema.array(),
		}).array(),
	}),
};

export const getJournalEntries: Service<typeof GetOrganizationJournalEntriesSchema> = async params => {
	const { page, perPage, skip, take } = utils.pagination.params(params);

	const where: Prisma.TransactionWhereInput = {
		organizationId: params.organizationId,
		occurredAt: {
			gte: utils.parse.dateFromMMDDYYYYString(params.startDate),
			lte: utils.parse.dateFromMMDDYYYYString(params.endDate),
		},
	};

	const [count, result] = await Promise.all([
		prisma.transaction.count({ where }),
		prisma.transaction.findMany({
			where,
			take,
			skip,
			orderBy: { occurredAt: "desc" },
			include: {
				Entries: {
					include: { Account: true },
				},
			},
		}),
	]);

	// TODO: potentially create a Transaction model class if this logic is needed in multiple places

	const records = result.map(transaction => {
		const entries = transaction.Entries.map(entry => ({
			...entry,
			amount: Math.abs(entry.amount.toNumber()),
			entryType: entry.amount.toNumber() > 0 ? ("debit" as const) : ("credit" as const),
		}));

		const credits = entries
			.filter(({ entryType }) => entryType === "credit")
			.reduce((sum, { amount }) => sum + amount, 0);

		const debits = entries
			.filter(({ entryType }) => entryType === "debit")
			.reduce((sum, { amount }) => sum + amount, 0);

		return {
			id: transaction.id,
			description: transaction.description ?? "",
			occurredAt: transaction.occurredAt.toISOString(),
			occurredAtFormatted: utils.format.dateToMMDDYYYY(transaction.occurredAt),
			sumCredits: utils.format.numberToCurrency(credits),
			sumDebits: utils.format.numberToCurrency(debits),
			entries: entries.map(entry => ({
				id: entry.id,
				amount: entry.amount,
				amountFormatted: utils.format.numberToCurrency(entry.amount),
				entryType: entry.entryType,
				description: entry.description ?? "",
				account: {
					name: entry.Account.name,
					accountType: entry.Account.accountType,
				},
			})),
		};
	});

	return utils.pagination.responseShape({ records, count, page, perPage });
};
