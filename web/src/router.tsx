import { createBrowserRouter, RouteObject } from "react-router";
import { OrganizationsJournalEntriesPage } from "./pages/organizations-journal-entries";
import { App } from "./app";
import { OrganizationsPage } from "./pages/organizations";
import { ExtractPaths, PathParam } from "./utils/types";

// add all client-side routes here
const config = [
	{
		path: "/" as const,
		Component: App,
		children: [
			{
				index: true,
				Component: OrganizationsPage,
			},
			{
				path: "/organizations" as const,
				Component: OrganizationsPage,
			},
			{
				path: "/organizations/:organizationId/journal_entries" as const,
				Component: OrganizationsJournalEntriesPage,
			},
		],
	},
] satisfies RouteObject[];

export const router = createBrowserRouter(config);

// function overloads - two ways to call this function
export function linkTo<Path extends Route>(path: Path): string;
export function linkTo<Path extends Route>(path: Path, params: PathParam<Path>): string;

// use this to reference all routes - ensures no magic strings and allows easy refactoring
/** returns a client-side path and interpolates the relevant path params if applicable  */
export function linkTo<Path extends Route>(path: Path, params?: PathParam<Path>): string {
	if (!params) return path;
	return Object.keys(params).reduce(
		(resolvedPath, key) => resolvedPath.replace(`:${key}`, (params as Record<string, string>)[key]),
		path
	);
}

type Route = ExtractPaths<typeof config>;
