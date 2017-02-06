class ChangeUserIdTypeInPackages < ActiveRecord::Migration[5.0]
  def change
    change_column :packages, :user_id, :string
  end
end
