import Introduction from '../model/introductionsModel'

class IntroControllers {

    async getIntroductions(ctx) {
        ctx.body =  await Introduction.getIntroductions()
    }
}

export default new IntroControllers()
