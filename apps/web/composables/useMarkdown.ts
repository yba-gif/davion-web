import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,        // Enable HTML tags in source
  xhtmlOut: false,   // Use '/' to close single tags (<br />)
  breaks: false,     // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-',  // CSS language prefix for fenced blocks
  linkify: true,     // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
})

export const useMarkdown = () => {
  const renderMarkdown = (content: string): string => {
    if (!content) return ''
    return md.render(content)
  }

  return {
    renderMarkdown
  }
}