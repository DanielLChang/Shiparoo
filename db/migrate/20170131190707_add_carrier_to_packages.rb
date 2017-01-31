class AddCarrierToPackages < ActiveRecord::Migration[5.0]
  def change
    add_column :packages, :carrier, :string
  end
end
