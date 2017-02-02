# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170201012702) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "packages", force: :cascade do |t|
    t.string   "tracking_number",                  null: false
    t.string   "phone_number",                     null: false
    t.boolean  "realtime_updates", default: false, null: false
    t.boolean  "final_update",     default: true,  null: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.string   "pin",                              null: false
    t.integer  "user_id"
    t.string   "carrier"
    t.boolean  "verified",         default: false, null: false
    t.index ["tracking_number", "phone_number"], name: "index_packages_on_tracking_number_and_phone_number", using: :btree
  end
end
