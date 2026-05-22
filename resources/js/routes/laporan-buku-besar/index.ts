import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
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
/**
* @see \App\Http\Controllers\LaporanBukuBesarPdfController::pdf
 * @see app/Http/Controllers/LaporanBukuBesarPdfController.php:11
 * @route '/laporan-buku-besar-pdf'
 */
export const pdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/laporan-buku-besar-pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LaporanBukuBesarPdfController::pdf
 * @see app/Http/Controllers/LaporanBukuBesarPdfController.php:11
 * @route '/laporan-buku-besar-pdf'
 */
pdf.url = (options?: RouteQueryOptions) => {
    return pdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LaporanBukuBesarPdfController::pdf
 * @see app/Http/Controllers/LaporanBukuBesarPdfController.php:11
 * @route '/laporan-buku-besar-pdf'
 */
pdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LaporanBukuBesarPdfController::pdf
 * @see app/Http/Controllers/LaporanBukuBesarPdfController.php:11
 * @route '/laporan-buku-besar-pdf'
 */
pdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LaporanBukuBesarPdfController::pdf
 * @see app/Http/Controllers/LaporanBukuBesarPdfController.php:11
 * @route '/laporan-buku-besar-pdf'
 */
    const pdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pdf.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LaporanBukuBesarPdfController::pdf
 * @see app/Http/Controllers/LaporanBukuBesarPdfController.php:11
 * @route '/laporan-buku-besar-pdf'
 */
        pdfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LaporanBukuBesarPdfController::pdf
 * @see app/Http/Controllers/LaporanBukuBesarPdfController.php:11
 * @route '/laporan-buku-besar-pdf'
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
const laporanBukuBesar = {
    index: Object.assign(index, index),
pdf: Object.assign(pdf, pdf),
}

export default laporanBukuBesar