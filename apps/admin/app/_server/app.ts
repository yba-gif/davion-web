import { createApp } from '@kottster/server'
import schema from '../../kottster-app.json'
import { dataSourceRegistry } from './data-sources/registry'

export const app = createApp({
    schema,

    /*
   * For security, consider moving the secret key to an environment variable:
   * https://kottster.app/docs/deploying#before-you-deploy
   */
    secretKey: 'Qai9jTA4SY8Ok1S37Htz6Nmw',
})

app.registerDataSources(dataSourceRegistry)
