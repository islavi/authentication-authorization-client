import { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useAppDispatch } from '../../redux/hooks'
import { setArticles as setReducerArticles } from '../../redux/slices/articles.slice'
import { useGetAllArticlesMutation } from '../../services/articles.service'
import { IArticle } from '../../interfaces/articles.interface'
import './homePage.css'

const HomePage = () => {
  const [getAllArticles, { data, error }] = useGetAllArticlesMutation()
  const dispatch = useAppDispatch()
  const [articles, setArticles] = useState<IArticle[]>([])

  useEffect(() => {
    getAllArticles(null)
  }, [getAllArticles])

  useEffect(() => {
    if (data && !error) {
      dispatch(setReducerArticles(data))
      setArticles(data)
      console.log('HomePage:: data:', data)
    } else if (error) {
      console.log(`HomePage:: Error getting articles`, error)
    }
  }, [data, error, dispatch])

  return (
    <>
      <h1>Home</h1>
      <h3>List of all articles:</h3>
      <div className="home-wrapper">
        {articles.map((article, index) => {
          return (
            <div key={index}>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Subtitle className="home-owner">{article.ownerName}</Card.Subtitle>
                  <Card.Text className="home-description">{article.description}</Card.Text>
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
export default HomePage
