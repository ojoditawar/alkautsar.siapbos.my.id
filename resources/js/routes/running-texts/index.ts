import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RunningTextController::index
 * @see app/Http/Controllers/RunningTextController.php:13
 * @route '/running-texts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/running-texts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RunningTextController::index
 * @see app/Http/Controllers/RunningTextController.php:13
 * @route '/running-texts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RunningTextController::index
 * @see app/Http/Controllers/RunningTextController.php:13
 * @route '/running-texts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RunningTextController::index
 * @see app/Http/Controllers/RunningTextController.php:13
 * @route '/running-texts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RunningTextController::index
 * @see app/Http/Controllers/RunningTextController.php:13
 * @route '/running-texts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RunningTextController::index
 * @see app/Http/Controllers/RunningTextController.php:13
 * @route '/running-texts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RunningTextController::index
 * @see app/Http/Controllers/RunningTextController.php:13
 * @route '/running-texts'
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
* @see \App\Http\Controllers\RunningTextController::create
 * @see app/Http/Controllers/RunningTextController.php:22
 * @route '/running-texts/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/running-texts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RunningTextController::create
 * @see app/Http/Controllers/RunningTextController.php:22
 * @route '/running-texts/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RunningTextController::create
 * @see app/Http/Controllers/RunningTextController.php:22
 * @route '/running-texts/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RunningTextController::create
 * @see app/Http/Controllers/RunningTextController.php:22
 * @route '/running-texts/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RunningTextController::create
 * @see app/Http/Controllers/RunningTextController.php:22
 * @route '/running-texts/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RunningTextController::create
 * @see app/Http/Controllers/RunningTextController.php:22
 * @route '/running-texts/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RunningTextController::create
 * @see app/Http/Controllers/RunningTextController.php:22
 * @route '/running-texts/create'
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
* @see \App\Http\Controllers\RunningTextController::store
 * @see app/Http/Controllers/RunningTextController.php:27
 * @route '/running-texts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/running-texts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RunningTextController::store
 * @see app/Http/Controllers/RunningTextController.php:27
 * @route '/running-texts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RunningTextController::store
 * @see app/Http/Controllers/RunningTextController.php:27
 * @route '/running-texts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RunningTextController::store
 * @see app/Http/Controllers/RunningTextController.php:27
 * @route '/running-texts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RunningTextController::store
 * @see app/Http/Controllers/RunningTextController.php:27
 * @route '/running-texts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RunningTextController::edit
 * @see app/Http/Controllers/RunningTextController.php:46
 * @route '/running-texts/{runningText}/edit'
 */
export const edit = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/running-texts/{runningText}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RunningTextController::edit
 * @see app/Http/Controllers/RunningTextController.php:46
 * @route '/running-texts/{runningText}/edit'
 */
edit.url = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { runningText: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { runningText: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    runningText: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        runningText: typeof args.runningText === 'object'
                ? args.runningText.id
                : args.runningText,
                }

    return edit.definition.url
            .replace('{runningText}', parsedArgs.runningText.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RunningTextController::edit
 * @see app/Http/Controllers/RunningTextController.php:46
 * @route '/running-texts/{runningText}/edit'
 */
edit.get = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RunningTextController::edit
 * @see app/Http/Controllers/RunningTextController.php:46
 * @route '/running-texts/{runningText}/edit'
 */
edit.head = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RunningTextController::edit
 * @see app/Http/Controllers/RunningTextController.php:46
 * @route '/running-texts/{runningText}/edit'
 */
    const editForm = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RunningTextController::edit
 * @see app/Http/Controllers/RunningTextController.php:46
 * @route '/running-texts/{runningText}/edit'
 */
        editForm.get = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RunningTextController::edit
 * @see app/Http/Controllers/RunningTextController.php:46
 * @route '/running-texts/{runningText}/edit'
 */
        editForm.head = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\RunningTextController::update
 * @see app/Http/Controllers/RunningTextController.php:53
 * @route '/running-texts/{runningText}'
 */
export const update = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/running-texts/{runningText}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RunningTextController::update
 * @see app/Http/Controllers/RunningTextController.php:53
 * @route '/running-texts/{runningText}'
 */
update.url = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { runningText: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { runningText: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    runningText: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        runningText: typeof args.runningText === 'object'
                ? args.runningText.id
                : args.runningText,
                }

    return update.definition.url
            .replace('{runningText}', parsedArgs.runningText.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RunningTextController::update
 * @see app/Http/Controllers/RunningTextController.php:53
 * @route '/running-texts/{runningText}'
 */
update.put = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\RunningTextController::update
 * @see app/Http/Controllers/RunningTextController.php:53
 * @route '/running-texts/{runningText}'
 */
update.patch = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\RunningTextController::update
 * @see app/Http/Controllers/RunningTextController.php:53
 * @route '/running-texts/{runningText}'
 */
    const updateForm = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RunningTextController::update
 * @see app/Http/Controllers/RunningTextController.php:53
 * @route '/running-texts/{runningText}'
 */
        updateForm.put = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\RunningTextController::update
 * @see app/Http/Controllers/RunningTextController.php:53
 * @route '/running-texts/{runningText}'
 */
        updateForm.patch = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\RunningTextController::destroy
 * @see app/Http/Controllers/RunningTextController.php:72
 * @route '/running-texts/{runningText}'
 */
export const destroy = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/running-texts/{runningText}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RunningTextController::destroy
 * @see app/Http/Controllers/RunningTextController.php:72
 * @route '/running-texts/{runningText}'
 */
destroy.url = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { runningText: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { runningText: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    runningText: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        runningText: typeof args.runningText === 'object'
                ? args.runningText.id
                : args.runningText,
                }

    return destroy.definition.url
            .replace('{runningText}', parsedArgs.runningText.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RunningTextController::destroy
 * @see app/Http/Controllers/RunningTextController.php:72
 * @route '/running-texts/{runningText}'
 */
destroy.delete = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RunningTextController::destroy
 * @see app/Http/Controllers/RunningTextController.php:72
 * @route '/running-texts/{runningText}'
 */
    const destroyForm = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RunningTextController::destroy
 * @see app/Http/Controllers/RunningTextController.php:72
 * @route '/running-texts/{runningText}'
 */
        destroyForm.delete = (args: { runningText: string | number | { id: string | number } } | [runningText: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const runningTexts = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default runningTexts