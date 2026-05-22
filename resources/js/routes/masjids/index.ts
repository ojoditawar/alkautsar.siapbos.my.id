import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MasjidController::index
 * @see app/Http/Controllers/MasjidController.php:13
 * @route '/masjids'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/masjids',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasjidController::index
 * @see app/Http/Controllers/MasjidController.php:13
 * @route '/masjids'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasjidController::index
 * @see app/Http/Controllers/MasjidController.php:13
 * @route '/masjids'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasjidController::index
 * @see app/Http/Controllers/MasjidController.php:13
 * @route '/masjids'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasjidController::index
 * @see app/Http/Controllers/MasjidController.php:13
 * @route '/masjids'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasjidController::index
 * @see app/Http/Controllers/MasjidController.php:13
 * @route '/masjids'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasjidController::index
 * @see app/Http/Controllers/MasjidController.php:13
 * @route '/masjids'
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
* @see \App\Http\Controllers\MasjidController::create
 * @see app/Http/Controllers/MasjidController.php:22
 * @route '/masjids/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/masjids/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasjidController::create
 * @see app/Http/Controllers/MasjidController.php:22
 * @route '/masjids/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasjidController::create
 * @see app/Http/Controllers/MasjidController.php:22
 * @route '/masjids/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasjidController::create
 * @see app/Http/Controllers/MasjidController.php:22
 * @route '/masjids/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasjidController::create
 * @see app/Http/Controllers/MasjidController.php:22
 * @route '/masjids/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasjidController::create
 * @see app/Http/Controllers/MasjidController.php:22
 * @route '/masjids/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasjidController::create
 * @see app/Http/Controllers/MasjidController.php:22
 * @route '/masjids/create'
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
* @see \App\Http\Controllers\MasjidController::store
 * @see app/Http/Controllers/MasjidController.php:27
 * @route '/masjids'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/masjids',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasjidController::store
 * @see app/Http/Controllers/MasjidController.php:27
 * @route '/masjids'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasjidController::store
 * @see app/Http/Controllers/MasjidController.php:27
 * @route '/masjids'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasjidController::store
 * @see app/Http/Controllers/MasjidController.php:27
 * @route '/masjids'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasjidController::store
 * @see app/Http/Controllers/MasjidController.php:27
 * @route '/masjids'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\MasjidController::edit
 * @see app/Http/Controllers/MasjidController.php:49
 * @route '/masjids/{masjid}/edit'
 */
export const edit = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/masjids/{masjid}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasjidController::edit
 * @see app/Http/Controllers/MasjidController.php:49
 * @route '/masjids/{masjid}/edit'
 */
edit.url = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { masjid: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { masjid: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    masjid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        masjid: typeof args.masjid === 'object'
                ? args.masjid.id
                : args.masjid,
                }

    return edit.definition.url
            .replace('{masjid}', parsedArgs.masjid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasjidController::edit
 * @see app/Http/Controllers/MasjidController.php:49
 * @route '/masjids/{masjid}/edit'
 */
edit.get = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasjidController::edit
 * @see app/Http/Controllers/MasjidController.php:49
 * @route '/masjids/{masjid}/edit'
 */
edit.head = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasjidController::edit
 * @see app/Http/Controllers/MasjidController.php:49
 * @route '/masjids/{masjid}/edit'
 */
    const editForm = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasjidController::edit
 * @see app/Http/Controllers/MasjidController.php:49
 * @route '/masjids/{masjid}/edit'
 */
        editForm.get = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasjidController::edit
 * @see app/Http/Controllers/MasjidController.php:49
 * @route '/masjids/{masjid}/edit'
 */
        editForm.head = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\MasjidController::update
 * @see app/Http/Controllers/MasjidController.php:56
 * @route '/masjids/{masjid}'
 */
export const update = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/masjids/{masjid}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\MasjidController::update
 * @see app/Http/Controllers/MasjidController.php:56
 * @route '/masjids/{masjid}'
 */
update.url = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { masjid: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { masjid: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    masjid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        masjid: typeof args.masjid === 'object'
                ? args.masjid.id
                : args.masjid,
                }

    return update.definition.url
            .replace('{masjid}', parsedArgs.masjid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasjidController::update
 * @see app/Http/Controllers/MasjidController.php:56
 * @route '/masjids/{masjid}'
 */
update.put = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\MasjidController::update
 * @see app/Http/Controllers/MasjidController.php:56
 * @route '/masjids/{masjid}'
 */
update.patch = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\MasjidController::update
 * @see app/Http/Controllers/MasjidController.php:56
 * @route '/masjids/{masjid}'
 */
    const updateForm = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasjidController::update
 * @see app/Http/Controllers/MasjidController.php:56
 * @route '/masjids/{masjid}'
 */
        updateForm.put = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\MasjidController::update
 * @see app/Http/Controllers/MasjidController.php:56
 * @route '/masjids/{masjid}'
 */
        updateForm.patch = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\MasjidController::destroy
 * @see app/Http/Controllers/MasjidController.php:85
 * @route '/masjids/{masjid}'
 */
export const destroy = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/masjids/{masjid}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MasjidController::destroy
 * @see app/Http/Controllers/MasjidController.php:85
 * @route '/masjids/{masjid}'
 */
destroy.url = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { masjid: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { masjid: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    masjid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        masjid: typeof args.masjid === 'object'
                ? args.masjid.id
                : args.masjid,
                }

    return destroy.definition.url
            .replace('{masjid}', parsedArgs.masjid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasjidController::destroy
 * @see app/Http/Controllers/MasjidController.php:85
 * @route '/masjids/{masjid}'
 */
destroy.delete = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MasjidController::destroy
 * @see app/Http/Controllers/MasjidController.php:85
 * @route '/masjids/{masjid}'
 */
    const destroyForm = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasjidController::destroy
 * @see app/Http/Controllers/MasjidController.php:85
 * @route '/masjids/{masjid}'
 */
        destroyForm.delete = (args: { masjid: string | { id: string } } | [masjid: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const masjids = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default masjids