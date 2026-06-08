'use client'

import ReactMarkdown from 'react-markdown'
import styles from './BlogPostPage.module.css'

export default function BlogPostContent({ body }: { body: string }) {
  return (
    <div className={styles.content}>
    <ReactMarkdown
      components={{
        h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
        h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
        p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
        ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
        ol: ({ children }) => <ol className={styles.list}>{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
        code: ({ children }) => <code className={styles.code}>{children}</code>,
        pre: ({ children }) => <pre className={styles.pre}>{children}</pre>,
      }}
    >
      {body}
    </ReactMarkdown>
    </div>
  )
}
