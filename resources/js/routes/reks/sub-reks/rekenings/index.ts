import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RekeningController::index
 * @see app/Http/Controllers/RekeningController.php:15
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings'
 */
export const index = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/reks/{rek}/sub-reks/{subRek}/rekenings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RekeningController::index
 * @see app/Http/Controllers/RekeningController.php:15
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings'
 */
index.url = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace('{subRek}', parsedArgs.subRek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RekeningController::index
 * @see app/Http/Controllers/RekeningController.php:15
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings'
 */
index.get = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RekeningController::index
 * @see app/Http/Controllers/RekeningController.php:15
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings'
 */
index.head = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RekeningController::index
 * @see app/Http/Controllers/RekeningController.php:15
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings'
 */
    const indexForm = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RekeningController::index
 * @see app/Http/Controllers/RekeningController.php:15
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings'
 */
        indexForm.get = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RekeningController::index
 * @see app/Http/Controllers/RekeningController.php:15
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings'
 */
        indexForm.head = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\RekeningController::create
 * @see app/Http/Controllers/RekeningController.php:28
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/create'
 */
export const create = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/reks/{rek}/sub-reks/{subRek}/rekenings/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RekeningController::create
 * @see app/Http/Controllers/RekeningController.php:28
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/create'
 */
create.url = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace('{subRek}', parsedArgs.subRek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RekeningController::create
 * @see app/Http/Controllers/RekeningController.php:28
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/create'
 */
create.get = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RekeningController::create
 * @see app/Http/Controllers/RekeningController.php:28
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/create'
 */
create.head = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RekeningController::create
 * @see app/Http/Controllers/RekeningController.php:28
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/create'
 */
    const createForm = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RekeningController::create
 * @see app/Http/Controllers/RekeningController.php:28
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/create'
 */
        createForm.get = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RekeningController::create
 * @see app/Http/Controllers/RekeningController.php:28
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/create'
 */
        createForm.head = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\RekeningController::store
 * @see app/Http/Controllers/RekeningController.php:36
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings'
 */
export const store = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/reks/{rek}/sub-reks/{subRek}/rekenings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RekeningController::store
 * @see app/Http/Controllers/RekeningController.php:36
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings'
 */
store.url = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace('{subRek}', parsedArgs.subRek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RekeningController::store
 * @see app/Http/Controllers/RekeningController.php:36
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings'
 */
store.post = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RekeningController::store
 * @see app/Http/Controllers/RekeningController.php:36
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings'
 */
    const storeForm = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RekeningController::store
 * @see app/Http/Controllers/RekeningController.php:36
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings'
 */
        storeForm.post = (args: { rek: string | { kode: string }, subRek: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RekeningController::edit
 * @see app/Http/Controllers/RekeningController.php:54
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}/edit'
 */
export const edit = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RekeningController::edit
 * @see app/Http/Controllers/RekeningController.php:54
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}/edit'
 */
edit.url = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    rek: args[0],
                    subRek: args[1],
                    rekening: args[2],
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
                                rekening: typeof args.rekening === 'object'
                ? args.rekening.id
                : args.rekening,
                }

    return edit.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace('{subRek}', parsedArgs.subRek.toString())
            .replace('{rekening}', parsedArgs.rekening.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RekeningController::edit
 * @see app/Http/Controllers/RekeningController.php:54
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}/edit'
 */
edit.get = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RekeningController::edit
 * @see app/Http/Controllers/RekeningController.php:54
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}/edit'
 */
edit.head = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RekeningController::edit
 * @see app/Http/Controllers/RekeningController.php:54
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}/edit'
 */
    const editForm = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RekeningController::edit
 * @see app/Http/Controllers/RekeningController.php:54
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}/edit'
 */
        editForm.get = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RekeningController::edit
 * @see app/Http/Controllers/RekeningController.php:54
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}/edit'
 */
        editForm.head = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\RekeningController::update
 * @see app/Http/Controllers/RekeningController.php:63
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}'
 */
export const update = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RekeningController::update
 * @see app/Http/Controllers/RekeningController.php:63
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}'
 */
update.url = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    rek: args[0],
                    subRek: args[1],
                    rekening: args[2],
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
                                rekening: typeof args.rekening === 'object'
                ? args.rekening.id
                : args.rekening,
                }

    return update.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace('{subRek}', parsedArgs.subRek.toString())
            .replace('{rekening}', parsedArgs.rekening.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RekeningController::update
 * @see app/Http/Controllers/RekeningController.php:63
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}'
 */
update.put = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\RekeningController::update
 * @see app/Http/Controllers/RekeningController.php:63
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}'
 */
update.patch = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\RekeningController::update
 * @see app/Http/Controllers/RekeningController.php:63
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}'
 */
    const updateForm = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RekeningController::update
 * @see app/Http/Controllers/RekeningController.php:63
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}'
 */
        updateForm.put = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\RekeningController::update
 * @see app/Http/Controllers/RekeningController.php:63
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}'
 */
        updateForm.patch = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\RekeningController::destroy
 * @see app/Http/Controllers/RekeningController.php:76
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}'
 */
export const destroy = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RekeningController::destroy
 * @see app/Http/Controllers/RekeningController.php:76
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}'
 */
destroy.url = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    rek: args[0],
                    subRek: args[1],
                    rekening: args[2],
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
                                rekening: typeof args.rekening === 'object'
                ? args.rekening.id
                : args.rekening,
                }

    return destroy.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace('{subRek}', parsedArgs.subRek.toString())
            .replace('{rekening}', parsedArgs.rekening.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RekeningController::destroy
 * @see app/Http/Controllers/RekeningController.php:76
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}'
 */
destroy.delete = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RekeningController::destroy
 * @see app/Http/Controllers/RekeningController.php:76
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}'
 */
    const destroyForm = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RekeningController::destroy
 * @see app/Http/Controllers/RekeningController.php:76
 * @route '/reks/{rek}/sub-reks/{subRek}/rekenings/{rekening}'
 */
        destroyForm.delete = (args: { rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } } | [rek: string | { kode: string }, subRek: number | { id: number }, rekening: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const rekenings = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default rekenings