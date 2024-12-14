class Organization < ApplicationRecord
  include CustomIdGenerator
  custom_id_prefix "org"

  has_many :accounts, dependent: :destroy
  has_many :transactions, dependent: :destroy
  has_many :entries, through: :transactions

  validates :name, presence: true
end
