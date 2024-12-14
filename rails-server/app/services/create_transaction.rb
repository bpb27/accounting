# Ensure that entries balance within a financial transaction
# TODO: should probably add a DB constraint too

class CreateTransaction
  def self.perform(organization_id:, description:, occurred_at:, entries:)
    ActiveRecord::Base.transaction do
      transaction = Transaction.create!(
        organization_id: organization_id,
        description: description,
        occurred_at: occurred_at
      )

      entries.each do |entry_params|
        transaction.entries.create!(entry_params)
      end

      unless balanced?(transaction)
        raise ActiveRecord::Rollback, "Transaction is unbalanced: debits must equal credits."
      end

      transaction
    end
  end

  private

  def self.balanced?(transaction)
    transaction.entries.sum(:amount).zero?
  end
end
