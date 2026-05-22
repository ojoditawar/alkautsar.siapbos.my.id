import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LaporanBukuBesarController::index
 * @see app/Http/Controllers/LaporanBukuBesarController.php:15
 * @route '/laporan-buku-besar'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/laporan-buku-besar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LaporanBukuBesarController::index
 * @see app/Http/Controllers/LaporanBukuBesarController.php:15
 * @route '/laporan-buku-besar'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LaporanBukuBesarController::index
 * @see app/Http/Controllers/LaporanBukuBesarController.php:15
 * @route '/laporan-buku-besar'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LaporanBukuBesarController::index
 * @see app/Http/Controllers/LaporanBukuBesarController.php:15
 * @route '/laporan-buku-besar'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LaporanBukuBesarController::index
 * @see app/Http/Controllers/LaporanBukuBesarController.php:15
 * @route '/laporan-buku-besar'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LaporanBukuBesarController::index
 * @see app/Http/Controllers/LaporanBukuBesarController.php:15
 * @route '/laporan-buku-besar'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LaporanBukuBesarController::index
 * @see app/Http/Controllers/LaporanBukuBesarController.php:15
 * @route '/laporan-buku-besar'
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
const LaporanBukuBesarController = { index }

export default LaporanBukuBesarController