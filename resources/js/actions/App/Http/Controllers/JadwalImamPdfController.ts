import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\JadwalImamPdfController::generate
 * @see app/Http/Controllers/JadwalImamPdfController.php:13
 * @route '/jadwal-imams-pdf'
 */
export const generate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generate.url(options),
    method: 'get',
})

generate.definition = {
    methods: ["get","head"],
    url: '/jadwal-imams-pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalImamPdfController::generate
 * @see app/Http/Controllers/JadwalImamPdfController.php:13
 * @route '/jadwal-imams-pdf'
 */
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalImamPdfController::generate
 * @see app/Http/Controllers/JadwalImamPdfController.php:13
 * @route '/jadwal-imams-pdf'
 */
generate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JadwalImamPdfController::generate
 * @see app/Http/Controllers/JadwalImamPdfController.php:13
 * @route '/jadwal-imams-pdf'
 */
generate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JadwalImamPdfController::generate
 * @see app/Http/Controllers/JadwalImamPdfController.php:13
 * @route '/jadwal-imams-pdf'
 */
    const generateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JadwalImamPdfController::generate
 * @see app/Http/Controllers/JadwalImamPdfController.php:13
 * @route '/jadwal-imams-pdf'
 */
        generateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JadwalImamPdfController::generate
 * @see app/Http/Controllers/JadwalImamPdfController.php:13
 * @route '/jadwal-imams-pdf'
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
/**
* @see \App\Http\Controllers\JadwalImamPdfController::rekap
 * @see app/Http/Controllers/JadwalImamPdfController.php:65
 * @route '/jadwal-imams-rekap-pdf'
 */
export const rekap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rekap.url(options),
    method: 'get',
})

rekap.definition = {
    methods: ["get","head"],
    url: '/jadwal-imams-rekap-pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalImamPdfController::rekap
 * @see app/Http/Controllers/JadwalImamPdfController.php:65
 * @route '/jadwal-imams-rekap-pdf'
 */
rekap.url = (options?: RouteQueryOptions) => {
    return rekap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalImamPdfController::rekap
 * @see app/Http/Controllers/JadwalImamPdfController.php:65
 * @route '/jadwal-imams-rekap-pdf'
 */
rekap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rekap.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JadwalImamPdfController::rekap
 * @see app/Http/Controllers/JadwalImamPdfController.php:65
 * @route '/jadwal-imams-rekap-pdf'
 */
rekap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rekap.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JadwalImamPdfController::rekap
 * @see app/Http/Controllers/JadwalImamPdfController.php:65
 * @route '/jadwal-imams-rekap-pdf'
 */
    const rekapForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: rekap.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JadwalImamPdfController::rekap
 * @see app/Http/Controllers/JadwalImamPdfController.php:65
 * @route '/jadwal-imams-rekap-pdf'
 */
        rekapForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rekap.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JadwalImamPdfController::rekap
 * @see app/Http/Controllers/JadwalImamPdfController.php:65
 * @route '/jadwal-imams-rekap-pdf'
 */
        rekapForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rekap.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    rekap.form = rekapForm
const JadwalImamPdfController = { generate, rekap }

export default JadwalImamPdfController