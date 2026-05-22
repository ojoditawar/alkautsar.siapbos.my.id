import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RekController::printPdf
 * @see app/Http/Controllers/RekController.php:63
 * @route '/reks/print-pdf'
 */
export const printPdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: printPdf.url(options),
    method: 'get',
})

printPdf.definition = {
    methods: ["get","head"],
    url: '/reks/print-pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RekController::printPdf
 * @see app/Http/Controllers/RekController.php:63
 * @route '/reks/print-pdf'
 */
printPdf.url = (options?: RouteQueryOptions) => {
    return printPdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RekController::printPdf
 * @see app/Http/Controllers/RekController.php:63
 * @route '/reks/print-pdf'
 */
printPdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: printPdf.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RekController::printPdf
 * @see app/Http/Controllers/RekController.php:63
 * @route '/reks/print-pdf'
 */
printPdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: printPdf.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RekController::printPdf
 * @see app/Http/Controllers/RekController.php:63
 * @route '/reks/print-pdf'
 */
    const printPdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: printPdf.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RekController::printPdf
 * @see app/Http/Controllers/RekController.php:63
 * @route '/reks/print-pdf'
 */
        printPdfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: printPdf.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RekController::printPdf
 * @see app/Http/Controllers/RekController.php:63
 * @route '/reks/print-pdf'
 */
        printPdfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: printPdf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    printPdf.form = printPdfForm
/**
* @see \App\Http\Controllers\RekController::index
 * @see app/Http/Controllers/RekController.php:15
 * @route '/reks'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/reks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RekController::index
 * @see app/Http/Controllers/RekController.php:15
 * @route '/reks'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RekController::index
 * @see app/Http/Controllers/RekController.php:15
 * @route '/reks'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RekController::index
 * @see app/Http/Controllers/RekController.php:15
 * @route '/reks'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RekController::index
 * @see app/Http/Controllers/RekController.php:15
 * @route '/reks'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RekController::index
 * @see app/Http/Controllers/RekController.php:15
 * @route '/reks'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RekController::index
 * @see app/Http/Controllers/RekController.php:15
 * @route '/reks'
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
* @see \App\Http\Controllers\RekController::create
 * @see app/Http/Controllers/RekController.php:24
 * @route '/reks/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/reks/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RekController::create
 * @see app/Http/Controllers/RekController.php:24
 * @route '/reks/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RekController::create
 * @see app/Http/Controllers/RekController.php:24
 * @route '/reks/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RekController::create
 * @see app/Http/Controllers/RekController.php:24
 * @route '/reks/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RekController::create
 * @see app/Http/Controllers/RekController.php:24
 * @route '/reks/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RekController::create
 * @see app/Http/Controllers/RekController.php:24
 * @route '/reks/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RekController::create
 * @see app/Http/Controllers/RekController.php:24
 * @route '/reks/create'
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
* @see \App\Http\Controllers\RekController::store
 * @see app/Http/Controllers/RekController.php:29
 * @route '/reks'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/reks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RekController::store
 * @see app/Http/Controllers/RekController.php:29
 * @route '/reks'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RekController::store
 * @see app/Http/Controllers/RekController.php:29
 * @route '/reks'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RekController::store
 * @see app/Http/Controllers/RekController.php:29
 * @route '/reks'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RekController::store
 * @see app/Http/Controllers/RekController.php:29
 * @route '/reks'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RekController::edit
 * @see app/Http/Controllers/RekController.php:43
 * @route '/reks/{rek}/edit'
 */
export const edit = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/reks/{rek}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RekController::edit
 * @see app/Http/Controllers/RekController.php:43
 * @route '/reks/{rek}/edit'
 */
edit.url = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rek: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'kode' in args) {
            args = { rek: args.kode }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rek: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rek: typeof args.rek === 'object'
                ? args.rek.kode
                : args.rek,
                }

    return edit.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RekController::edit
 * @see app/Http/Controllers/RekController.php:43
 * @route '/reks/{rek}/edit'
 */
edit.get = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RekController::edit
 * @see app/Http/Controllers/RekController.php:43
 * @route '/reks/{rek}/edit'
 */
edit.head = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RekController::edit
 * @see app/Http/Controllers/RekController.php:43
 * @route '/reks/{rek}/edit'
 */
    const editForm = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RekController::edit
 * @see app/Http/Controllers/RekController.php:43
 * @route '/reks/{rek}/edit'
 */
        editForm.get = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RekController::edit
 * @see app/Http/Controllers/RekController.php:43
 * @route '/reks/{rek}/edit'
 */
        editForm.head = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\RekController::update
 * @see app/Http/Controllers/RekController.php:50
 * @route '/reks/{rek}'
 */
export const update = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/reks/{rek}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RekController::update
 * @see app/Http/Controllers/RekController.php:50
 * @route '/reks/{rek}'
 */
update.url = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rek: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'kode' in args) {
            args = { rek: args.kode }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rek: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rek: typeof args.rek === 'object'
                ? args.rek.kode
                : args.rek,
                }

    return update.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RekController::update
 * @see app/Http/Controllers/RekController.php:50
 * @route '/reks/{rek}'
 */
update.put = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\RekController::update
 * @see app/Http/Controllers/RekController.php:50
 * @route '/reks/{rek}'
 */
update.patch = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\RekController::update
 * @see app/Http/Controllers/RekController.php:50
 * @route '/reks/{rek}'
 */
    const updateForm = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RekController::update
 * @see app/Http/Controllers/RekController.php:50
 * @route '/reks/{rek}'
 */
        updateForm.put = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\RekController::update
 * @see app/Http/Controllers/RekController.php:50
 * @route '/reks/{rek}'
 */
        updateForm.patch = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\RekController::destroy
 * @see app/Http/Controllers/RekController.php:81
 * @route '/reks/{rek}'
 */
export const destroy = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/reks/{rek}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RekController::destroy
 * @see app/Http/Controllers/RekController.php:81
 * @route '/reks/{rek}'
 */
destroy.url = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rek: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'kode' in args) {
            args = { rek: args.kode }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rek: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rek: typeof args.rek === 'object'
                ? args.rek.kode
                : args.rek,
                }

    return destroy.definition.url
            .replace('{rek}', parsedArgs.rek.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RekController::destroy
 * @see app/Http/Controllers/RekController.php:81
 * @route '/reks/{rek}'
 */
destroy.delete = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RekController::destroy
 * @see app/Http/Controllers/RekController.php:81
 * @route '/reks/{rek}'
 */
    const destroyForm = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RekController::destroy
 * @see app/Http/Controllers/RekController.php:81
 * @route '/reks/{rek}'
 */
        destroyForm.delete = (args: { rek: string | number | { kode: string | number } } | [rek: string | number | { kode: string | number } ] | string | number | { kode: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const RekController = { printPdf, index, create, store, edit, update, destroy }

export default RekController