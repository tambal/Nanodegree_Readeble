import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Button } from "semantic-ui-react";
import Post from "./Post";
import { Link } from "react-router-dom";
class CategoryDetails extends Component {
  state = {
    orderByScore: false
  };

  render() {
    this.state.orderByScore
      ? this.props.details.sort(function(a, b) {
          return b.voteScore - a.voteScore;
        })
      : this.props.details.sort(function(a, b) {
          return b.timestamp - a.timestamp;
        });

    return (
      <div>
        {this.props.details.length !== 0 ? (
          <div>
            <Link to={`/newPost/${this.props.match.params.category}`}>
              <Button attached="top">Create Post</Button>
            </Link>
            <Button.Group size="large">
              {this.state.orderByScore === false ? (
                <Button
                  positive
                  onClick={() => this.setState({ orderByScore: false })}
                >
                  Order by: Date
                </Button>
              ) : (
                <Button onClick={() => this.setState({ orderByScore: false })}>
                  Order by: Date
                </Button>
              )}
              <Button.Or />
              {this.state.orderByScore ? (
                <Button
                  positive
                  onClick={() => this.setState({ orderByScore: true })}
                >
                  Order by: Score
                </Button>
              ) : (
                <Button onClick={() => this.setState({ orderByScore: true })}>
                  Order by: Score
                </Button>
              )}
            </Button.Group>
            {this.props.details.map(
              post =>
                post.category === this.props.match.params.category && (
                  <Post postDetails={post} key={post.id} />
                )
            )}
          </div>
        ) : (
          <Container>
            <h1>No posts found</h1>
            <Link to={`/newPost/${this.props.match.params.category}`}>
              <Button attached="top">Create Post</Button>
            </Link>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    details: state.posts
  };
};

export default connect(mapStateToProps)(CategoryDetails);
