import { zValidator } from '@hono/zod-validator'
import { honoFactory } from '../factory'
import { getRecipes } from '../getRecipes'
import { cookpadSearchParamSchema } from '../schemas/cookpadSearchParamSchema'

const recipesRouter = honoFactory
  .createApp()
  .get('/', zValidator('query', cookpadSearchParamSchema), async (c) => {
    const { ingredients, page, recipe_hits } = c.req.valid('query')

    try {
      const recipes = await getRecipes({ ingredients, page, recipe_hits })
      return c.json(recipes)
    } catch (error) {
      return c.json({ error }, 500)
    }
  })

export { recipesRouter }
