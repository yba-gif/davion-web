import { app } from '@/_server/app'
import { postgres } from '@/_server/data-sources/postgres'
import pageSettings from './settings.json'

const controller = app.defineTableController(postgres, {
    ...pageSettings,
    rootTable: {
        ...pageSettings.rootTable,
    /**
     * Need more customization? Adjust the table configuration here.
     * Learn more: https://kottster.app/docs/table/configuration/api#parameters
     */
    },
})

export default controller
