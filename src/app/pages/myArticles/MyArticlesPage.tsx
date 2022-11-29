import { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useGetMyArticlesMutation } from '../../services/articles.service'
import { IArticle } from '../../interfaces/articles.interface'
import './myArticlesPage.css'

const MyArticlesPage = () => {
  const [getMyArticles, { data, error, isLoading }] = useGetMyArticlesMutation()
  const [articles, setArticles] = useState<IArticle[]>([])

  useEffect(() => {
    getMyArticles(null)
  }, [])

  useEffect(() => {
    if (data && !error) {
      setArticles(data)
      console.log('MayArticlesPage:: data:', data)
    } else if (error) {
      console.log(`MayArticlesPage:: Error getting articles`, error)
    }
  }, [data, error])

  return (
    <>
      <h1>My Articles</h1>
      <div className="my-wrapper">
        {articles.map((article, index) => {
          return (
            <div key={index}>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Subtitle className="my-owner">{article.ownerName}</Card.Subtitle>
                  <Card.Text className="my-description">{article.description}</Card.Text>
                  <Button variant="primary">Read article</Button>
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default MyArticlesPage
