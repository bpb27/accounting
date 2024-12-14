import { Decimal } from "@prisma/client/runtime/library";
import { PaginationParamsSchema, PaginationResponseSchema } from "./schemas";
import { z } from "zod";

const apiResponseNotFound = (params: { id: string; model: string }) => ({
	status: 404 as const,
	body: { message: `Not found: ${params.model} ${params.id}` },
});

const apiResponseSuccess = <T>(response: T) => ({
	status: 200 as const,
	body: response,
});

const formatNumberToCurrency = (value: number | Decimal): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	return formatter.format(Number(value));
};

const formatDateToMMDDYYYY = (value: Date): string => value.toLocaleDateString("en-US");

const stringIsNumeric = (str: string) => /[0-9]/.test(str);

const parseDateFromMMDDYYYYString = (date?: string): Date | undefined => {
	if (!date) return undefined;
	const [year, month, day] = date.split("-");
	return year.length === 4 && month.length === 2 && day.length === 2 && date.split("-").every(stringIsNumeric)
		? new Date(date)
		: undefined;
};

const parseNumberFromString = (value: string, defaultValue: number): number => {
	return value && stringIsNumeric(value) ? Number(value) : defaultValue;
};

const paginationParams = (params: z.infer<typeof PaginationParamsSchema>) => {
	const page = parseNumberFromString(params.page ?? "", 1);
	const perPage = parseNumberFromString(params.perPage ?? "", 25);
	const skip = (page - 1) * perPage;
	return {
		page,
		perPage,
		take: perPage,
		skip: skip < 0 ? 0 : skip,
	};
};

const paginationResponseShape = <T>({
	records,
	count,
	perPage,
	page,
}: {
	records: T[];
	count: number;
	page: number;
	perPage: number;
}): { records: T[]; metadata: z.infer<typeof PaginationResponseSchema> } => ({
	records,
	metadata: {
		totalRecords: count,
		page,
		perPage,
		totalPages: Math.ceil(count / perPage),
	},
});

// this file would eventually break up into smaller files over time
// but it's convenient to have a single import and entry point w/ autocomplete for util discovery
export const utils = {
	apiResponse: {
		notFound: apiResponseNotFound,
		success: apiResponseSuccess,
	},
	format: {
		dateToMMDDYYYY: formatDateToMMDDYYYY,
		numberToCurrency: formatNumberToCurrency,
	},
	string: {
		isNumeric: stringIsNumeric,
	},
	pagination: {
		responseShape: paginationResponseShape,
		params: paginationParams,
	},
	parse: {
		dateFromMMDDYYYYString: parseDateFromMMDDYYYYString,
		numberFromString: parseNumberFromString,
	},
};
