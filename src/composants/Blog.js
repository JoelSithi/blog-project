import React, { Component } from 'react'
import axios from 'axios'
import Post from './Post/Post'

import PostComplet from "./PostComplet/PostComplet"
import NvPost from './NvPost/NvPost'
import './Blog.css'

class Blog extends Component {

    state = {
        posts: [],
        selectpostId: null
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(reponse => {
            const articles = reponse.data.slice(0,4)
            const postsAuteur = articles.map(post => {
                return {
                    ...post,
                    auteur: 'Hugo'
                }
            })
            this.setState({posts: postsAuteur})
        })
    }

    selectPost = (id) => {
        this.setState({selectpostId : id})
        
    }
 
    render () {

        const posts = this.state.posts.map(post => {
            return <Post key={post.id} auteur={post.auteur} titre={post.title}
            clicked={() => this.selectPost(post.id)} />
        })

        return (
            <div>
                <section>
                    <NvPost />
                </section>
                <section>
                    <PostComplet id={this.state.selectpostId}/>
                </section>
                <h2 className="text-center my-5">Tous les Articles ...</h2>
                <section className="Posts">
                    {posts}
                </section>

            </div>
        );
    }
}

export default Blog;