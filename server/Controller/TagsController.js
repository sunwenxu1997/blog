import Tag from '../model/TagsModel'
class TagsController{
    async updateTag(ctx) {
        ctx.body = await Tag.updateTag(ctx.params.id, ctx.request.body.tags)
    }
    async getTag(ctx){
        const res = await Tag.getTag()
        ctx.body = res
    }
}
export default new TagsController()