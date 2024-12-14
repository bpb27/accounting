import { Link as StyledLink, Table } from "@radix-ui/themes";
import { Link } from "react-router";
import { ApiResponses } from "../api";
import { linkTo } from "../router";

type OrganizationTableProps = {
	organizations: ApiResponses["organizations"]["records"];
};

export const OrganizationTable = ({ organizations }: OrganizationTableProps) => {
	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Created at</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Journals</Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{organizations.map(org => (
					<Table.Row key={org.id}>
						<Table.RowHeaderCell>{org.id}</Table.RowHeaderCell>
						<Table.Cell>{org.name}</Table.Cell>
						<Table.Cell>{org.createdAtFormatted}</Table.Cell>
						<Table.Cell>
							<StyledLink asChild>
								<Link to={linkTo("/organizations/:organizationId/journal_entries", { organizationId: org.id })}>
									View journal
								</Link>
							</StyledLink>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};
