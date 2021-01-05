import { DefaultLayout } from '@layouts/default'
import Link from 'next/link';
import { getConfig, getAllPosts } from '@api';

export const getStaticProps = async () => {
    const config = await getConfig()
    const allPosts = await getAllPosts();

    return (
        {
            props: {
                posts: allPosts,
                title: config.title,
                description: config.description
            }
        }
    )
} 




const Blog = (props) => {
	return (
		<DefaultLayout title={props.title} description={props.description}>
			<p>List of posts:</p>
			<ul>
				{props.posts.map((post, idx) => {
					return (
						<li key={idx}>
							<Link href={`/posts/${post.slug}`}>
								<a>{post.title}</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</DefaultLayout>
    );
};

export default Blog;

