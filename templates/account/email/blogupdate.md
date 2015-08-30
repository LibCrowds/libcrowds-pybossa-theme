# Update Project: {{blog['title']}} by {{blog['owner']['name']}} [1]
{{blog['body'] | striptags }}
***
[1]{{url_for('project.show_blogpost', short_name=blog.project.short_name, id=blog.id, _external=True)}}
***
***
[Update your notification preferences]({{ url_for('account.update_profile', name=user['name'], _external=True)}})
[Follow us on Twitter](http://twitter.com/LibCrowds)
