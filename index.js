import { parse, evaluate } from 'groq-js'

const STAGED = { title: 'hi' }
const DRAFT = { title: 'hello' }

// Unfortunately `groq-js` hasn't implemented this, but would be simpler syntax 😩
// const QUERY = `delta::changedAny((title, description, body))`
const QUERY = `
    !(
        before().title == after().title
        && before().description == after().description
        && before().body == after().body
    )
`

const tree = await parse(QUERY, { mode: 'delta' })
const value = await evaluate(tree, { before: STAGED, draft: DRAFT })
const hasChanged = await value.get();
// true
console.log(hasChanged)