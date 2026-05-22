import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\HijriHolidayController::index
 * @see app/Http/Controllers/Api/HijriHolidayController.php:15
 * @route '/hijri-holidays'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hijri-holidays',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\HijriHolidayController::index
 * @see app/Http/Controllers/Api/HijriHolidayController.php:15
 * @route '/hijri-holidays'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HijriHolidayController::index
 * @see app/Http/Controllers/Api/HijriHolidayController.php:15
 * @route '/hijri-holidays'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\HijriHolidayController::index
 * @see app/Http/Controllers/Api/HijriHolidayController.php:15
 * @route '/hijri-holidays'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\HijriHolidayController::index
 * @see app/Http/Controllers/Api/HijriHolidayController.php:15
 * @route '/hijri-holidays'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\HijriHolidayController::index
 * @see app/Http/Controllers/Api/HijriHolidayController.php:15
 * @route '/hijri-holidays'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\HijriHolidayController::index
 * @see app/Http/Controllers/Api/HijriHolidayController.php:15
 * @route '/hijri-holidays'
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
* @see \App\Http\Controllers\Api\HijriHolidayController::store
 * @see app/Http/Controllers/Api/HijriHolidayController.php:32
 * @route '/hijri-holidays'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/hijri-holidays',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\HijriHolidayController::store
 * @see app/Http/Controllers/Api/HijriHolidayController.php:32
 * @route '/hijri-holidays'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HijriHolidayController::store
 * @see app/Http/Controllers/Api/HijriHolidayController.php:32
 * @route '/hijri-holidays'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\HijriHolidayController::store
 * @see app/Http/Controllers/Api/HijriHolidayController.php:32
 * @route '/hijri-holidays'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\HijriHolidayController::store
 * @see app/Http/Controllers/Api/HijriHolidayController.php:32
 * @route '/hijri-holidays'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\HijriHolidayController::sync
 * @see app/Http/Controllers/Api/HijriHolidayController.php:44
 * @route '/hijri-holidays/sync'
 */
export const sync = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

sync.definition = {
    methods: ["post"],
    url: '/hijri-holidays/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\HijriHolidayController::sync
 * @see app/Http/Controllers/Api/HijriHolidayController.php:44
 * @route '/hijri-holidays/sync'
 */
sync.url = (options?: RouteQueryOptions) => {
    return sync.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HijriHolidayController::sync
 * @see app/Http/Controllers/Api/HijriHolidayController.php:44
 * @route '/hijri-holidays/sync'
 */
sync.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\HijriHolidayController::sync
 * @see app/Http/Controllers/Api/HijriHolidayController.php:44
 * @route '/hijri-holidays/sync'
 */
    const syncForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sync.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\HijriHolidayController::sync
 * @see app/Http/Controllers/Api/HijriHolidayController.php:44
 * @route '/hijri-holidays/sync'
 */
        syncForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sync.url(options),
            method: 'post',
        })
    
    sync.form = syncForm
/**
* @see \App\Http\Controllers\Api\HijriHolidayController::destroy
 * @see app/Http/Controllers/Api/HijriHolidayController.php:111
 * @route '/hijri-holidays/{holiday}'
 */
export const destroy = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/hijri-holidays/{holiday}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\HijriHolidayController::destroy
 * @see app/Http/Controllers/Api/HijriHolidayController.php:111
 * @route '/hijri-holidays/{holiday}'
 */
destroy.url = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { holiday: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    holiday: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        holiday: args.holiday,
                }

    return destroy.definition.url
            .replace('{holiday}', parsedArgs.holiday.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HijriHolidayController::destroy
 * @see app/Http/Controllers/Api/HijriHolidayController.php:111
 * @route '/hijri-holidays/{holiday}'
 */
destroy.delete = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\HijriHolidayController::destroy
 * @see app/Http/Controllers/Api/HijriHolidayController.php:111
 * @route '/hijri-holidays/{holiday}'
 */
    const destroyForm = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\HijriHolidayController::destroy
 * @see app/Http/Controllers/Api/HijriHolidayController.php:111
 * @route '/hijri-holidays/{holiday}'
 */
        destroyForm.delete = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Api\HijriHolidayController::update
 * @see app/Http/Controllers/Api/HijriHolidayController.php:78
 * @route '/hijri-holidays/{holiday}'
 */
export const update = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/hijri-holidays/{holiday}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\HijriHolidayController::update
 * @see app/Http/Controllers/Api/HijriHolidayController.php:78
 * @route '/hijri-holidays/{holiday}'
 */
update.url = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { holiday: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    holiday: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        holiday: args.holiday,
                }

    return update.definition.url
            .replace('{holiday}', parsedArgs.holiday.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HijriHolidayController::update
 * @see app/Http/Controllers/Api/HijriHolidayController.php:78
 * @route '/hijri-holidays/{holiday}'
 */
update.put = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Api\HijriHolidayController::update
 * @see app/Http/Controllers/Api/HijriHolidayController.php:78
 * @route '/hijri-holidays/{holiday}'
 */
    const updateForm = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\HijriHolidayController::update
 * @see app/Http/Controllers/Api/HijriHolidayController.php:78
 * @route '/hijri-holidays/{holiday}'
 */
        updateForm.put = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Api\HijriHolidayController::duplicate
 * @see app/Http/Controllers/Api/HijriHolidayController.php:92
 * @route '/hijri-holidays/{holiday}/duplicate'
 */
export const duplicate = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

duplicate.definition = {
    methods: ["post"],
    url: '/hijri-holidays/{holiday}/duplicate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\HijriHolidayController::duplicate
 * @see app/Http/Controllers/Api/HijriHolidayController.php:92
 * @route '/hijri-holidays/{holiday}/duplicate'
 */
duplicate.url = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { holiday: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    holiday: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        holiday: args.holiday,
                }

    return duplicate.definition.url
            .replace('{holiday}', parsedArgs.holiday.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HijriHolidayController::duplicate
 * @see app/Http/Controllers/Api/HijriHolidayController.php:92
 * @route '/hijri-holidays/{holiday}/duplicate'
 */
duplicate.post = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\HijriHolidayController::duplicate
 * @see app/Http/Controllers/Api/HijriHolidayController.php:92
 * @route '/hijri-holidays/{holiday}/duplicate'
 */
    const duplicateForm = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: duplicate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\HijriHolidayController::duplicate
 * @see app/Http/Controllers/Api/HijriHolidayController.php:92
 * @route '/hijri-holidays/{holiday}/duplicate'
 */
        duplicateForm.post = (args: { holiday: string | number } | [holiday: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: duplicate.url(args, options),
            method: 'post',
        })
    
    duplicate.form = duplicateForm
const HijriHolidayController = { index, store, sync, destroy, update, duplicate }

export default HijriHolidayController