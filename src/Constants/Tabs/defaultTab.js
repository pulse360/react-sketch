import TabTypes from './types'
import { uuid4 } from '../../utils'

export default {
  id: uuid4(),
  order: 0,
  type: TabTypes.Note,
  name: '#1',
  data: {}
}
