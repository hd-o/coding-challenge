import { NextApiHandler } from 'next'

const graphql: NextApiHandler<{}> = (_, res) => {
  res.status(200).json({})
}

export default graphql
