import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::index
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:21
 * @route '/validasi-buku-besar'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/validasi-buku-besar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::index
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:21
 * @route '/validasi-buku-besar'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::index
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:21
 * @route '/validasi-buku-besar'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::index
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:21
 * @route '/validasi-buku-besar'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ValidasiBukuBesarController::index
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:21
 * @route '/validasi-buku-besar'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ValidasiBukuBesarController::index
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:21
 * @route '/validasi-buku-besar'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ValidasiBukuBesarController::index
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:21
 * @route '/validasi-buku-besar'
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
/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::validateTransaksi
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:95
 * @route '/validasi-buku-besar/validate'
 */
export const validateTransaksi = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateTransaksi.url(options),
    method: 'post',
})

validateTransaksi.definition = {
    methods: ["post"],
    url: '/validasi-buku-besar/validate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::validateTransaksi
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:95
 * @route '/validasi-buku-besar/validate'
 */
validateTransaksi.url = (options?: RouteQueryOptions) => {
    return validateTransaksi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::validateTransaksi
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:95
 * @route '/validasi-buku-besar/validate'
 */
validateTransaksi.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateTransaksi.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ValidasiBukuBesarController::validateTransaksi
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:95
 * @route '/validasi-buku-besar/validate'
 */
    const validateTransaksiForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: validateTransaksi.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ValidasiBukuBesarController::validateTransaksi
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:95
 * @route '/validasi-buku-besar/validate'
 */
        validateTransaksiForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: validateTransaksi.url(options),
            method: 'post',
        })
    
    validateTransaksi.form = validateTransaksiForm
/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::invalidateTransaksi
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:116
 * @route '/validasi-buku-besar/invalidate'
 */
export const invalidateTransaksi = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: invalidateTransaksi.url(options),
    method: 'post',
})

invalidateTransaksi.definition = {
    methods: ["post"],
    url: '/validasi-buku-besar/invalidate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::invalidateTransaksi
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:116
 * @route '/validasi-buku-besar/invalidate'
 */
invalidateTransaksi.url = (options?: RouteQueryOptions) => {
    return invalidateTransaksi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::invalidateTransaksi
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:116
 * @route '/validasi-buku-besar/invalidate'
 */
invalidateTransaksi.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: invalidateTransaksi.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ValidasiBukuBesarController::invalidateTransaksi
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:116
 * @route '/validasi-buku-besar/invalidate'
 */
    const invalidateTransaksiForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: invalidateTransaksi.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ValidasiBukuBesarController::invalidateTransaksi
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:116
 * @route '/validasi-buku-besar/invalidate'
 */
        invalidateTransaksiForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: invalidateTransaksi.url(options),
            method: 'post',
        })
    
    invalidateTransaksi.form = invalidateTransaksiForm
const ValidasiBukuBesarController = { index, validateTransaksi, invalidateTransaksi }

export default ValidasiBukuBesarController