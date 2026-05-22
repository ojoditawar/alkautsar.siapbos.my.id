import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MappingRekeningController::edit
 * @see app/Http/Controllers/MappingRekeningController.php:14
 * @route '/mapping-rekenings/{rekening}/edit'
 */
export const edit = (args: { rekening: number | { id: number } } | [rekening: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/mapping-rekenings/{rekening}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MappingRekeningController::edit
 * @see app/Http/Controllers/MappingRekeningController.php:14
 * @route '/mapping-rekenings/{rekening}/edit'
 */
edit.url = (args: { rekening: number | { id: number } } | [rekening: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rekening: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { rekening: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rekening: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rekening: typeof args.rekening === 'object'
                ? args.rekening.id
                : args.rekening,
                }

    return edit.definition.url
            .replace('{rekening}', parsedArgs.rekening.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MappingRekeningController::edit
 * @see app/Http/Controllers/MappingRekeningController.php:14
 * @route '/mapping-rekenings/{rekening}/edit'
 */
edit.get = (args: { rekening: number | { id: number } } | [rekening: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MappingRekeningController::edit
 * @see app/Http/Controllers/MappingRekeningController.php:14
 * @route '/mapping-rekenings/{rekening}/edit'
 */
edit.head = (args: { rekening: number | { id: number } } | [rekening: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MappingRekeningController::edit
 * @see app/Http/Controllers/MappingRekeningController.php:14
 * @route '/mapping-rekenings/{rekening}/edit'
 */
    const editForm = (args: { rekening: number | { id: number } } | [rekening: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MappingRekeningController::edit
 * @see app/Http/Controllers/MappingRekeningController.php:14
 * @route '/mapping-rekenings/{rekening}/edit'
 */
        editForm.get = (args: { rekening: number | { id: number } } | [rekening: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MappingRekeningController::edit
 * @see app/Http/Controllers/MappingRekeningController.php:14
 * @route '/mapping-rekenings/{rekening}/edit'
 */
        editForm.head = (args: { rekening: number | { id: number } } | [rekening: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\MappingRekeningController::update
 * @see app/Http/Controllers/MappingRekeningController.php:36
 * @route '/mapping-rekenings/{rekening}'
 */
export const update = (args: { rekening: number | { id: number } } | [rekening: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/mapping-rekenings/{rekening}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MappingRekeningController::update
 * @see app/Http/Controllers/MappingRekeningController.php:36
 * @route '/mapping-rekenings/{rekening}'
 */
update.url = (args: { rekening: number | { id: number } } | [rekening: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rekening: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { rekening: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rekening: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rekening: typeof args.rekening === 'object'
                ? args.rekening.id
                : args.rekening,
                }

    return update.definition.url
            .replace('{rekening}', parsedArgs.rekening.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MappingRekeningController::update
 * @see app/Http/Controllers/MappingRekeningController.php:36
 * @route '/mapping-rekenings/{rekening}'
 */
update.put = (args: { rekening: number | { id: number } } | [rekening: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MappingRekeningController::update
 * @see app/Http/Controllers/MappingRekeningController.php:36
 * @route '/mapping-rekenings/{rekening}'
 */
    const updateForm = (args: { rekening: number | { id: number } } | [rekening: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MappingRekeningController::update
 * @see app/Http/Controllers/MappingRekeningController.php:36
 * @route '/mapping-rekenings/{rekening}'
 */
        updateForm.put = (args: { rekening: number | { id: number } } | [rekening: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const MappingRekeningController = { edit, update }

export default MappingRekeningController