import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MutiaraImageController::index
 * @see app/Http/Controllers/MutiaraImageController.php:14
 * @route '/mutiara-images'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/mutiara-images',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MutiaraImageController::index
 * @see app/Http/Controllers/MutiaraImageController.php:14
 * @route '/mutiara-images'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MutiaraImageController::index
 * @see app/Http/Controllers/MutiaraImageController.php:14
 * @route '/mutiara-images'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MutiaraImageController::index
 * @see app/Http/Controllers/MutiaraImageController.php:14
 * @route '/mutiara-images'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MutiaraImageController::index
 * @see app/Http/Controllers/MutiaraImageController.php:14
 * @route '/mutiara-images'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MutiaraImageController::index
 * @see app/Http/Controllers/MutiaraImageController.php:14
 * @route '/mutiara-images'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MutiaraImageController::index
 * @see app/Http/Controllers/MutiaraImageController.php:14
 * @route '/mutiara-images'
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
* @see \App\Http\Controllers\MutiaraImageController::create
 * @see app/Http/Controllers/MutiaraImageController.php:36
 * @route '/mutiara-images/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/mutiara-images/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MutiaraImageController::create
 * @see app/Http/Controllers/MutiaraImageController.php:36
 * @route '/mutiara-images/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MutiaraImageController::create
 * @see app/Http/Controllers/MutiaraImageController.php:36
 * @route '/mutiara-images/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MutiaraImageController::create
 * @see app/Http/Controllers/MutiaraImageController.php:36
 * @route '/mutiara-images/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MutiaraImageController::create
 * @see app/Http/Controllers/MutiaraImageController.php:36
 * @route '/mutiara-images/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MutiaraImageController::create
 * @see app/Http/Controllers/MutiaraImageController.php:36
 * @route '/mutiara-images/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MutiaraImageController::create
 * @see app/Http/Controllers/MutiaraImageController.php:36
 * @route '/mutiara-images/create'
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
* @see \App\Http\Controllers\MutiaraImageController::store
 * @see app/Http/Controllers/MutiaraImageController.php:41
 * @route '/mutiara-images'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/mutiara-images',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MutiaraImageController::store
 * @see app/Http/Controllers/MutiaraImageController.php:41
 * @route '/mutiara-images'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MutiaraImageController::store
 * @see app/Http/Controllers/MutiaraImageController.php:41
 * @route '/mutiara-images'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MutiaraImageController::store
 * @see app/Http/Controllers/MutiaraImageController.php:41
 * @route '/mutiara-images'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MutiaraImageController::store
 * @see app/Http/Controllers/MutiaraImageController.php:41
 * @route '/mutiara-images'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\MutiaraImageController::edit
 * @see app/Http/Controllers/MutiaraImageController.php:65
 * @route '/mutiara-images/{mutiara_image}/edit'
 */
export const edit = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/mutiara-images/{mutiara_image}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MutiaraImageController::edit
 * @see app/Http/Controllers/MutiaraImageController.php:65
 * @route '/mutiara-images/{mutiara_image}/edit'
 */
edit.url = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { mutiara_image: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { mutiara_image: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    mutiara_image: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        mutiara_image: typeof args.mutiara_image === 'object'
                ? args.mutiara_image.id
                : args.mutiara_image,
                }

    return edit.definition.url
            .replace('{mutiara_image}', parsedArgs.mutiara_image.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MutiaraImageController::edit
 * @see app/Http/Controllers/MutiaraImageController.php:65
 * @route '/mutiara-images/{mutiara_image}/edit'
 */
edit.get = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MutiaraImageController::edit
 * @see app/Http/Controllers/MutiaraImageController.php:65
 * @route '/mutiara-images/{mutiara_image}/edit'
 */
edit.head = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MutiaraImageController::edit
 * @see app/Http/Controllers/MutiaraImageController.php:65
 * @route '/mutiara-images/{mutiara_image}/edit'
 */
    const editForm = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MutiaraImageController::edit
 * @see app/Http/Controllers/MutiaraImageController.php:65
 * @route '/mutiara-images/{mutiara_image}/edit'
 */
        editForm.get = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MutiaraImageController::edit
 * @see app/Http/Controllers/MutiaraImageController.php:65
 * @route '/mutiara-images/{mutiara_image}/edit'
 */
        editForm.head = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\MutiaraImageController::update
 * @see app/Http/Controllers/MutiaraImageController.php:85
 * @route '/mutiara-images/{mutiara_image}'
 */
export const update = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/mutiara-images/{mutiara_image}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\MutiaraImageController::update
 * @see app/Http/Controllers/MutiaraImageController.php:85
 * @route '/mutiara-images/{mutiara_image}'
 */
update.url = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { mutiara_image: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { mutiara_image: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    mutiara_image: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        mutiara_image: typeof args.mutiara_image === 'object'
                ? args.mutiara_image.id
                : args.mutiara_image,
                }

    return update.definition.url
            .replace('{mutiara_image}', parsedArgs.mutiara_image.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MutiaraImageController::update
 * @see app/Http/Controllers/MutiaraImageController.php:85
 * @route '/mutiara-images/{mutiara_image}'
 */
update.put = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\MutiaraImageController::update
 * @see app/Http/Controllers/MutiaraImageController.php:85
 * @route '/mutiara-images/{mutiara_image}'
 */
update.patch = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\MutiaraImageController::update
 * @see app/Http/Controllers/MutiaraImageController.php:85
 * @route '/mutiara-images/{mutiara_image}'
 */
    const updateForm = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MutiaraImageController::update
 * @see app/Http/Controllers/MutiaraImageController.php:85
 * @route '/mutiara-images/{mutiara_image}'
 */
        updateForm.put = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\MutiaraImageController::update
 * @see app/Http/Controllers/MutiaraImageController.php:85
 * @route '/mutiara-images/{mutiara_image}'
 */
        updateForm.patch = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\MutiaraImageController::destroy
 * @see app/Http/Controllers/MutiaraImageController.php:122
 * @route '/mutiara-images/{mutiara_image}'
 */
export const destroy = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/mutiara-images/{mutiara_image}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MutiaraImageController::destroy
 * @see app/Http/Controllers/MutiaraImageController.php:122
 * @route '/mutiara-images/{mutiara_image}'
 */
destroy.url = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { mutiara_image: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { mutiara_image: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    mutiara_image: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        mutiara_image: typeof args.mutiara_image === 'object'
                ? args.mutiara_image.id
                : args.mutiara_image,
                }

    return destroy.definition.url
            .replace('{mutiara_image}', parsedArgs.mutiara_image.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MutiaraImageController::destroy
 * @see app/Http/Controllers/MutiaraImageController.php:122
 * @route '/mutiara-images/{mutiara_image}'
 */
destroy.delete = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MutiaraImageController::destroy
 * @see app/Http/Controllers/MutiaraImageController.php:122
 * @route '/mutiara-images/{mutiara_image}'
 */
    const destroyForm = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MutiaraImageController::destroy
 * @see app/Http/Controllers/MutiaraImageController.php:122
 * @route '/mutiara-images/{mutiara_image}'
 */
        destroyForm.delete = (args: { mutiara_image: number | { id: number } } | [mutiara_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const mutiaraImages = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default mutiaraImages