json.extract! user, :id, :first_name, :last_name, :description, :userpic, :topics
json.userpic_url asset_path(user.userpic.url)
