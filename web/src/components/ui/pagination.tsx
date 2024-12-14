import { Button, Heading, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

type PaginationProps = {
	onPageChange: (newPage: number) => void;
	stats:
		| {
				totalRecords: number;
				totalPages: number;
				page: number;
				perPage: number;
		  }
		| undefined;
};

export const Pagination = ({ onPageChange, stats }: PaginationProps) => {
	const emptyState = { page: 0, perPage: 0, totalRecords: 0, totalPages: 0 };
	// cache pagination stats to prevent flickering while new data is loading
	const [cached, setCached] = useState(stats ?? emptyState);
	useEffect(() => {
		if (stats) setCached(stats);
	}, [stats, setCached]);

	return (
		<>
			<Heading as="h3" size="5">
				{cached.totalRecords} result{cached.totalRecords === 1 ? "" : "s"}
			</Heading>
			<Button variant="outline" onClick={() => onPageChange(cached.page - 1)} disabled={cached.page <= 0}>
				Prev page
			</Button>
			<Text>
				Page {cached.page} of {cached.totalPages}
			</Text>
			<Button
				variant="outline"
				onClick={() => onPageChange(cached.page + 1)}
				disabled={cached.page >= cached.totalPages}
			>
				Next page
			</Button>
		</>
	);
};
