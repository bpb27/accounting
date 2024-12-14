class CreateOrganizations < ActiveRecord::Migration[7.0]
  def change
    create_table :organizations, id: false do |t|
      t.string :id, primary_key: true
      t.string :name, null: false
      t.timestamps
    end
  end
end
