# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2024_12_06_225821) do
  create_table "accounts", id: :string, force: :cascade do |t|
    t.string "organization_id", null: false
    t.string "name", null: false
    t.string "account_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["id"], name: "index_accounts_on_id", unique: true
    t.index ["organization_id", "account_type"], name: "index_accounts_on_organization_id_and_account_type"
    t.index ["organization_id"], name: "index_accounts_on_organization_id"
  end

  create_table "entries", id: :string, force: :cascade do |t|
    t.string "transaction_id", null: false
    t.string "account_id", null: false
    t.decimal "amount", precision: 15, scale: 2, null: false
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_entries_on_account_id"
    t.index ["id"], name: "index_entries_on_id", unique: true
    t.index ["transaction_id", "account_id"], name: "index_entries_on_transaction_id_and_account_id"
    t.index ["transaction_id"], name: "index_entries_on_transaction_id"
  end

  create_table "organizations", id: :string, force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transactions", id: :string, force: :cascade do |t|
    t.string "organization_id", null: false
    t.string "description"
    t.datetime "occurred_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["id"], name: "index_transactions_on_id", unique: true
    t.index ["organization_id"], name: "index_transactions_on_organization_id"
  end

  add_foreign_key "accounts", "organizations"
  add_foreign_key "entries", "accounts"
  add_foreign_key "entries", "transactions"
  add_foreign_key "transactions", "organizations"
end
