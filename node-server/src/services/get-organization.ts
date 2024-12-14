import { z } from "zod";
import { prisma } from "../prisma/db";
import { utils } from "../utils";
import { OrganizationSchema } from "../utils/schemas";
import { Service } from "../utils/types";

export const GetOrganizationSchema = {
	pathParams: z.object({ organizationId: z.string() }),
	response: OrganizationSchema,
};

export const getOrganization: Service<typeof GetOrganizationSchema> = async ({ organizationId }) => {
	const result = await prisma.organization.findUniqueOrThrow({
		where: { id: organizationId },
	});

	return {
		...result,
		createdAt: result.createdAt.toISOString(),
		createdAtFormatted: utils.format.dateToMMDDYYYY(result.createdAt),
	};
};
