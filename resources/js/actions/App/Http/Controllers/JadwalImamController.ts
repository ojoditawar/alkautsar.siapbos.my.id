import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\JadwalImamController::index
 * @see app/Http/Controllers/JadwalImamController.php:13
 * @route '/jadwal-imams'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jadwal-imams',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalImamController::index
 * @see app/Http/Controllers/JadwalImamController.php:13
 * @route '/jadwal-imams'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalImamController::index
 * @see app/Http/Controllers/JadwalImamController.php:13
 * @route '/jadwal-imams'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JadwalImamController::index
 * @see app/Http/Controllers/JadwalImamController.php:13
 * @route '/jadwal-imams'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JadwalImamController::index
 * @see app/Http/Controllers/JadwalImamController.php:13
 * @route '/jadwal-imams'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JadwalImamController::index
 * @see app/Http/Controllers/JadwalImamController.php:13
 * @route '/jadwal-imams'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JadwalImamController::index
 * @see app/Http/Controllers/JadwalImamController.php:13
 * @route '/jadwal-imams'
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
* @see \App\Http\Controllers\JadwalImamController::create
 * @see app/Http/Controllers/JadwalImamController.php:52
 * @route '/jadwal-imams/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/jadwal-imams/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalImamController::create
 * @see app/Http/Controllers/JadwalImamController.php:52
 * @route '/jadwal-imams/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalImamController::create
 * @see app/Http/Controllers/JadwalImamController.php:52
 * @route '/jadwal-imams/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JadwalImamController::create
 * @see app/Http/Controllers/JadwalImamController.php:52
 * @route '/jadwal-imams/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JadwalImamController::create
 * @see app/Http/Controllers/JadwalImamController.php:52
 * @route '/jadwal-imams/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JadwalImamController::create
 * @see app/Http/Controllers/JadwalImamController.php:52
 * @route '/jadwal-imams/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JadwalImamController::create
 * @see app/Http/Controllers/JadwalImamController.php:52
 * @route '/jadwal-imams/create'
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
* @see \App\Http\Controllers\JadwalImamController::store
 * @see app/Http/Controllers/JadwalImamController.php:60
 * @route '/jadwal-imams'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/jadwal-imams',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JadwalImamController::store
 * @see app/Http/Controllers/JadwalImamController.php:60
 * @route '/jadwal-imams'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalImamController::store
 * @see app/Http/Controllers/JadwalImamController.php:60
 * @route '/jadwal-imams'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\JadwalImamController::store
 * @see app/Http/Controllers/JadwalImamController.php:60
 * @route '/jadwal-imams'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JadwalImamController::store
 * @see app/Http/Controllers/JadwalImamController.php:60
 * @route '/jadwal-imams'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\JadwalImamController::edit
 * @see app/Http/Controllers/JadwalImamController.php:89
 * @route '/jadwal-imams/{jadwalImam}/edit'
 */
export const edit = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/jadwal-imams/{jadwalImam}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalImamController::edit
 * @see app/Http/Controllers/JadwalImamController.php:89
 * @route '/jadwal-imams/{jadwalImam}/edit'
 */
edit.url = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jadwalImam: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { jadwalImam: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    jadwalImam: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        jadwalImam: typeof args.jadwalImam === 'object'
                ? args.jadwalImam.id
                : args.jadwalImam,
                }

    return edit.definition.url
            .replace('{jadwalImam}', parsedArgs.jadwalImam.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalImamController::edit
 * @see app/Http/Controllers/JadwalImamController.php:89
 * @route '/jadwal-imams/{jadwalImam}/edit'
 */
edit.get = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JadwalImamController::edit
 * @see app/Http/Controllers/JadwalImamController.php:89
 * @route '/jadwal-imams/{jadwalImam}/edit'
 */
edit.head = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JadwalImamController::edit
 * @see app/Http/Controllers/JadwalImamController.php:89
 * @route '/jadwal-imams/{jadwalImam}/edit'
 */
    const editForm = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JadwalImamController::edit
 * @see app/Http/Controllers/JadwalImamController.php:89
 * @route '/jadwal-imams/{jadwalImam}/edit'
 */
        editForm.get = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JadwalImamController::edit
 * @see app/Http/Controllers/JadwalImamController.php:89
 * @route '/jadwal-imams/{jadwalImam}/edit'
 */
        editForm.head = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\JadwalImamController::update
 * @see app/Http/Controllers/JadwalImamController.php:98
 * @route '/jadwal-imams/{jadwalImam}'
 */
export const update = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/jadwal-imams/{jadwalImam}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\JadwalImamController::update
 * @see app/Http/Controllers/JadwalImamController.php:98
 * @route '/jadwal-imams/{jadwalImam}'
 */
update.url = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jadwalImam: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { jadwalImam: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    jadwalImam: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        jadwalImam: typeof args.jadwalImam === 'object'
                ? args.jadwalImam.id
                : args.jadwalImam,
                }

    return update.definition.url
            .replace('{jadwalImam}', parsedArgs.jadwalImam.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalImamController::update
 * @see app/Http/Controllers/JadwalImamController.php:98
 * @route '/jadwal-imams/{jadwalImam}'
 */
update.put = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\JadwalImamController::update
 * @see app/Http/Controllers/JadwalImamController.php:98
 * @route '/jadwal-imams/{jadwalImam}'
 */
update.patch = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\JadwalImamController::update
 * @see app/Http/Controllers/JadwalImamController.php:98
 * @route '/jadwal-imams/{jadwalImam}'
 */
    const updateForm = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JadwalImamController::update
 * @see app/Http/Controllers/JadwalImamController.php:98
 * @route '/jadwal-imams/{jadwalImam}'
 */
        updateForm.put = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\JadwalImamController::update
 * @see app/Http/Controllers/JadwalImamController.php:98
 * @route '/jadwal-imams/{jadwalImam}'
 */
        updateForm.patch = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\JadwalImamController::destroy
 * @see app/Http/Controllers/JadwalImamController.php:115
 * @route '/jadwal-imams/{jadwalImam}'
 */
export const destroy = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/jadwal-imams/{jadwalImam}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\JadwalImamController::destroy
 * @see app/Http/Controllers/JadwalImamController.php:115
 * @route '/jadwal-imams/{jadwalImam}'
 */
destroy.url = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jadwalImam: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { jadwalImam: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    jadwalImam: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        jadwalImam: typeof args.jadwalImam === 'object'
                ? args.jadwalImam.id
                : args.jadwalImam,
                }

    return destroy.definition.url
            .replace('{jadwalImam}', parsedArgs.jadwalImam.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalImamController::destroy
 * @see app/Http/Controllers/JadwalImamController.php:115
 * @route '/jadwal-imams/{jadwalImam}'
 */
destroy.delete = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\JadwalImamController::destroy
 * @see app/Http/Controllers/JadwalImamController.php:115
 * @route '/jadwal-imams/{jadwalImam}'
 */
    const destroyForm = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JadwalImamController::destroy
 * @see app/Http/Controllers/JadwalImamController.php:115
 * @route '/jadwal-imams/{jadwalImam}'
 */
        destroyForm.delete = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\JadwalImamController::duplicate
 * @see app/Http/Controllers/JadwalImamController.php:122
 * @route '/jadwal-imams/{jadwalImam}/duplicate'
 */
export const duplicate = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

duplicate.definition = {
    methods: ["post"],
    url: '/jadwal-imams/{jadwalImam}/duplicate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JadwalImamController::duplicate
 * @see app/Http/Controllers/JadwalImamController.php:122
 * @route '/jadwal-imams/{jadwalImam}/duplicate'
 */
duplicate.url = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jadwalImam: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { jadwalImam: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    jadwalImam: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        jadwalImam: typeof args.jadwalImam === 'object'
                ? args.jadwalImam.id
                : args.jadwalImam,
                }

    return duplicate.definition.url
            .replace('{jadwalImam}', parsedArgs.jadwalImam.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalImamController::duplicate
 * @see app/Http/Controllers/JadwalImamController.php:122
 * @route '/jadwal-imams/{jadwalImam}/duplicate'
 */
duplicate.post = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\JadwalImamController::duplicate
 * @see app/Http/Controllers/JadwalImamController.php:122
 * @route '/jadwal-imams/{jadwalImam}/duplicate'
 */
    const duplicateForm = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: duplicate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JadwalImamController::duplicate
 * @see app/Http/Controllers/JadwalImamController.php:122
 * @route '/jadwal-imams/{jadwalImam}/duplicate'
 */
        duplicateForm.post = (args: { jadwalImam: number | { id: number } } | [jadwalImam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: duplicate.url(args, options),
            method: 'post',
        })
    
    duplicate.form = duplicateForm
const JadwalImamController = { index, create, store, edit, update, destroy, duplicate }

export default JadwalImamController