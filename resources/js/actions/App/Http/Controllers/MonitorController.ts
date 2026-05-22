import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MonitorController::index
 * @see app/Http/Controllers/MonitorController.php:14
 * @route '/monitor'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/monitor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MonitorController::index
 * @see app/Http/Controllers/MonitorController.php:14
 * @route '/monitor'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MonitorController::index
 * @see app/Http/Controllers/MonitorController.php:14
 * @route '/monitor'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MonitorController::index
 * @see app/Http/Controllers/MonitorController.php:14
 * @route '/monitor'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MonitorController::index
 * @see app/Http/Controllers/MonitorController.php:14
 * @route '/monitor'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MonitorController::index
 * @see app/Http/Controllers/MonitorController.php:14
 * @route '/monitor'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MonitorController::index
 * @see app/Http/Controllers/MonitorController.php:14
 * @route '/monitor'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const MonitorController = { index }

export default MonitorController