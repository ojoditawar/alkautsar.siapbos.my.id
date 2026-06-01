import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\KhotbahController::index
 * @see app/Http/Controllers/KhotbahController.php:13
 * @route '/khotib-jumat'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/khotib-jumat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KhotbahController::index
 * @see app/Http/Controllers/KhotbahController.php:13
 * @route '/khotib-jumat'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KhotbahController::index
 * @see app/Http/Controllers/KhotbahController.php:13
 * @route '/khotib-jumat'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KhotbahController::index
 * @see app/Http/Controllers/KhotbahController.php:13
 * @route '/khotib-jumat'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KhotbahController::index
 * @see app/Http/Controllers/KhotbahController.php:13
 * @route '/khotib-jumat'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KhotbahController::index
 * @see app/Http/Controllers/KhotbahController.php:13
 * @route '/khotib-jumat'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KhotbahController::index
 * @see app/Http/Controllers/KhotbahController.php:13
 * @route '/khotib-jumat'
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
* @see \App\Http\Controllers\KhotbahController::create
 * @see app/Http/Controllers/KhotbahController.php:38
 * @route '/khotib-jumat/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/khotib-jumat/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KhotbahController::create
 * @see app/Http/Controllers/KhotbahController.php:38
 * @route '/khotib-jumat/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KhotbahController::create
 * @see app/Http/Controllers/KhotbahController.php:38
 * @route '/khotib-jumat/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KhotbahController::create
 * @see app/Http/Controllers/KhotbahController.php:38
 * @route '/khotib-jumat/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KhotbahController::create
 * @see app/Http/Controllers/KhotbahController.php:38
 * @route '/khotib-jumat/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KhotbahController::create
 * @see app/Http/Controllers/KhotbahController.php:38
 * @route '/khotib-jumat/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KhotbahController::create
 * @see app/Http/Controllers/KhotbahController.php:38
 * @route '/khotib-jumat/create'
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
* @see \App\Http\Controllers\KhotbahController::store
 * @see app/Http/Controllers/KhotbahController.php:45
 * @route '/khotib-jumat'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/khotib-jumat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KhotbahController::store
 * @see app/Http/Controllers/KhotbahController.php:45
 * @route '/khotib-jumat'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KhotbahController::store
 * @see app/Http/Controllers/KhotbahController.php:45
 * @route '/khotib-jumat'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\KhotbahController::store
 * @see app/Http/Controllers/KhotbahController.php:45
 * @route '/khotib-jumat'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KhotbahController::store
 * @see app/Http/Controllers/KhotbahController.php:45
 * @route '/khotib-jumat'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\KhotbahController::edit
 * @see app/Http/Controllers/KhotbahController.php:74
 * @route '/khotib-jumat/{khotbah}/edit'
 */
export const edit = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/khotib-jumat/{khotbah}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KhotbahController::edit
 * @see app/Http/Controllers/KhotbahController.php:74
 * @route '/khotib-jumat/{khotbah}/edit'
 */
edit.url = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { khotbah: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { khotbah: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    khotbah: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        khotbah: typeof args.khotbah === 'object'
                ? args.khotbah.id
                : args.khotbah,
                }

    return edit.definition.url
            .replace('{khotbah}', parsedArgs.khotbah.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KhotbahController::edit
 * @see app/Http/Controllers/KhotbahController.php:74
 * @route '/khotib-jumat/{khotbah}/edit'
 */
edit.get = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KhotbahController::edit
 * @see app/Http/Controllers/KhotbahController.php:74
 * @route '/khotib-jumat/{khotbah}/edit'
 */
edit.head = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KhotbahController::edit
 * @see app/Http/Controllers/KhotbahController.php:74
 * @route '/khotib-jumat/{khotbah}/edit'
 */
    const editForm = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KhotbahController::edit
 * @see app/Http/Controllers/KhotbahController.php:74
 * @route '/khotib-jumat/{khotbah}/edit'
 */
        editForm.get = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KhotbahController::edit
 * @see app/Http/Controllers/KhotbahController.php:74
 * @route '/khotib-jumat/{khotbah}/edit'
 */
        editForm.head = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\KhotbahController::update
 * @see app/Http/Controllers/KhotbahController.php:82
 * @route '/khotib-jumat/{khotbah}'
 */
export const update = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/khotib-jumat/{khotbah}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\KhotbahController::update
 * @see app/Http/Controllers/KhotbahController.php:82
 * @route '/khotib-jumat/{khotbah}'
 */
update.url = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { khotbah: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { khotbah: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    khotbah: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        khotbah: typeof args.khotbah === 'object'
                ? args.khotbah.id
                : args.khotbah,
                }

    return update.definition.url
            .replace('{khotbah}', parsedArgs.khotbah.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KhotbahController::update
 * @see app/Http/Controllers/KhotbahController.php:82
 * @route '/khotib-jumat/{khotbah}'
 */
update.put = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\KhotbahController::update
 * @see app/Http/Controllers/KhotbahController.php:82
 * @route '/khotib-jumat/{khotbah}'
 */
update.patch = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\KhotbahController::update
 * @see app/Http/Controllers/KhotbahController.php:82
 * @route '/khotib-jumat/{khotbah}'
 */
    const updateForm = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KhotbahController::update
 * @see app/Http/Controllers/KhotbahController.php:82
 * @route '/khotib-jumat/{khotbah}'
 */
        updateForm.put = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\KhotbahController::update
 * @see app/Http/Controllers/KhotbahController.php:82
 * @route '/khotib-jumat/{khotbah}'
 */
        updateForm.patch = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\KhotbahController::destroy
 * @see app/Http/Controllers/KhotbahController.php:105
 * @route '/khotib-jumat/{khotbah}'
 */
export const destroy = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/khotib-jumat/{khotbah}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KhotbahController::destroy
 * @see app/Http/Controllers/KhotbahController.php:105
 * @route '/khotib-jumat/{khotbah}'
 */
destroy.url = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { khotbah: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { khotbah: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    khotbah: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        khotbah: typeof args.khotbah === 'object'
                ? args.khotbah.id
                : args.khotbah,
                }

    return destroy.definition.url
            .replace('{khotbah}', parsedArgs.khotbah.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KhotbahController::destroy
 * @see app/Http/Controllers/KhotbahController.php:105
 * @route '/khotib-jumat/{khotbah}'
 */
destroy.delete = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\KhotbahController::destroy
 * @see app/Http/Controllers/KhotbahController.php:105
 * @route '/khotib-jumat/{khotbah}'
 */
    const destroyForm = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KhotbahController::destroy
 * @see app/Http/Controllers/KhotbahController.php:105
 * @route '/khotib-jumat/{khotbah}'
 */
        destroyForm.delete = (args: { khotbah: number | { id: number } } | [khotbah: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\KhotbahController::duplicate
 * @see app/Http/Controllers/KhotbahController.php:0
 * @route '/khotib-jumat/{khotbah}/duplicate'
 */
export const duplicate = (args: { khotbah: string | number } | [khotbah: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

duplicate.definition = {
    methods: ["post"],
    url: '/khotib-jumat/{khotbah}/duplicate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KhotbahController::duplicate
 * @see app/Http/Controllers/KhotbahController.php:0
 * @route '/khotib-jumat/{khotbah}/duplicate'
 */
duplicate.url = (args: { khotbah: string | number } | [khotbah: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { khotbah: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    khotbah: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        khotbah: args.khotbah,
                }

    return duplicate.definition.url
            .replace('{khotbah}', parsedArgs.khotbah.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KhotbahController::duplicate
 * @see app/Http/Controllers/KhotbahController.php:0
 * @route '/khotib-jumat/{khotbah}/duplicate'
 */
duplicate.post = (args: { khotbah: string | number } | [khotbah: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\KhotbahController::duplicate
 * @see app/Http/Controllers/KhotbahController.php:0
 * @route '/khotib-jumat/{khotbah}/duplicate'
 */
    const duplicateForm = (args: { khotbah: string | number } | [khotbah: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: duplicate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KhotbahController::duplicate
 * @see app/Http/Controllers/KhotbahController.php:0
 * @route '/khotib-jumat/{khotbah}/duplicate'
 */
        duplicateForm.post = (args: { khotbah: string | number } | [khotbah: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: duplicate.url(args, options),
            method: 'post',
        })
    
    duplicate.form = duplicateForm
const khotibJumat = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
duplicate: Object.assign(duplicate, duplicate),
}

export default khotibJumat