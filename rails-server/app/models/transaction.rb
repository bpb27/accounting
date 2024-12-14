class Transaction < ApplicationRecord
  include CustomIdGenerator
  custom_id_prefix "tra"

  belongs_to :organization
  has_many :entries, dependent: :destroy

  scope :by_organization, ->(organization_id) { where(organization_id: organization_id) }
  scope :starting_from, ->(date) { where("occurred_at >= ?", date) }
  scope :ending_at, ->(date) { where("occurred_at <= ?", date) }

  validates :occurred_at, presence: true
end
