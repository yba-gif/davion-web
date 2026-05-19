import { DataSourceRegistry } from '@kottster/server'
import { postgres } from './postgres'

export const dataSourceRegistry = new DataSourceRegistry([
    postgres,
    // Admin panel is running at http://localhost:5481
])
