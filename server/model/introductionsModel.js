import query from '../utils/query'
class Introductions {
    async getIntroductions() {
        return await query(`SELECT id,title,tags,publishTime FROM ARTICLE`)
    }
}

export default new Introductions()
