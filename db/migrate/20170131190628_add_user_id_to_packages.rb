class AddUserIdToPackages < ActiveRecord::Migration[5.0]
  def change
    add_column :packages, :user_id, :integer
  end
end
