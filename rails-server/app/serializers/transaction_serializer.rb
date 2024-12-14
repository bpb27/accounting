class TransactionSerializer
  def initialize(transaction)
    @transaction = transaction
  end

  def as_json(_options = {})
    {
      id: @transaction.id,
      description: @transaction.description,
      occurredAt: @transaction.occurred_at.iso8601,
      occurredAtFormatted: format_date(@transaction.occurred_at),
      sumCredits: format_currency(sum_entries(@transaction.entries, :credit)),
      sumDebits: format_currency(sum_entries(@transaction.entries, :debit)),
      entries: format_entries(@transaction.entries)
    }
  end

  private

  def sum_entries(entries, type)
    entries
      .select { |entry| entry.entry_type == type }
      .sum { |entry| entry.amount.abs }
  end

  def format_currency(amount)
    ActionController::Base.helpers.number_to_currency(amount, unit: "$")
  end

  def format_date(date)
    date.strftime("%m/%d/%Y")
  end

  def format_entries(entries)
    entries.map do |entry|
      {
        id: entry.id,
        amount: entry.amount.abs,
        amountFormatted: format_currency(entry.amount.abs),
        entryType: entry.entry_type,
        description: entry.description || "",
        account: {
          name: entry.account.name,
          accountType: entry.account.account_type
        }
      }
    end
  end
end
