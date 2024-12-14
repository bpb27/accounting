import { Strong, Table, Text } from "@radix-ui/themes";
import { ApiResponses } from "../api";
import { Fragment } from "react/jsx-runtime";

type JournalEntryTableProps = {
	journalEntries: ApiResponses["journalEntries"]["records"];
};

export const JournalEntryTable = ({ journalEntries }: JournalEntryTableProps) => {
	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell>Account</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Debit</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Credit</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{journalEntries.map(transaction => (
					<Fragment key={transaction.id + "header"}>
						<Table.Row>
							<Table.RowHeaderCell>
								<Strong>{transaction.occurredAtFormatted} Journal Entry</Strong>
							</Table.RowHeaderCell>
							<Table.Cell />
							<Table.Cell />
							<Table.Cell />
						</Table.Row>
						{transaction.entries.map(entry => (
							<Table.Row key={entry.id}>
								<Table.RowHeaderCell>
									{entry.account.name}{" "}
									<Text as="span" color="gray">
										({entry.account.accountType})
									</Text>
								</Table.RowHeaderCell>
								<Table.Cell>{entry.entryType === "debit" && entry.amountFormatted}</Table.Cell>
								<Table.Cell>{entry.entryType === "credit" && entry.amountFormatted}</Table.Cell>
								<Table.Cell>{entry.description}</Table.Cell>
							</Table.Row>
						))}
						<Table.Row key={transaction.id + "total"}>
							<Table.Cell />
							<Table.Cell>{transaction.sumDebits}</Table.Cell>
							<Table.Cell>{transaction.sumCredits}</Table.Cell>
							<Table.Cell />
						</Table.Row>
						<Table.Row key={transaction.id + "end"}>
							<Table.Cell />
							<Table.Cell />
							<Table.Cell />
							<Table.Cell />
						</Table.Row>
					</Fragment>
				))}
			</Table.Body>
		</Table.Root>
	);
};
