import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\KegiatanController::index
 * @see app/Http/Controllers/KegiatanController.php:12
 * @route '/programs/{program}/kegiatans'
 */
export const index = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/programs/{program}/kegiatans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KegiatanController::index
 * @see app/Http/Controllers/KegiatanController.php:12
 * @route '/programs/{program}/kegiatans'
 */
index.url = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { program: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    program: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program: typeof args.program === 'object'
                ? args.program.id
                : args.program,
                }

    return index.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::index
 * @see app/Http/Controllers/KegiatanController.php:12
 * @route '/programs/{program}/kegiatans'
 */
index.get = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KegiatanController::index
 * @see app/Http/Controllers/KegiatanController.php:12
 * @route '/programs/{program}/kegiatans'
 */
index.head = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KegiatanController::index
 * @see app/Http/Controllers/KegiatanController.php:12
 * @route '/programs/{program}/kegiatans'
 */
    const indexForm = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KegiatanController::index
 * @see app/Http/Controllers/KegiatanController.php:12
 * @route '/programs/{program}/kegiatans'
 */
        indexForm.get = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KegiatanController::index
 * @see app/Http/Controllers/KegiatanController.php:12
 * @route '/programs/{program}/kegiatans'
 */
        indexForm.head = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\KegiatanController::create
 * @see app/Http/Controllers/KegiatanController.php:22
 * @route '/programs/{program}/kegiatans/create'
 */
export const create = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/programs/{program}/kegiatans/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KegiatanController::create
 * @see app/Http/Controllers/KegiatanController.php:22
 * @route '/programs/{program}/kegiatans/create'
 */
create.url = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { program: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    program: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program: typeof args.program === 'object'
                ? args.program.id
                : args.program,
                }

    return create.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::create
 * @see app/Http/Controllers/KegiatanController.php:22
 * @route '/programs/{program}/kegiatans/create'
 */
create.get = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KegiatanController::create
 * @see app/Http/Controllers/KegiatanController.php:22
 * @route '/programs/{program}/kegiatans/create'
 */
create.head = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KegiatanController::create
 * @see app/Http/Controllers/KegiatanController.php:22
 * @route '/programs/{program}/kegiatans/create'
 */
    const createForm = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KegiatanController::create
 * @see app/Http/Controllers/KegiatanController.php:22
 * @route '/programs/{program}/kegiatans/create'
 */
        createForm.get = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KegiatanController::create
 * @see app/Http/Controllers/KegiatanController.php:22
 * @route '/programs/{program}/kegiatans/create'
 */
        createForm.head = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\KegiatanController::store
 * @see app/Http/Controllers/KegiatanController.php:29
 * @route '/programs/{program}/kegiatans'
 */
export const store = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/programs/{program}/kegiatans',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KegiatanController::store
 * @see app/Http/Controllers/KegiatanController.php:29
 * @route '/programs/{program}/kegiatans'
 */
store.url = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { program: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    program: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program: typeof args.program === 'object'
                ? args.program.id
                : args.program,
                }

    return store.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::store
 * @see app/Http/Controllers/KegiatanController.php:29
 * @route '/programs/{program}/kegiatans'
 */
store.post = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\KegiatanController::store
 * @see app/Http/Controllers/KegiatanController.php:29
 * @route '/programs/{program}/kegiatans'
 */
    const storeForm = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KegiatanController::store
 * @see app/Http/Controllers/KegiatanController.php:29
 * @route '/programs/{program}/kegiatans'
 */
        storeForm.post = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\KegiatanController::edit
 * @see app/Http/Controllers/KegiatanController.php:41
 * @route '/programs/{program}/kegiatans/{kegiatan}/edit'
 */
export const edit = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/programs/{program}/kegiatans/{kegiatan}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KegiatanController::edit
 * @see app/Http/Controllers/KegiatanController.php:41
 * @route '/programs/{program}/kegiatans/{kegiatan}/edit'
 */
edit.url = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    program: args[0],
                    kegiatan: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program: typeof args.program === 'object'
                ? args.program.id
                : args.program,
                                kegiatan: typeof args.kegiatan === 'object'
                ? args.kegiatan.id
                : args.kegiatan,
                }

    return edit.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::edit
 * @see app/Http/Controllers/KegiatanController.php:41
 * @route '/programs/{program}/kegiatans/{kegiatan}/edit'
 */
edit.get = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KegiatanController::edit
 * @see app/Http/Controllers/KegiatanController.php:41
 * @route '/programs/{program}/kegiatans/{kegiatan}/edit'
 */
edit.head = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KegiatanController::edit
 * @see app/Http/Controllers/KegiatanController.php:41
 * @route '/programs/{program}/kegiatans/{kegiatan}/edit'
 */
    const editForm = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KegiatanController::edit
 * @see app/Http/Controllers/KegiatanController.php:41
 * @route '/programs/{program}/kegiatans/{kegiatan}/edit'
 */
        editForm.get = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KegiatanController::edit
 * @see app/Http/Controllers/KegiatanController.php:41
 * @route '/programs/{program}/kegiatans/{kegiatan}/edit'
 */
        editForm.head = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\KegiatanController::update
 * @see app/Http/Controllers/KegiatanController.php:53
 * @route '/programs/{program}/kegiatans/{kegiatan}'
 */
export const update = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/programs/{program}/kegiatans/{kegiatan}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\KegiatanController::update
 * @see app/Http/Controllers/KegiatanController.php:53
 * @route '/programs/{program}/kegiatans/{kegiatan}'
 */
update.url = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    program: args[0],
                    kegiatan: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program: typeof args.program === 'object'
                ? args.program.id
                : args.program,
                                kegiatan: typeof args.kegiatan === 'object'
                ? args.kegiatan.id
                : args.kegiatan,
                }

    return update.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::update
 * @see app/Http/Controllers/KegiatanController.php:53
 * @route '/programs/{program}/kegiatans/{kegiatan}'
 */
update.put = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\KegiatanController::update
 * @see app/Http/Controllers/KegiatanController.php:53
 * @route '/programs/{program}/kegiatans/{kegiatan}'
 */
update.patch = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\KegiatanController::update
 * @see app/Http/Controllers/KegiatanController.php:53
 * @route '/programs/{program}/kegiatans/{kegiatan}'
 */
    const updateForm = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KegiatanController::update
 * @see app/Http/Controllers/KegiatanController.php:53
 * @route '/programs/{program}/kegiatans/{kegiatan}'
 */
        updateForm.put = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\KegiatanController::update
 * @see app/Http/Controllers/KegiatanController.php:53
 * @route '/programs/{program}/kegiatans/{kegiatan}'
 */
        updateForm.patch = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\KegiatanController::destroy
 * @see app/Http/Controllers/KegiatanController.php:69
 * @route '/programs/{program}/kegiatans/{kegiatan}'
 */
export const destroy = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/programs/{program}/kegiatans/{kegiatan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KegiatanController::destroy
 * @see app/Http/Controllers/KegiatanController.php:69
 * @route '/programs/{program}/kegiatans/{kegiatan}'
 */
destroy.url = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    program: args[0],
                    kegiatan: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program: typeof args.program === 'object'
                ? args.program.id
                : args.program,
                                kegiatan: typeof args.kegiatan === 'object'
                ? args.kegiatan.id
                : args.kegiatan,
                }

    return destroy.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace('{kegiatan}', parsedArgs.kegiatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KegiatanController::destroy
 * @see app/Http/Controllers/KegiatanController.php:69
 * @route '/programs/{program}/kegiatans/{kegiatan}'
 */
destroy.delete = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\KegiatanController::destroy
 * @see app/Http/Controllers/KegiatanController.php:69
 * @route '/programs/{program}/kegiatans/{kegiatan}'
 */
    const destroyForm = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KegiatanController::destroy
 * @see app/Http/Controllers/KegiatanController.php:69
 * @route '/programs/{program}/kegiatans/{kegiatan}'
 */
        destroyForm.delete = (args: { program: number | { id: number }, kegiatan: number | { id: number } } | [program: number | { id: number }, kegiatan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const kegiatans = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default kegiatans