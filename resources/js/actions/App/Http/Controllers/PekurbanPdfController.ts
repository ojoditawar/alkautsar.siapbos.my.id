import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PekurbanPdfController::generate
 * @see app/Http/Controllers/PekurbanPdfController.php:12
 * @route '/pekurbans-pdf'
 */
export const generate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generate.url(options),
    method: 'get',
})

generate.definition = {
    methods: ["get","head"],
    url: '/pekurbans-pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PekurbanPdfController::generate
 * @see app/Http/Controllers/PekurbanPdfController.php:12
 * @route '/pekurbans-pdf'
 */
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PekurbanPdfController::generate
 * @see app/Http/Controllers/PekurbanPdfController.php:12
 * @route '/pekurbans-pdf'
 */
generate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PekurbanPdfController::generate
 * @see app/Http/Controllers/PekurbanPdfController.php:12
 * @route '/pekurbans-pdf'
 */
generate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PekurbanPdfController::generate
 * @see app/Http/Controllers/PekurbanPdfController.php:12
 * @route '/pekurbans-pdf'
 */
    const generateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PekurbanPdfController::generate
 * @see app/Http/Controllers/PekurbanPdfController.php:12
 * @route '/pekurbans-pdf'
 */
        generateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PekurbanPdfController::generate
 * @see app/Http/Controllers/PekurbanPdfController.php:12
 * @route '/pekurbans-pdf'
 */
        generateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    generate.form = generateForm
const PekurbanPdfController = { generate }

export default PekurbanPdfController