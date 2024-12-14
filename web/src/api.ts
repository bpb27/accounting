import { QueryClient } from "@tanstack/react-query";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { ClientInferResponseBody } from "@ts-rest/core";
import { contract } from "../../node-server/src/contract";

export const api = initTsrReactQuery(contract, {
	baseUrl: "http://localhost:3001", // TODO: env
	baseHeaders: {
		"x-app-source": "ts-rest",
	},
});

export type ApiResponses = {
	organizations: ClientInferResponseBody<typeof contract.organization.getAll, 200>;
	journalEntries: ClientInferResponseBody<typeof contract.organization.getJournalEntries, 200>;
};

export const queryClient = new QueryClient();
