# Schema Information

## Packages
| column name      | data type | details                         |
|------------------|-----------|---------------------------------|
| id               | integer   | not null, primary key           |
| tracking_number  | string    | not null                        |
| phone_number     | string    | not null                        |
| realtime_updates | boolean   | not null, default false         |
| final_update     | boolean   | not null, default true          |
