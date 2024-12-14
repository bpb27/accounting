class CreateTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :transactions, id: false do |t|
      t.string :id, primary_key: true
      t.references :organization, null: false, foreign_key: true, type: :string
      t.string :description
      t.datetime :occurred_at, null: false
      t.timestamps
    end

    add_index :transactions, :id, unique: true
  end
end
