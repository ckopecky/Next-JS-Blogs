import {PostLayout} from '@layouts/post';
import { getPostBySlug, getAllPosts } from '@api';

const Post = (props) => <PostLayout title={props.title} content={props.content} />

export default Post;


export const getStaticProps = async (context) => {
    return ({
        props: await getPostBySlug(context.params.slug)
    });
};

export const getStaticPaths = async () => {
    let paths = await getAllPosts();
    paths = paths.map(post => {
        return ({
            params: {
                slug: post.slug
            }
        })
    });

    return ({
        paths,
        fallback: false
    })
}