const dotEnv = require('dotenv')
dotEnv.config({ path: '.env.development'})
console.error = () => {}
console.log = () => {}
console.warning = () => {}