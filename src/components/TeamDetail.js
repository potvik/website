import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

class TeamDetail extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="bios">
        {posts &&
          posts.map(({ node: post }, index) => (
           <div className="bio"  key={index}>
            <img src={post.frontmatter.avatar} className="bio__image"
              srcSet={post.frontmatter.avatar && post.frontmatter.avatar.toString().replace('.','_2x.') + " 2x, " + post.frontmatter.avatar + " 1x"}
              alt={post.frontmatter.name + ", Bio Image"} />
            <h3>{post.frontmatter.name}</h3>
            {post.frontmatter.desc.map( item => (
              <p>{item.text}</p>
            ))}
         </div>
          ))}
      </div>
    )
  }
}

TeamDetail.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query TeamDetailQuery {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "team-member" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                templateKey
                avatar
                name
                desc {
                  text
                }
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <TeamDetail data={data} count={count} />}
  />
)
