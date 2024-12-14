import { prisma } from "../prisma/db";
import { utils } from "../utils";
import { Service } from "../utils/types";
import { OrganizationSchema, PaginationParamsSchema, PaginationResponseSchema } from "../utils/schemas";
import { z } from "zod";

export const GetOrganizationsSchema = {
	queryParams: PaginationParamsSchema,
	response: z.object({
		records: OrganizationSchema.array(),
		metadata: PaginationResponseSchema,
	}),
};

export const getOrganizations: Service<typeof GetOrganizationsSchema> = async params => {
	const { page, perPage, skip, take } = utils.pagination.params(params);

	const [count, result] = await Promise.all([
		prisma.organization.count(),
		prisma.organization.findMany({
			orderBy: { name: "asc" },
			take,
			skip,
		}),
	]);

	const records = result.map(org => ({
		...org,
		createdAt: org.createdAt.toISOString(),
		createdAtFormatted: utils.format.dateToMMDDYYYY(org.createdAt),
	}));

	return utils.pagination.responseShape({ records, count, page, perPage });
};
