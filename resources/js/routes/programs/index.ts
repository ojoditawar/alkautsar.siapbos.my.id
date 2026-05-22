import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import kegiatans from './kegiatans'
/**
* @see \App\Http\Controllers\ProgramController::index
 * @see app/Http/Controllers/ProgramController.php:13
 * @route '/programs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/programs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProgramController::index
 * @see app/Http/Controllers/ProgramController.php:13
 * @route '/programs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProgramController::index
 * @see app/Http/Controllers/ProgramController.php:13
 * @route '/programs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProgramController::index
 * @see app/Http/Controllers/ProgramController.php:13
 * @route '/programs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProgramController::index
 * @see app/Http/Controllers/ProgramController.php:13
 * @route '/programs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProgramController::index
 * @see app/Http/Controllers/ProgramController.php:13
 * @route '/programs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProgramController::index
 * @see app/Http/Controllers/ProgramController.php:13
 * @route '/programs'
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
* @see \App\Http\Controllers\ProgramController::create
 * @see app/Http/Controllers/ProgramController.php:24
 * @route '/programs/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/programs/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProgramController::create
 * @see app/Http/Controllers/ProgramController.php:24
 * @route '/programs/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProgramController::create
 * @see app/Http/Controllers/ProgramController.php:24
 * @route '/programs/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProgramController::create
 * @see app/Http/Controllers/ProgramController.php:24
 * @route '/programs/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProgramController::create
 * @see app/Http/Controllers/ProgramController.php:24
 * @route '/programs/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProgramController::create
 * @see app/Http/Controllers/ProgramController.php:24
 * @route '/programs/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProgramController::create
 * @see app/Http/Controllers/ProgramController.php:24
 * @route '/programs/create'
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
* @see \App\Http\Controllers\ProgramController::store
 * @see app/Http/Controllers/ProgramController.php:29
 * @route '/programs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/programs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProgramController::store
 * @see app/Http/Controllers/ProgramController.php:29
 * @route '/programs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProgramController::store
 * @see app/Http/Controllers/ProgramController.php:29
 * @route '/programs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProgramController::store
 * @see app/Http/Controllers/ProgramController.php:29
 * @route '/programs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProgramController::store
 * @see app/Http/Controllers/ProgramController.php:29
 * @route '/programs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ProgramController::edit
 * @see app/Http/Controllers/ProgramController.php:43
 * @route '/programs/{program}/edit'
 */
export const edit = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/programs/{program}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProgramController::edit
 * @see app/Http/Controllers/ProgramController.php:43
 * @route '/programs/{program}/edit'
 */
edit.url = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProgramController::edit
 * @see app/Http/Controllers/ProgramController.php:43
 * @route '/programs/{program}/edit'
 */
edit.get = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProgramController::edit
 * @see app/Http/Controllers/ProgramController.php:43
 * @route '/programs/{program}/edit'
 */
edit.head = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProgramController::edit
 * @see app/Http/Controllers/ProgramController.php:43
 * @route '/programs/{program}/edit'
 */
    const editForm = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProgramController::edit
 * @see app/Http/Controllers/ProgramController.php:43
 * @route '/programs/{program}/edit'
 */
        editForm.get = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProgramController::edit
 * @see app/Http/Controllers/ProgramController.php:43
 * @route '/programs/{program}/edit'
 */
        editForm.head = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ProgramController::update
 * @see app/Http/Controllers/ProgramController.php:50
 * @route '/programs/{program}'
 */
export const update = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/programs/{program}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProgramController::update
 * @see app/Http/Controllers/ProgramController.php:50
 * @route '/programs/{program}'
 */
update.url = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProgramController::update
 * @see app/Http/Controllers/ProgramController.php:50
 * @route '/programs/{program}'
 */
update.put = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\ProgramController::update
 * @see app/Http/Controllers/ProgramController.php:50
 * @route '/programs/{program}'
 */
update.patch = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ProgramController::update
 * @see app/Http/Controllers/ProgramController.php:50
 * @route '/programs/{program}'
 */
    const updateForm = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProgramController::update
 * @see app/Http/Controllers/ProgramController.php:50
 * @route '/programs/{program}'
 */
        updateForm.put = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\ProgramController::update
 * @see app/Http/Controllers/ProgramController.php:50
 * @route '/programs/{program}'
 */
        updateForm.patch = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ProgramController::destroy
 * @see app/Http/Controllers/ProgramController.php:64
 * @route '/programs/{program}'
 */
export const destroy = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/programs/{program}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProgramController::destroy
 * @see app/Http/Controllers/ProgramController.php:64
 * @route '/programs/{program}'
 */
destroy.url = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProgramController::destroy
 * @see app/Http/Controllers/ProgramController.php:64
 * @route '/programs/{program}'
 */
destroy.delete = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ProgramController::destroy
 * @see app/Http/Controllers/ProgramController.php:64
 * @route '/programs/{program}'
 */
    const destroyForm = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProgramController::destroy
 * @see app/Http/Controllers/ProgramController.php:64
 * @route '/programs/{program}'
 */
        destroyForm.delete = (args: { program: string | number | { id: string | number } } | [program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const programs = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
kegiatans: Object.assign(kegiatans, kegiatans),
}

export default programs