import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\JamaahController::index
 * @see app/Http/Controllers/JamaahController.php:14
 * @route '/jamaahs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jamaahs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JamaahController::index
 * @see app/Http/Controllers/JamaahController.php:14
 * @route '/jamaahs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamaahController::index
 * @see app/Http/Controllers/JamaahController.php:14
 * @route '/jamaahs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JamaahController::index
 * @see app/Http/Controllers/JamaahController.php:14
 * @route '/jamaahs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JamaahController::index
 * @see app/Http/Controllers/JamaahController.php:14
 * @route '/jamaahs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JamaahController::index
 * @see app/Http/Controllers/JamaahController.php:14
 * @route '/jamaahs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JamaahController::index
 * @see app/Http/Controllers/JamaahController.php:14
 * @route '/jamaahs'
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
* @see \App\Http\Controllers\JamaahController::create
 * @see app/Http/Controllers/JamaahController.php:99
 * @route '/jamaahs/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/jamaahs/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JamaahController::create
 * @see app/Http/Controllers/JamaahController.php:99
 * @route '/jamaahs/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamaahController::create
 * @see app/Http/Controllers/JamaahController.php:99
 * @route '/jamaahs/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JamaahController::create
 * @see app/Http/Controllers/JamaahController.php:99
 * @route '/jamaahs/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JamaahController::create
 * @see app/Http/Controllers/JamaahController.php:99
 * @route '/jamaahs/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JamaahController::create
 * @see app/Http/Controllers/JamaahController.php:99
 * @route '/jamaahs/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JamaahController::create
 * @see app/Http/Controllers/JamaahController.php:99
 * @route '/jamaahs/create'
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
* @see \App\Http\Controllers\JamaahController::store
 * @see app/Http/Controllers/JamaahController.php:104
 * @route '/jamaahs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/jamaahs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JamaahController::store
 * @see app/Http/Controllers/JamaahController.php:104
 * @route '/jamaahs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamaahController::store
 * @see app/Http/Controllers/JamaahController.php:104
 * @route '/jamaahs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\JamaahController::store
 * @see app/Http/Controllers/JamaahController.php:104
 * @route '/jamaahs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JamaahController::store
 * @see app/Http/Controllers/JamaahController.php:104
 * @route '/jamaahs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\JamaahController::edit
 * @see app/Http/Controllers/JamaahController.php:143
 * @route '/jamaahs/{jamaah}/edit'
 */
export const edit = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/jamaahs/{jamaah}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JamaahController::edit
 * @see app/Http/Controllers/JamaahController.php:143
 * @route '/jamaahs/{jamaah}/edit'
 */
edit.url = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jamaah: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { jamaah: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    jamaah: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        jamaah: typeof args.jamaah === 'object'
                ? args.jamaah.id
                : args.jamaah,
                }

    return edit.definition.url
            .replace('{jamaah}', parsedArgs.jamaah.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamaahController::edit
 * @see app/Http/Controllers/JamaahController.php:143
 * @route '/jamaahs/{jamaah}/edit'
 */
edit.get = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JamaahController::edit
 * @see app/Http/Controllers/JamaahController.php:143
 * @route '/jamaahs/{jamaah}/edit'
 */
edit.head = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JamaahController::edit
 * @see app/Http/Controllers/JamaahController.php:143
 * @route '/jamaahs/{jamaah}/edit'
 */
    const editForm = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JamaahController::edit
 * @see app/Http/Controllers/JamaahController.php:143
 * @route '/jamaahs/{jamaah}/edit'
 */
        editForm.get = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JamaahController::edit
 * @see app/Http/Controllers/JamaahController.php:143
 * @route '/jamaahs/{jamaah}/edit'
 */
        editForm.head = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\JamaahController::update
 * @see app/Http/Controllers/JamaahController.php:169
 * @route '/jamaahs/{jamaah}'
 */
export const update = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/jamaahs/{jamaah}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\JamaahController::update
 * @see app/Http/Controllers/JamaahController.php:169
 * @route '/jamaahs/{jamaah}'
 */
update.url = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jamaah: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { jamaah: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    jamaah: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        jamaah: typeof args.jamaah === 'object'
                ? args.jamaah.id
                : args.jamaah,
                }

    return update.definition.url
            .replace('{jamaah}', parsedArgs.jamaah.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamaahController::update
 * @see app/Http/Controllers/JamaahController.php:169
 * @route '/jamaahs/{jamaah}'
 */
update.put = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\JamaahController::update
 * @see app/Http/Controllers/JamaahController.php:169
 * @route '/jamaahs/{jamaah}'
 */
update.patch = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\JamaahController::update
 * @see app/Http/Controllers/JamaahController.php:169
 * @route '/jamaahs/{jamaah}'
 */
    const updateForm = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JamaahController::update
 * @see app/Http/Controllers/JamaahController.php:169
 * @route '/jamaahs/{jamaah}'
 */
        updateForm.put = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\JamaahController::update
 * @see app/Http/Controllers/JamaahController.php:169
 * @route '/jamaahs/{jamaah}'
 */
        updateForm.patch = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\JamaahController::destroy
 * @see app/Http/Controllers/JamaahController.php:218
 * @route '/jamaahs/{jamaah}'
 */
export const destroy = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/jamaahs/{jamaah}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\JamaahController::destroy
 * @see app/Http/Controllers/JamaahController.php:218
 * @route '/jamaahs/{jamaah}'
 */
destroy.url = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jamaah: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { jamaah: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    jamaah: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        jamaah: typeof args.jamaah === 'object'
                ? args.jamaah.id
                : args.jamaah,
                }

    return destroy.definition.url
            .replace('{jamaah}', parsedArgs.jamaah.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamaahController::destroy
 * @see app/Http/Controllers/JamaahController.php:218
 * @route '/jamaahs/{jamaah}'
 */
destroy.delete = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\JamaahController::destroy
 * @see app/Http/Controllers/JamaahController.php:218
 * @route '/jamaahs/{jamaah}'
 */
    const destroyForm = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JamaahController::destroy
 * @see app/Http/Controllers/JamaahController.php:218
 * @route '/jamaahs/{jamaah}'
 */
        destroyForm.delete = (args: { jamaah: number | { id: number } } | [jamaah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const jamaahs = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default jamaahs