json.array! @posts do |post|
    json.id post.id
    json.title post.title
    json.content post.content
    json.url url_for(post)
end

