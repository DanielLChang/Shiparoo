class CreatePackages < ActiveRecord::Migration[5.0]
  def change
    create_table :packages do |t|
      t.string :tracking_number, null: false
      t.string :phone_number, null: false
      t.boolean :realtime_updates, null: false, default: false
      t.boolean :final_update, null: false, default: true

      t.timestamps null: false
    end

    add_index :packages, [:tracking_number, :phone_number], unique: true
  end
end
