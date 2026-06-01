import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\KajianController::index
 * @see app/Http/Controllers/KajianController.php:13
 * @route '/kajians'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/kajians',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KajianController::index
 * @see app/Http/Controllers/KajianController.php:13
 * @route '/kajians'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KajianController::index
 * @see app/Http/Controllers/KajianController.php:13
 * @route '/kajians'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KajianController::index
 * @see app/Http/Controllers/KajianController.php:13
 * @route '/kajians'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KajianController::index
 * @see app/Http/Controllers/KajianController.php:13
 * @route '/kajians'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KajianController::index
 * @see app/Http/Controllers/KajianController.php:13
 * @route '/kajians'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KajianController::index
 * @see app/Http/Controllers/KajianController.php:13
 * @route '/kajians'
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
* @see \App\Http\Controllers\KajianController::create
 * @see app/Http/Controllers/KajianController.php:25
 * @route '/kajians/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/kajians/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KajianController::create
 * @see app/Http/Controllers/KajianController.php:25
 * @route '/kajians/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KajianController::create
 * @see app/Http/Controllers/KajianController.php:25
 * @route '/kajians/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KajianController::create
 * @see app/Http/Controllers/KajianController.php:25
 * @route '/kajians/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KajianController::create
 * @see app/Http/Controllers/KajianController.php:25
 * @route '/kajians/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KajianController::create
 * @see app/Http/Controllers/KajianController.php:25
 * @route '/kajians/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KajianController::create
 * @see app/Http/Controllers/KajianController.php:25
 * @route '/kajians/create'
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
* @see \App\Http\Controllers\KajianController::store
 * @see app/Http/Controllers/KajianController.php:32
 * @route '/kajians'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/kajians',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KajianController::store
 * @see app/Http/Controllers/KajianController.php:32
 * @route '/kajians'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KajianController::store
 * @see app/Http/Controllers/KajianController.php:32
 * @route '/kajians'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\KajianController::store
 * @see app/Http/Controllers/KajianController.php:32
 * @route '/kajians'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KajianController::store
 * @see app/Http/Controllers/KajianController.php:32
 * @route '/kajians'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\KajianController::edit
 * @see app/Http/Controllers/KajianController.php:45
 * @route '/kajians/{kajian}/edit'
 */
export const edit = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/kajians/{kajian}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KajianController::edit
 * @see app/Http/Controllers/KajianController.php:45
 * @route '/kajians/{kajian}/edit'
 */
edit.url = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kajian: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { kajian: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    kajian: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kajian: typeof args.kajian === 'object'
                ? args.kajian.id
                : args.kajian,
                }

    return edit.definition.url
            .replace('{kajian}', parsedArgs.kajian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KajianController::edit
 * @see app/Http/Controllers/KajianController.php:45
 * @route '/kajians/{kajian}/edit'
 */
edit.get = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KajianController::edit
 * @see app/Http/Controllers/KajianController.php:45
 * @route '/kajians/{kajian}/edit'
 */
edit.head = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KajianController::edit
 * @see app/Http/Controllers/KajianController.php:45
 * @route '/kajians/{kajian}/edit'
 */
    const editForm = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KajianController::edit
 * @see app/Http/Controllers/KajianController.php:45
 * @route '/kajians/{kajian}/edit'
 */
        editForm.get = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KajianController::edit
 * @see app/Http/Controllers/KajianController.php:45
 * @route '/kajians/{kajian}/edit'
 */
        editForm.head = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\KajianController::update
 * @see app/Http/Controllers/KajianController.php:63
 * @route '/kajians/{kajian}'
 */
export const update = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/kajians/{kajian}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\KajianController::update
 * @see app/Http/Controllers/KajianController.php:63
 * @route '/kajians/{kajian}'
 */
update.url = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kajian: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { kajian: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    kajian: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kajian: typeof args.kajian === 'object'
                ? args.kajian.id
                : args.kajian,
                }

    return update.definition.url
            .replace('{kajian}', parsedArgs.kajian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KajianController::update
 * @see app/Http/Controllers/KajianController.php:63
 * @route '/kajians/{kajian}'
 */
update.put = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\KajianController::update
 * @see app/Http/Controllers/KajianController.php:63
 * @route '/kajians/{kajian}'
 */
update.patch = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\KajianController::update
 * @see app/Http/Controllers/KajianController.php:63
 * @route '/kajians/{kajian}'
 */
    const updateForm = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KajianController::update
 * @see app/Http/Controllers/KajianController.php:63
 * @route '/kajians/{kajian}'
 */
        updateForm.put = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\KajianController::update
 * @see app/Http/Controllers/KajianController.php:63
 * @route '/kajians/{kajian}'
 */
        updateForm.patch = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\KajianController::destroy
 * @see app/Http/Controllers/KajianController.php:76
 * @route '/kajians/{kajian}'
 */
export const destroy = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/kajians/{kajian}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KajianController::destroy
 * @see app/Http/Controllers/KajianController.php:76
 * @route '/kajians/{kajian}'
 */
destroy.url = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kajian: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { kajian: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    kajian: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kajian: typeof args.kajian === 'object'
                ? args.kajian.id
                : args.kajian,
                }

    return destroy.definition.url
            .replace('{kajian}', parsedArgs.kajian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KajianController::destroy
 * @see app/Http/Controllers/KajianController.php:76
 * @route '/kajians/{kajian}'
 */
destroy.delete = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\KajianController::destroy
 * @see app/Http/Controllers/KajianController.php:76
 * @route '/kajians/{kajian}'
 */
    const destroyForm = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KajianController::destroy
 * @see app/Http/Controllers/KajianController.php:76
 * @route '/kajians/{kajian}'
 */
        destroyForm.delete = (args: { kajian: number | { id: number } } | [kajian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const KajianController = { index, create, store, edit, update, destroy }

export default KajianController