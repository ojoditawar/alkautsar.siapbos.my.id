import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
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
* @see \App\Http\Controllers\ValidasiBukuBesarController::validate
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:95
 * @route '/validasi-buku-besar/validate'
 */
export const validate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validate.url(options),
    method: 'post',
})

validate.definition = {
    methods: ["post"],
    url: '/validasi-buku-besar/validate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::validate
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:95
 * @route '/validasi-buku-besar/validate'
 */
validate.url = (options?: RouteQueryOptions) => {
    return validate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::validate
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:95
 * @route '/validasi-buku-besar/validate'
 */
validate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validate.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ValidasiBukuBesarController::validate
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:95
 * @route '/validasi-buku-besar/validate'
 */
    const validateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: validate.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ValidasiBukuBesarController::validate
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:95
 * @route '/validasi-buku-besar/validate'
 */
        validateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: validate.url(options),
            method: 'post',
        })
    
    validate.form = validateForm
/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::invalidate
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:116
 * @route '/validasi-buku-besar/invalidate'
 */
export const invalidate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: invalidate.url(options),
    method: 'post',
})

invalidate.definition = {
    methods: ["post"],
    url: '/validasi-buku-besar/invalidate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::invalidate
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:116
 * @route '/validasi-buku-besar/invalidate'
 */
invalidate.url = (options?: RouteQueryOptions) => {
    return invalidate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ValidasiBukuBesarController::invalidate
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:116
 * @route '/validasi-buku-besar/invalidate'
 */
invalidate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: invalidate.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ValidasiBukuBesarController::invalidate
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:116
 * @route '/validasi-buku-besar/invalidate'
 */
    const invalidateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: invalidate.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ValidasiBukuBesarController::invalidate
 * @see app/Http/Controllers/ValidasiBukuBesarController.php:116
 * @route '/validasi-buku-besar/invalidate'
 */
        invalidateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: invalidate.url(options),
            method: 'post',
        })
    
    invalidate.form = invalidateForm
const validasiBukuBesar = {
    index: Object.assign(index, index),
validate: Object.assign(validate, validate),
invalidate: Object.assign(invalidate, invalidate),
}

export default validasiBukuBesar