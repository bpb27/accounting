class CreateAccounts < ActiveRecord::Migration[8.0]
  def change
    create_table :accounts, id: false do |t|
      t.string :id, primary_key: true
      t.references :organization, null: false, foreign_key: true, type: :string
      t.string :name, null: false
      t.string :account_type, null: false
      t.timestamps
    end

    add_index :accounts, :id, unique: true
    add_index :accounts, [ :organization_id, :account_type ] # composite index
  end
end
