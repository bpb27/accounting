class CreateEntries < ActiveRecord::Migration[8.0]
  def change
    create_table :entries, id: false do |t|
      t.string :id, primary_key: true
      t.references :transaction, null: false, foreign_key: true, type: :string
      t.references :account, null: false, foreign_key: true, type: :string
      t.decimal :amount, precision: 15, scale: 2, null: false
      t.string :description
      t.timestamps
    end

    add_index :entries, :id, unique: true
    add_index :entries, [ :transaction_id, :account_id ] # composite index
  end
end
