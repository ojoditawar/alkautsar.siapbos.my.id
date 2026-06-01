import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TrensaksiController::index
 * @see app/Http/Controllers/TrensaksiController.php:16
 * @route '/transaksis'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/transaksis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TrensaksiController::index
 * @see app/Http/Controllers/TrensaksiController.php:16
 * @route '/transaksis'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrensaksiController::index
 * @see app/Http/Controllers/TrensaksiController.php:16
 * @route '/transaksis'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TrensaksiController::index
 * @see app/Http/Controllers/TrensaksiController.php:16
 * @route '/transaksis'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TrensaksiController::index
 * @see app/Http/Controllers/TrensaksiController.php:16
 * @route '/transaksis'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TrensaksiController::index
 * @see app/Http/Controllers/TrensaksiController.php:16
 * @route '/transaksis'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TrensaksiController::index
 * @see app/Http/Controllers/TrensaksiController.php:16
 * @route '/transaksis'
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
* @see \App\Http\Controllers\TrensaksiController::create
 * @see app/Http/Controllers/TrensaksiController.php:141
 * @route '/transaksis/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/transaksis/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TrensaksiController::create
 * @see app/Http/Controllers/TrensaksiController.php:141
 * @route '/transaksis/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrensaksiController::create
 * @see app/Http/Controllers/TrensaksiController.php:141
 * @route '/transaksis/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TrensaksiController::create
 * @see app/Http/Controllers/TrensaksiController.php:141
 * @route '/transaksis/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TrensaksiController::create
 * @see app/Http/Controllers/TrensaksiController.php:141
 * @route '/transaksis/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TrensaksiController::create
 * @see app/Http/Controllers/TrensaksiController.php:141
 * @route '/transaksis/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TrensaksiController::create
 * @see app/Http/Controllers/TrensaksiController.php:141
 * @route '/transaksis/create'
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
* @see \App\Http\Controllers\TrensaksiController::store
 * @see app/Http/Controllers/TrensaksiController.php:157
 * @route '/transaksis'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/transaksis',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TrensaksiController::store
 * @see app/Http/Controllers/TrensaksiController.php:157
 * @route '/transaksis'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrensaksiController::store
 * @see app/Http/Controllers/TrensaksiController.php:157
 * @route '/transaksis'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TrensaksiController::store
 * @see app/Http/Controllers/TrensaksiController.php:157
 * @route '/transaksis'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TrensaksiController::store
 * @see app/Http/Controllers/TrensaksiController.php:157
 * @route '/transaksis'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TrensaksiController::edit
 * @see app/Http/Controllers/TrensaksiController.php:197
 * @route '/transaksis/{trensaksi}/edit'
 */
export const edit = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/transaksis/{trensaksi}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TrensaksiController::edit
 * @see app/Http/Controllers/TrensaksiController.php:197
 * @route '/transaksis/{trensaksi}/edit'
 */
edit.url = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { trensaksi: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { trensaksi: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    trensaksi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        trensaksi: typeof args.trensaksi === 'object'
                ? args.trensaksi.id
                : args.trensaksi,
                }

    return edit.definition.url
            .replace('{trensaksi}', parsedArgs.trensaksi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrensaksiController::edit
 * @see app/Http/Controllers/TrensaksiController.php:197
 * @route '/transaksis/{trensaksi}/edit'
 */
edit.get = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TrensaksiController::edit
 * @see app/Http/Controllers/TrensaksiController.php:197
 * @route '/transaksis/{trensaksi}/edit'
 */
edit.head = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TrensaksiController::edit
 * @see app/Http/Controllers/TrensaksiController.php:197
 * @route '/transaksis/{trensaksi}/edit'
 */
    const editForm = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TrensaksiController::edit
 * @see app/Http/Controllers/TrensaksiController.php:197
 * @route '/transaksis/{trensaksi}/edit'
 */
        editForm.get = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TrensaksiController::edit
 * @see app/Http/Controllers/TrensaksiController.php:197
 * @route '/transaksis/{trensaksi}/edit'
 */
        editForm.head = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TrensaksiController::update
 * @see app/Http/Controllers/TrensaksiController.php:226
 * @route '/transaksis/{trensaksi}'
 */
export const update = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/transaksis/{trensaksi}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TrensaksiController::update
 * @see app/Http/Controllers/TrensaksiController.php:226
 * @route '/transaksis/{trensaksi}'
 */
update.url = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { trensaksi: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { trensaksi: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    trensaksi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        trensaksi: typeof args.trensaksi === 'object'
                ? args.trensaksi.id
                : args.trensaksi,
                }

    return update.definition.url
            .replace('{trensaksi}', parsedArgs.trensaksi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrensaksiController::update
 * @see app/Http/Controllers/TrensaksiController.php:226
 * @route '/transaksis/{trensaksi}'
 */
update.put = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\TrensaksiController::update
 * @see app/Http/Controllers/TrensaksiController.php:226
 * @route '/transaksis/{trensaksi}'
 */
update.patch = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\TrensaksiController::update
 * @see app/Http/Controllers/TrensaksiController.php:226
 * @route '/transaksis/{trensaksi}'
 */
    const updateForm = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TrensaksiController::update
 * @see app/Http/Controllers/TrensaksiController.php:226
 * @route '/transaksis/{trensaksi}'
 */
        updateForm.put = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\TrensaksiController::update
 * @see app/Http/Controllers/TrensaksiController.php:226
 * @route '/transaksis/{trensaksi}'
 */
        updateForm.patch = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TrensaksiController::destroy
 * @see app/Http/Controllers/TrensaksiController.php:267
 * @route '/transaksis/{trensaksi}'
 */
export const destroy = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/transaksis/{trensaksi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TrensaksiController::destroy
 * @see app/Http/Controllers/TrensaksiController.php:267
 * @route '/transaksis/{trensaksi}'
 */
destroy.url = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { trensaksi: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { trensaksi: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    trensaksi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        trensaksi: typeof args.trensaksi === 'object'
                ? args.trensaksi.id
                : args.trensaksi,
                }

    return destroy.definition.url
            .replace('{trensaksi}', parsedArgs.trensaksi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrensaksiController::destroy
 * @see app/Http/Controllers/TrensaksiController.php:267
 * @route '/transaksis/{trensaksi}'
 */
destroy.delete = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TrensaksiController::destroy
 * @see app/Http/Controllers/TrensaksiController.php:267
 * @route '/transaksis/{trensaksi}'
 */
    const destroyForm = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TrensaksiController::destroy
 * @see app/Http/Controllers/TrensaksiController.php:267
 * @route '/transaksis/{trensaksi}'
 */
        destroyForm.delete = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TrensaksiController::duplicate
 * @see app/Http/Controllers/TrensaksiController.php:285
 * @route '/transaksis/{trensaksi}/duplicate'
 */
export const duplicate = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

duplicate.definition = {
    methods: ["post"],
    url: '/transaksis/{trensaksi}/duplicate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TrensaksiController::duplicate
 * @see app/Http/Controllers/TrensaksiController.php:285
 * @route '/transaksis/{trensaksi}/duplicate'
 */
duplicate.url = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { trensaksi: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { trensaksi: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    trensaksi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        trensaksi: typeof args.trensaksi === 'object'
                ? args.trensaksi.id
                : args.trensaksi,
                }

    return duplicate.definition.url
            .replace('{trensaksi}', parsedArgs.trensaksi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrensaksiController::duplicate
 * @see app/Http/Controllers/TrensaksiController.php:285
 * @route '/transaksis/{trensaksi}/duplicate'
 */
duplicate.post = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TrensaksiController::duplicate
 * @see app/Http/Controllers/TrensaksiController.php:285
 * @route '/transaksis/{trensaksi}/duplicate'
 */
    const duplicateForm = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: duplicate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TrensaksiController::duplicate
 * @see app/Http/Controllers/TrensaksiController.php:285
 * @route '/transaksis/{trensaksi}/duplicate'
 */
        duplicateForm.post = (args: { trensaksi: number | { id: number } } | [trensaksi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: duplicate.url(args, options),
            method: 'post',
        })
    
    duplicate.form = duplicateForm
const transaksis = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
duplicate: Object.assign(duplicate, duplicate),
}

export default transaksis