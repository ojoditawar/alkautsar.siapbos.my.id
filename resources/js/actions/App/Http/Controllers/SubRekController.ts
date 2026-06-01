import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SubRekController::index
 * @see app/Http/Controllers/SubRekController.php:15
 * @route '/reks/{rek}/sub-reks'
 */
export const index = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/reks/{rek}/sub-reks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SubRekController::index
 * @see app/Http/Controllers/SubRekController.php:15
 * @route '/reks/{rek}/sub-reks'
 */
index.url = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rek: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'kode' in args) {
            args = { rek: args.kode }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rek: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rek: typeof args.rek === 'object'
                ? args.rek.kode
                : args.rek,
                }

    return index.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubRekController::index
 * @see app/Http/Controllers/SubRekController.php:15
 * @route '/reks/{rek}/sub-reks'
 */
index.get = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SubRekController::index
 * @see app/Http/Controllers/SubRekController.php:15
 * @route '/reks/{rek}/sub-reks'
 */
index.head = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SubRekController::index
 * @see app/Http/Controllers/SubRekController.php:15
 * @route '/reks/{rek}/sub-reks'
 */
    const indexForm = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SubRekController::index
 * @see app/Http/Controllers/SubRekController.php:15
 * @route '/reks/{rek}/sub-reks'
 */
        indexForm.get = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SubRekController::index
 * @see app/Http/Controllers/SubRekController.php:15
 * @route '/reks/{rek}/sub-reks'
 */
        indexForm.head = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\SubRekController::create
 * @see app/Http/Controllers/SubRekController.php:27
 * @route '/reks/{rek}/sub-reks/create'
 */
export const create = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/reks/{rek}/sub-reks/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SubRekController::create
 * @see app/Http/Controllers/SubRekController.php:27
 * @route '/reks/{rek}/sub-reks/create'
 */
create.url = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rek: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'kode' in args) {
            args = { rek: args.kode }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rek: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rek: typeof args.rek === 'object'
                ? args.rek.kode
                : args.rek,
                }

    return create.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubRekController::create
 * @see app/Http/Controllers/SubRekController.php:27
 * @route '/reks/{rek}/sub-reks/create'
 */
create.get = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SubRekController::create
 * @see app/Http/Controllers/SubRekController.php:27
 * @route '/reks/{rek}/sub-reks/create'
 */
create.head = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SubRekController::create
 * @see app/Http/Controllers/SubRekController.php:27
 * @route '/reks/{rek}/sub-reks/create'
 */
    const createForm = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SubRekController::create
 * @see app/Http/Controllers/SubRekController.php:27
 * @route '/reks/{rek}/sub-reks/create'
 */
        createForm.get = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SubRekController::create
 * @see app/Http/Controllers/SubRekController.php:27
 * @route '/reks/{rek}/sub-reks/create'
 */
        createForm.head = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\SubRekController::store
 * @see app/Http/Controllers/SubRekController.php:36
 * @route '/reks/{rek}/sub-reks'
 */
export const store = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/reks/{rek}/sub-reks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SubRekController::store
 * @see app/Http/Controllers/SubRekController.php:36
 * @route '/reks/{rek}/sub-reks'
 */
store.url = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rek: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'kode' in args) {
            args = { rek: args.kode }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rek: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rek: typeof args.rek === 'object'
                ? args.rek.kode
                : args.rek,
                }

    return store.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubRekController::store
 * @see app/Http/Controllers/SubRekController.php:36
 * @route '/reks/{rek}/sub-reks'
 */
store.post = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SubRekController::store
 * @see app/Http/Controllers/SubRekController.php:36
 * @route '/reks/{rek}/sub-reks'
 */
    const storeForm = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SubRekController::store
 * @see app/Http/Controllers/SubRekController.php:36
 * @route '/reks/{rek}/sub-reks'
 */
        storeForm.post = (args: { rek: string | { kode: string } } | [rek: string | { kode: string } ] | string | { kode: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SubRekController::edit
 * @see app/Http/Controllers/SubRekController.php:57
 * @route '/reks/{rek}/sub-reks/{subRek}/edit'
 */
export const edit = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/reks/{rek}/sub-reks/{subRek}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SubRekController::edit
 * @see app/Http/Controllers/SubRekController.php:57
 * @route '/reks/{rek}/sub-reks/{subRek}/edit'
 */
edit.url = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    rek: args[0],
                    subRek: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rek: typeof args.rek === 'object'
                ? args.rek.kode
                : args.rek,
                                subRek: typeof args.subRek === 'object'
                ? args.subRek.id
                : args.subRek,
                }

    return edit.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace('{subRek}', parsedArgs.subRek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubRekController::edit
 * @see app/Http/Controllers/SubRekController.php:57
 * @route '/reks/{rek}/sub-reks/{subRek}/edit'
 */
edit.get = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SubRekController::edit
 * @see app/Http/Controllers/SubRekController.php:57
 * @route '/reks/{rek}/sub-reks/{subRek}/edit'
 */
edit.head = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SubRekController::edit
 * @see app/Http/Controllers/SubRekController.php:57
 * @route '/reks/{rek}/sub-reks/{subRek}/edit'
 */
    const editForm = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SubRekController::edit
 * @see app/Http/Controllers/SubRekController.php:57
 * @route '/reks/{rek}/sub-reks/{subRek}/edit'
 */
        editForm.get = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SubRekController::edit
 * @see app/Http/Controllers/SubRekController.php:57
 * @route '/reks/{rek}/sub-reks/{subRek}/edit'
 */
        editForm.head = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\SubRekController::update
 * @see app/Http/Controllers/SubRekController.php:67
 * @route '/reks/{rek}/sub-reks/{subRek}'
 */
export const update = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/reks/{rek}/sub-reks/{subRek}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\SubRekController::update
 * @see app/Http/Controllers/SubRekController.php:67
 * @route '/reks/{rek}/sub-reks/{subRek}'
 */
update.url = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    rek: args[0],
                    subRek: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rek: typeof args.rek === 'object'
                ? args.rek.kode
                : args.rek,
                                subRek: typeof args.subRek === 'object'
                ? args.subRek.id
                : args.subRek,
                }

    return update.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace('{subRek}', parsedArgs.subRek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubRekController::update
 * @see app/Http/Controllers/SubRekController.php:67
 * @route '/reks/{rek}/sub-reks/{subRek}'
 */
update.put = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\SubRekController::update
 * @see app/Http/Controllers/SubRekController.php:67
 * @route '/reks/{rek}/sub-reks/{subRek}'
 */
update.patch = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\SubRekController::update
 * @see app/Http/Controllers/SubRekController.php:67
 * @route '/reks/{rek}/sub-reks/{subRek}'
 */
    const updateForm = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SubRekController::update
 * @see app/Http/Controllers/SubRekController.php:67
 * @route '/reks/{rek}/sub-reks/{subRek}'
 */
        updateForm.put = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\SubRekController::update
 * @see app/Http/Controllers/SubRekController.php:67
 * @route '/reks/{rek}/sub-reks/{subRek}'
 */
        updateForm.patch = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\SubRekController::destroy
 * @see app/Http/Controllers/SubRekController.php:82
 * @route '/reks/{rek}/sub-reks/{subRek}'
 */
export const destroy = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/reks/{rek}/sub-reks/{subRek}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SubRekController::destroy
 * @see app/Http/Controllers/SubRekController.php:82
 * @route '/reks/{rek}/sub-reks/{subRek}'
 */
destroy.url = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    rek: args[0],
                    subRek: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rek: typeof args.rek === 'object'
                ? args.rek.kode
                : args.rek,
                                subRek: typeof args.subRek === 'object'
                ? args.subRek.id
                : args.subRek,
                }

    return destroy.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace('{subRek}', parsedArgs.subRek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubRekController::destroy
 * @see app/Http/Controllers/SubRekController.php:82
 * @route '/reks/{rek}/sub-reks/{subRek}'
 */
destroy.delete = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SubRekController::destroy
 * @see app/Http/Controllers/SubRekController.php:82
 * @route '/reks/{rek}/sub-reks/{subRek}'
 */
    const destroyForm = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SubRekController::destroy
 * @see app/Http/Controllers/SubRekController.php:82
 * @route '/reks/{rek}/sub-reks/{subRek}'
 */
        destroyForm.delete = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const SubRekController = { index, create, store, edit, update, destroy }

export default SubRekController