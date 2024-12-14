import { RouteObject } from "react-router";

/** creates a string union of route paths found in a react router config object */
export type ExtractPaths<T extends RouteObject[]> = NonNullable<
	T[number]["path"] | (T[number]["children"] extends RouteObject[] ? ExtractPaths<T[number]["children"]> : never)
>;

/** creates an object of path params in found a route string, e.g. /user/:id returns { id: string } */
export type PathParam<Path extends string> = Path extends `${string}:${infer Param}/${infer Rest}`
	? { [K in Param | keyof PathParam<`/${Rest}`>]: string }
	: Path extends `${string}:${infer Param}`
	? { [K in Param]: string }
	: null;

/** takes an object type and makes the hover overlay more readable */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};
