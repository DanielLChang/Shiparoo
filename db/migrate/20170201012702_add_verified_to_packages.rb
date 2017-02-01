class AddVerifiedToPackages < ActiveRecord::Migration[5.0]
  def change
    add_column :packages, :verified, :boolean, default: false, null: false
  end
end
