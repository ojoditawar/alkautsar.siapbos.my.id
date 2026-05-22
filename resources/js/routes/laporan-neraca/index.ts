import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
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
/**
* @see \App\Http\Controllers\LaporanNeracaPdfController::pdf
 * @see app/Http/Controllers/LaporanNeracaPdfController.php:10
 * @route '/laporan-neraca-pdf'
 */
export const pdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/laporan-neraca-pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LaporanNeracaPdfController::pdf
 * @see app/Http/Controllers/LaporanNeracaPdfController.php:10
 * @route '/laporan-neraca-pdf'
 */
pdf.url = (options?: RouteQueryOptions) => {
    return pdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LaporanNeracaPdfController::pdf
 * @see app/Http/Controllers/LaporanNeracaPdfController.php:10
 * @route '/laporan-neraca-pdf'
 */
pdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LaporanNeracaPdfController::pdf
 * @see app/Http/Controllers/LaporanNeracaPdfController.php:10
 * @route '/laporan-neraca-pdf'
 */
pdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LaporanNeracaPdfController::pdf
 * @see app/Http/Controllers/LaporanNeracaPdfController.php:10
 * @route '/laporan-neraca-pdf'
 */
    const pdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pdf.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LaporanNeracaPdfController::pdf
 * @see app/Http/Controllers/LaporanNeracaPdfController.php:10
 * @route '/laporan-neraca-pdf'
 */
        pdfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LaporanNeracaPdfController::pdf
 * @see app/Http/Controllers/LaporanNeracaPdfController.php:10
 * @route '/laporan-neraca-pdf'
 */
        pdfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pdf.form = pdfForm
const laporanNeraca = {
    index: Object.assign(index, index),
pdf: Object.assign(pdf, pdf),
}

export default laporanNeraca