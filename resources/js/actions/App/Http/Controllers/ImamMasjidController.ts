import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ImamMasjidController::index
 * @see app/Http/Controllers/ImamMasjidController.php:14
 * @route '/imam-masjids'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/imam-masjids',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImamMasjidController::index
 * @see app/Http/Controllers/ImamMasjidController.php:14
 * @route '/imam-masjids'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImamMasjidController::index
 * @see app/Http/Controllers/ImamMasjidController.php:14
 * @route '/imam-masjids'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImamMasjidController::index
 * @see app/Http/Controllers/ImamMasjidController.php:14
 * @route '/imam-masjids'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImamMasjidController::index
 * @see app/Http/Controllers/ImamMasjidController.php:14
 * @route '/imam-masjids'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImamMasjidController::index
 * @see app/Http/Controllers/ImamMasjidController.php:14
 * @route '/imam-masjids'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImamMasjidController::index
 * @see app/Http/Controllers/ImamMasjidController.php:14
 * @route '/imam-masjids'
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
* @see \App\Http\Controllers\ImamMasjidController::create
 * @see app/Http/Controllers/ImamMasjidController.php:38
 * @route '/imam-masjids/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/imam-masjids/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImamMasjidController::create
 * @see app/Http/Controllers/ImamMasjidController.php:38
 * @route '/imam-masjids/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImamMasjidController::create
 * @see app/Http/Controllers/ImamMasjidController.php:38
 * @route '/imam-masjids/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImamMasjidController::create
 * @see app/Http/Controllers/ImamMasjidController.php:38
 * @route '/imam-masjids/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImamMasjidController::create
 * @see app/Http/Controllers/ImamMasjidController.php:38
 * @route '/imam-masjids/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImamMasjidController::create
 * @see app/Http/Controllers/ImamMasjidController.php:38
 * @route '/imam-masjids/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImamMasjidController::create
 * @see app/Http/Controllers/ImamMasjidController.php:38
 * @route '/imam-masjids/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\ImamMasjidController::store
 * @see app/Http/Controllers/ImamMasjidController.php:45
 * @route '/imam-masjids'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/imam-masjids',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImamMasjidController::store
 * @see app/Http/Controllers/ImamMasjidController.php:45
 * @route '/imam-masjids'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImamMasjidController::store
 * @see app/Http/Controllers/ImamMasjidController.php:45
 * @route '/imam-masjids'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImamMasjidController::store
 * @see app/Http/Controllers/ImamMasjidController.php:45
 * @route '/imam-masjids'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImamMasjidController::store
 * @see app/Http/Controllers/ImamMasjidController.php:45
 * @route '/imam-masjids'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ImamMasjidController::edit
 * @see app/Http/Controllers/ImamMasjidController.php:76
 * @route '/imam-masjids/{imamMasjid}/edit'
 */
export const edit = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/imam-masjids/{imamMasjid}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImamMasjidController::edit
 * @see app/Http/Controllers/ImamMasjidController.php:76
 * @route '/imam-masjids/{imamMasjid}/edit'
 */
edit.url = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { imamMasjid: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { imamMasjid: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    imamMasjid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        imamMasjid: typeof args.imamMasjid === 'object'
                ? args.imamMasjid.id
                : args.imamMasjid,
                }

    return edit.definition.url
            .replace('{imamMasjid}', parsedArgs.imamMasjid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImamMasjidController::edit
 * @see app/Http/Controllers/ImamMasjidController.php:76
 * @route '/imam-masjids/{imamMasjid}/edit'
 */
edit.get = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImamMasjidController::edit
 * @see app/Http/Controllers/ImamMasjidController.php:76
 * @route '/imam-masjids/{imamMasjid}/edit'
 */
edit.head = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImamMasjidController::edit
 * @see app/Http/Controllers/ImamMasjidController.php:76
 * @route '/imam-masjids/{imamMasjid}/edit'
 */
    const editForm = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImamMasjidController::edit
 * @see app/Http/Controllers/ImamMasjidController.php:76
 * @route '/imam-masjids/{imamMasjid}/edit'
 */
        editForm.get = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImamMasjidController::edit
 * @see app/Http/Controllers/ImamMasjidController.php:76
 * @route '/imam-masjids/{imamMasjid}/edit'
 */
        editForm.head = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ImamMasjidController::update
 * @see app/Http/Controllers/ImamMasjidController.php:99
 * @route '/imam-masjids/{imamMasjid}'
 */
export const update = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/imam-masjids/{imamMasjid}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ImamMasjidController::update
 * @see app/Http/Controllers/ImamMasjidController.php:99
 * @route '/imam-masjids/{imamMasjid}'
 */
update.url = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { imamMasjid: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { imamMasjid: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    imamMasjid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        imamMasjid: typeof args.imamMasjid === 'object'
                ? args.imamMasjid.id
                : args.imamMasjid,
                }

    return update.definition.url
            .replace('{imamMasjid}', parsedArgs.imamMasjid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImamMasjidController::update
 * @see app/Http/Controllers/ImamMasjidController.php:99
 * @route '/imam-masjids/{imamMasjid}'
 */
update.put = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\ImamMasjidController::update
 * @see app/Http/Controllers/ImamMasjidController.php:99
 * @route '/imam-masjids/{imamMasjid}'
 */
update.patch = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ImamMasjidController::update
 * @see app/Http/Controllers/ImamMasjidController.php:99
 * @route '/imam-masjids/{imamMasjid}'
 */
    const updateForm = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImamMasjidController::update
 * @see app/Http/Controllers/ImamMasjidController.php:99
 * @route '/imam-masjids/{imamMasjid}'
 */
        updateForm.put = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\ImamMasjidController::update
 * @see app/Http/Controllers/ImamMasjidController.php:99
 * @route '/imam-masjids/{imamMasjid}'
 */
        updateForm.patch = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\ImamMasjidController::destroy
 * @see app/Http/Controllers/ImamMasjidController.php:140
 * @route '/imam-masjids/{imamMasjid}'
 */
export const destroy = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/imam-masjids/{imamMasjid}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ImamMasjidController::destroy
 * @see app/Http/Controllers/ImamMasjidController.php:140
 * @route '/imam-masjids/{imamMasjid}'
 */
destroy.url = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { imamMasjid: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { imamMasjid: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    imamMasjid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        imamMasjid: typeof args.imamMasjid === 'object'
                ? args.imamMasjid.id
                : args.imamMasjid,
                }

    return destroy.definition.url
            .replace('{imamMasjid}', parsedArgs.imamMasjid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImamMasjidController::destroy
 * @see app/Http/Controllers/ImamMasjidController.php:140
 * @route '/imam-masjids/{imamMasjid}'
 */
destroy.delete = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ImamMasjidController::destroy
 * @see app/Http/Controllers/ImamMasjidController.php:140
 * @route '/imam-masjids/{imamMasjid}'
 */
    const destroyForm = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImamMasjidController::destroy
 * @see app/Http/Controllers/ImamMasjidController.php:140
 * @route '/imam-masjids/{imamMasjid}'
 */
        destroyForm.delete = (args: { imamMasjid: number | { id: number } } | [imamMasjid: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ImamMasjidController = { index, create, store, edit, update, destroy }

export default ImamMasjidController