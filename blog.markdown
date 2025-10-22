---
layout: default
title: All Posts
permalink: /blog/
---

<h1>All Posts</h1>

<div class="posts-list">
    {% for post in site.posts %}
    <article class="post-preview">
        <div class="post-meta">
            {{ post.date | date: "%B %d, %Y" }} • {{ post.content | reading_time }} minute read
        </div>
        <h3 class="post-title">
            <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
        </h3>
        <div class="post-excerpt">
            {{ post.excerpt | strip_html | truncatewords: 30 }}
        </div>
        <a href="{{ post.url | relative_url }}" class="read-more">Continue reading →</a>
    </article>
    {% endfor %}
</div>
