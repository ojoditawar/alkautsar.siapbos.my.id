import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LaporanNeracaController::index
 * @see app/Http/Controllers/LaporanNeracaController.php:15
 * @route '/laporan-neraca'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/laporan-neraca',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LaporanNeracaController::index
 * @see app/Http/Controllers/LaporanNeracaController.php:15
 * @route '/laporan-neraca'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LaporanNeracaController::index
 * @see app/Http/Controllers/LaporanNeracaController.php:15
 * @route '/laporan-neraca'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LaporanNeracaController::index
 * @see app/Http/Controllers/LaporanNeracaController.php:15
 * @route '/laporan-neraca'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LaporanNeracaController::index
 * @see app/Http/Controllers/LaporanNeracaController.php:15
 * @route '/laporan-neraca'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LaporanNeracaController::index
 * @see app/Http/Controllers/LaporanNeracaController.php:15
 * @route '/laporan-neraca'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LaporanNeracaController::index
 * @see app/Http/Controllers/LaporanNeracaController.php:15
 * @route '/laporan-neraca'
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
const LaporanNeracaController = { index }

export default LaporanNeracaController