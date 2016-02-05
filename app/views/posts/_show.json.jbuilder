json.id @post.id
json.title @post.title
json.content @post.content
json.new_comment_url url_for([:new, @post, :comment])
