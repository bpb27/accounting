import { Box, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { api } from "../api";
import { OrganizationTable } from "../components/organization-table";
import { Pagination } from "../components/ui/pagination";
import { useState } from "react";

export const OrganizationsPage = () => {
	const [page, setPage] = useState(0);
	const { data } = api.organization.getAll.useQuery({
		queryKey: ["organization.getAll", page],
		queryData: { query: { page: page.toString() } },
	});

	const organizations = data?.body.records ?? [];
	const pagination = data?.body?.metadata;

	return (
		<Container>
			<Section size="1">
				<Flex gap="4" direction="column">
					<Box>
						<Heading>Organizations</Heading>
						<Text color="gray">List of all organizations.</Text>
					</Box>
					<Flex align="center" gap="3">
						<Pagination onPageChange={setPage} stats={pagination} />
					</Flex>
				</Flex>
			</Section>
			<Section size="1">
				<OrganizationTable organizations={organizations} />
			</Section>
		</Container>
	);
};
