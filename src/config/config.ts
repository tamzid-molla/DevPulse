import env from "dotenv"
import path from "node:path"

env.config({ path: path.join(process.cwd(), '.env') });

const config = {
    port: process.env.PORT || 5000,

}

export default config