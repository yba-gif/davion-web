import { appTheme, KottsterApp } from '@kottster/react'
import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import schema from '../kottster-app.json'

import { customFields } from './customFields'
import '@kottster/react/dist/style.css'

const pageEntries = import.meta.glob('./pages/**/index.{jsx,tsx}', { eager: true })

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider
            theme={appTheme}
            defaultColorScheme="light"
            forceColorScheme="light"
        >
            <KottsterApp
                schema={schema}
                pageEntries={pageEntries}
                customFields={customFields}
            />
        </MantineProvider>
    </React.StrictMode>,
)
