import env from "dotenv"
import path from "node:path"

env.config({ path: path.join(process.cwd(), '.env') });

const config = {
    port: process.env.PORT || 5000,
    connection_str: process.env.CONNECTION_STRING,
    jwt_secret : process.env.JWT_SECRET,
}

export default config