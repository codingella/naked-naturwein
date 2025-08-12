import * as documents from './documents'
import * as fields from './fields'

const schema = {
  types: [...Object.values(fields), ...Object.values(documents)],
}

//console.log(schema)

export default schema
