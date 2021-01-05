import matter from 'gray-matter';
import marked from 'marked';
import yaml from 'js-yaml'


//get all posts

export const getAllPosts = async () => {
    const context = require.context('../_posts', false, /\.md$/)
    const posts = [];
    for(let key of context.keys()) {
        const post = key.slice(2);
        const content = await import(`../_posts/${post}`);
        const meta = matter(content.default);
        posts.push({
            slug: post.replace('.md', ''),
            title: meta.data.title
        })
    }
    return posts;
}

//get post by slug

export const getPostBySlug = async (slug) => {
    const fileContent = await import(`../_posts/${slug}.md`);
    const meta = matter(fileContent.default);
    const content = marked(meta.content);
    return {
        title: meta.data.title,
        content
    }
}

export const getConfig = async () => {
  const config = await import(`../config.yml`)
  return yaml.load(config.default);
}


