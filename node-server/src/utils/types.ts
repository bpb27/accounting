import { z } from "zod";

/** function signature of service that uses a zod schema for response and params */
export type Service<S extends { response: z.ZodTypeAny; queryParams?: z.ZodTypeAny; pathParams?: z.ZodTypeAny }> = (
	params: (S["queryParams"] extends z.ZodTypeAny ? z.infer<S["queryParams"]> : {}) &
		(S["pathParams"] extends z.ZodTypeAny ? z.infer<S["pathParams"]> : {})
) => Promise<z.infer<S["response"]>>;
