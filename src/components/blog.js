import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import NewsletterSection from '~components/newsletter';

const MAX_ARTICLES = 3;

export default function BlogSection() {
  const data = useStaticQuery(graphql`
    {
      allMdx(sort: { fields: [frontmatter___publishedAt], order: DESC }) {
        nodes {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
            publishedAt
            summary
          }
          fields {
            slug
          }
          timeToRead
        }
      }
    }
  `);

  return (
    // Not changing below margin to match other sections because of svg pattern spacing
    <section className="mb-24">
      <h2 className="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-indigo mb-3">
        Blog
      </h2>
      <p className="text-primary text-3xl sm:text-5xl lg:text-5xl leading-none font-extrabold tracking-tight mb-10">
        Some recent posts.
      </p>

      {data.allMdx.nodes
        .slice(0, MAX_ARTICLES)
        .map(({ id, frontmatter, fields }) => (
          <div className="mb-10" key={id}>
            <Link to={`/blog${fields.slug}`}>
              <div>
                <p className="text-xl lg:text-2xl font-extrabold text-primary">
                  {frontmatter.title}
                </p>
                <p className="mt-2 text-secondary prose-lg">
                  {frontmatter.summary}
                </p>
              </div>
            </Link>
          </div>
        ))}

      <div className="mt-12">
        <NewsletterSection />
      </div>
    </section>
  );
}
