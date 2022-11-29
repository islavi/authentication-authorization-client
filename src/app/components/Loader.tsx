import Spinner from 'react-bootstrap/Spinner'

interface Props {
  show: boolean
}

const Loader = (props: Props) => {
  const { show } = props
  return show ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <></>
  )
}

export default Loader
