class RemoveIndexFromPackages < ActiveRecord::Migration[5.0]
  def change
    remove_index :packages, column: [:tracking_number, :phone_number]
  end
end
