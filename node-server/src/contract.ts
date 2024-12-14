import { initContract } from "@ts-rest/core";
import { initServer } from "@ts-rest/express";
import { getJournalEntries, GetOrganizationJournalEntriesSchema } from "./services/get-organization-journal-entries";
import { utils } from "./utils";
import { getOrganizations, GetOrganizationsSchema } from "./services/get-organizations";
import { getOrganization, GetOrganizationSchema } from "./services/get-organization";

const c = initContract();
const s = initServer();

// define API contract shape here
export const contract = c.router(
	{
		organization: c.router({
			getOne: {
				method: "GET",
				summary: "Get an organization",
				path: `/organizations/:organizationId`,
				pathParams: GetOrganizationSchema.pathParams,
				responses: {
					200: GetOrganizationSchema.response,
				},
			},
			getAll: {
				method: "GET",
				summary: "Get all organizations",
				path: `/organizations`,
				query: GetOrganizationsSchema.queryParams,
				responses: {
					200: GetOrganizationsSchema.response,
				},
			},
			getJournalEntries: {
				method: "GET",
				summary: "Get an organization's journal entries",
				path: `/organizations/:organizationId/transactions`,
				pathParams: GetOrganizationJournalEntriesSchema.pathParams,
				query: GetOrganizationJournalEntriesSchema.queryParams,
				responses: {
					200: GetOrganizationJournalEntriesSchema.response,
				},
			},
		}),
	},
	{
		pathPrefix: "/api/v1",
	}
);

// define API implementation of contract here
export const router = s.router(contract, {
	organization: {
		getOne: async ({ params }) => {
			const response = await getOrganization(params);
			return utils.apiResponse.success(response);
		},
		getAll: async ({ query }) => {
			const response = await getOrganizations(query);
			return utils.apiResponse.success(response);
		},
		getJournalEntries: async ({ params, query }) => {
			const response = await getJournalEntries({ ...params, ...query });
			return utils.apiResponse.success(response);
		},
	},
});
