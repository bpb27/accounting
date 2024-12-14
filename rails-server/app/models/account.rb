class Account < ApplicationRecord
    include CustomIdGenerator
    custom_id_prefix "acc"

    belongs_to :organization
    has_many :entries, dependent: :destroy

    enum :account_type, asset: "asset", liability: "liability", equity: "equity", income: "income", expense: "expense"

    validates :name, presence: true

    scope :by_organization, ->(organization_id) { where(organization_id: organization_id) }
    scope :of_type, ->(account_type) { where(account_type: account_type) }
end
