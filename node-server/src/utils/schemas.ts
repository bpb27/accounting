import { z } from "zod";

export const PaginationParamsSchema = z.object({
	perPage: z.string().optional(),
	page: z.string().optional(),
});

export const PaginationResponseSchema = z.object({
	totalRecords: z.number(),
	page: z.number(),
	perPage: z.number(),
	totalPages: z.number(),
});

export const OrganizationSchema = z.object({
	id: z.string(),
	name: z.string(),
	createdAt: z.string(),
	createdAtFormatted: z.string(),
});

export const TransactionSchema = z.object({
	id: z.string(),
	description: z.string(),
	occurredAt: z.string(),
	occurredAtFormatted: z.string(),
	sumDebits: z.string(),
	sumCredits: z.string(),
});

export const EntrySchema = z.object({
	id: z.string(),
	amount: z.number(),
	amountFormatted: z.string(),
	description: z.string(),
	entryType: z.enum(["debit", "credit"]),
	account: z.object({
		name: z.string(),
		accountType: z.string(),
	}),
});
