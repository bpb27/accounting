# NB: debits ands credits are stored as positive and negative numbers to simplify calculations
# TODO: may want to revisit and use entry_type instead

class Entry < ApplicationRecord
  include CustomIdGenerator
  custom_id_prefix "ent"

  # can't be named "transaction", conflicts with AR class name
  belongs_to :financial_transaction, class_name: "Transaction", foreign_key: "transaction_id"
  belongs_to :account

  validates :amount, presence: true, numericality: { other_than: 0 }

  scope :by_transaction, ->(transaction_id) { where(transaction_id: transaction_id) }
  scope :by_account, ->(account_id) { where(account_id: account_id) }
  scope :debits, -> { where("amount > 0") }
  scope :credits, -> { where("amount < 0") }

  def entry_type
    amount.positive? ? :debit : :credit
  end
end
