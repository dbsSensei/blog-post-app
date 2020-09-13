import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import { Route } from "react-router-dom";

import FullPost from "../FullPost/FullPost";
import "./Posts.css";

class Posts extends Component<{ history: any; match: any }, {}> {
  state: {
    posts: [];
    error: any;
  } = {
    posts: [],
    error: null,
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatePosts = posts.map((post: Object) => {
          return { ...post, author: "DBS" };
        });
        this.setState({ posts: updatePosts });
      })
      .catch((err) => {
        this.setState({
          posts: [
            { id: Math.random(), title: "Null1" },
            { id: Math.random(), title: "Null2" },
            { id: Math.random(), title: "Null3" },
            { id: Math.random(), title: "Null4" },
          ],
        });
        console.log(err);
      });
  }

  postSelectedHandler = (id: number) => {
    // this.props.history.push({pathname: '/posts/' + id});
    this.props.history.push("/posts/" + id);
  };

  render() {
    let posts: JSX.Element | JSX.Element[] = (
      <p style={{ textAlign: "center" }}>Something went wrong!</p>
    );

    if (!this.state.error) {
      posts = this.state.posts.map(
        (post: { id: string & number; title: any; author: string }) => {
          return (
            // <Link to={"/posts/" + post.id} key={post.id}>
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
            // </Link>
          );
        }
      );
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
