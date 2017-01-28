class AddPinToPackages < ActiveRecord::Migration[5.0]
  def change
    add_column :packages, :pin, :string, null: false
  end
end
