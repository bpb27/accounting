import { Heading, Section, Container, Flex, Text, Box, Button } from "@radix-ui/themes";
import { api } from "../api";
import { useParams } from "react-router";
import { JournalEntryTable } from "../components/journal-entry-table";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Pagination } from "../components/ui/pagination";
import { ArrowUpIcon } from "lucide-react";

export const OrganizationsJournalEntriesPage = () => {
	const organizationId = useParams().organizationId!;
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [page, setPage] = useState(0);

	const { data: org } = api.organization.getOne.useQuery({
		queryKey: ["organization.getOne", organizationId],
		queryData: { params: { organizationId } },
	});

	const { data: journal } = api.organization.getJournalEntries.useQuery({
		queryKey: ["organization.getJournalEntries", organizationId, startDate, endDate, page],
		queryData: { params: { organizationId }, query: { startDate, endDate, page: page.toString() } },
	});

	const journalEntries = journal?.body.records ?? [];
	const pagination = journal?.body?.metadata;

	return (
		<Container>
			<Section size="1">
				<Flex gap="4" direction="column">
					<Box>
						<Heading>{org?.body.name}</Heading>
						<Text>List of all journal entries.</Text>
					</Box>
					<Flex gap="4">
						<Flex direction="column" gap="0">
							<Input
								id="startDate"
								label="Start date"
								onChange={ev => setStartDate(ev.target.value)}
								value={startDate}
							/>
						</Flex>
						<Flex direction="column" gap="0">
							<Input id="endDate" label="End date" onChange={ev => setEndDate(ev.target.value)} value={endDate} />
						</Flex>
					</Flex>
					<Flex align="center" gap="3">
						<Pagination onPageChange={setPage} stats={pagination} />
					</Flex>
				</Flex>
			</Section>
			<Section size="1">
				<JournalEntryTable journalEntries={journalEntries} />
				<Button onClick={() => window.scrollTo(0, 0)} aria-label="Scroll to top">
					<ArrowUpIcon />
				</Button>
			</Section>
		</Container>
	);
};
