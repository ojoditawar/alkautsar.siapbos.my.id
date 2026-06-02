import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FileExplorerController::index
 * @see app/Http/Controllers/FileExplorerController.php:24
 * @route '/file-explorer'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/file-explorer',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FileExplorerController::index
 * @see app/Http/Controllers/FileExplorerController.php:24
 * @route '/file-explorer'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileExplorerController::index
 * @see app/Http/Controllers/FileExplorerController.php:24
 * @route '/file-explorer'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FileExplorerController::index
 * @see app/Http/Controllers/FileExplorerController.php:24
 * @route '/file-explorer'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FileExplorerController::index
 * @see app/Http/Controllers/FileExplorerController.php:24
 * @route '/file-explorer'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FileExplorerController::index
 * @see app/Http/Controllers/FileExplorerController.php:24
 * @route '/file-explorer'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FileExplorerController::index
 * @see app/Http/Controllers/FileExplorerController.php:24
 * @route '/file-explorer'
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
* @see \App\Http\Controllers\FileExplorerController::list
 * @see app/Http/Controllers/FileExplorerController.php:35
 * @route '/file-explorer/list'
 */
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/file-explorer/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FileExplorerController::list
 * @see app/Http/Controllers/FileExplorerController.php:35
 * @route '/file-explorer/list'
 */
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileExplorerController::list
 * @see app/Http/Controllers/FileExplorerController.php:35
 * @route '/file-explorer/list'
 */
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FileExplorerController::list
 * @see app/Http/Controllers/FileExplorerController.php:35
 * @route '/file-explorer/list'
 */
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FileExplorerController::list
 * @see app/Http/Controllers/FileExplorerController.php:35
 * @route '/file-explorer/list'
 */
    const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: list.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FileExplorerController::list
 * @see app/Http/Controllers/FileExplorerController.php:35
 * @route '/file-explorer/list'
 */
        listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FileExplorerController::list
 * @see app/Http/Controllers/FileExplorerController.php:35
 * @route '/file-explorer/list'
 */
        listForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    list.form = listForm
/**
* @see \App\Http\Controllers\FileExplorerController::upload
 * @see app/Http/Controllers/FileExplorerController.php:94
 * @route '/file-explorer/upload'
 */
export const upload = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/file-explorer/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FileExplorerController::upload
 * @see app/Http/Controllers/FileExplorerController.php:94
 * @route '/file-explorer/upload'
 */
upload.url = (options?: RouteQueryOptions) => {
    return upload.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileExplorerController::upload
 * @see app/Http/Controllers/FileExplorerController.php:94
 * @route '/file-explorer/upload'
 */
upload.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FileExplorerController::upload
 * @see app/Http/Controllers/FileExplorerController.php:94
 * @route '/file-explorer/upload'
 */
    const uploadForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: upload.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FileExplorerController::upload
 * @see app/Http/Controllers/FileExplorerController.php:94
 * @route '/file-explorer/upload'
 */
        uploadForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: upload.url(options),
            method: 'post',
        })
    
    upload.form = uploadForm
/**
* @see \App\Http\Controllers\FileExplorerController::download
 * @see app/Http/Controllers/FileExplorerController.php:124
 * @route '/file-explorer/download'
 */
export const download = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/file-explorer/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FileExplorerController::download
 * @see app/Http/Controllers/FileExplorerController.php:124
 * @route '/file-explorer/download'
 */
download.url = (options?: RouteQueryOptions) => {
    return download.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileExplorerController::download
 * @see app/Http/Controllers/FileExplorerController.php:124
 * @route '/file-explorer/download'
 */
download.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FileExplorerController::download
 * @see app/Http/Controllers/FileExplorerController.php:124
 * @route '/file-explorer/download'
 */
download.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FileExplorerController::download
 * @see app/Http/Controllers/FileExplorerController.php:124
 * @route '/file-explorer/download'
 */
    const downloadForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FileExplorerController::download
 * @see app/Http/Controllers/FileExplorerController.php:124
 * @route '/file-explorer/download'
 */
        downloadForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FileExplorerController::download
 * @see app/Http/Controllers/FileExplorerController.php:124
 * @route '/file-explorer/download'
 */
        downloadForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
/**
* @see \App\Http\Controllers\FileExplorerController::rename
 * @see app/Http/Controllers/FileExplorerController.php:141
 * @route '/file-explorer/rename'
 */
export const rename = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rename.url(options),
    method: 'post',
})

rename.definition = {
    methods: ["post"],
    url: '/file-explorer/rename',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FileExplorerController::rename
 * @see app/Http/Controllers/FileExplorerController.php:141
 * @route '/file-explorer/rename'
 */
rename.url = (options?: RouteQueryOptions) => {
    return rename.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileExplorerController::rename
 * @see app/Http/Controllers/FileExplorerController.php:141
 * @route '/file-explorer/rename'
 */
rename.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rename.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FileExplorerController::rename
 * @see app/Http/Controllers/FileExplorerController.php:141
 * @route '/file-explorer/rename'
 */
    const renameForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rename.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FileExplorerController::rename
 * @see app/Http/Controllers/FileExplorerController.php:141
 * @route '/file-explorer/rename'
 */
        renameForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rename.url(options),
            method: 'post',
        })
    
    rename.form = renameForm
/**
* @see \App\Http\Controllers\FileExplorerController::deleteMethod
 * @see app/Http/Controllers/FileExplorerController.php:174
 * @route '/file-explorer/delete'
 */
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/file-explorer/delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FileExplorerController::deleteMethod
 * @see app/Http/Controllers/FileExplorerController.php:174
 * @route '/file-explorer/delete'
 */
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileExplorerController::deleteMethod
 * @see app/Http/Controllers/FileExplorerController.php:174
 * @route '/file-explorer/delete'
 */
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FileExplorerController::deleteMethod
 * @see app/Http/Controllers/FileExplorerController.php:174
 * @route '/file-explorer/delete'
 */
    const deleteMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteMethod.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FileExplorerController::deleteMethod
 * @see app/Http/Controllers/FileExplorerController.php:174
 * @route '/file-explorer/delete'
 */
        deleteMethodForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteMethod.form = deleteMethodForm
/**
* @see \App\Http\Controllers\FileExplorerController::createFolder
 * @see app/Http/Controllers/FileExplorerController.php:204
 * @route '/file-explorer/create-folder'
 */
export const createFolder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createFolder.url(options),
    method: 'post',
})

createFolder.definition = {
    methods: ["post"],
    url: '/file-explorer/create-folder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FileExplorerController::createFolder
 * @see app/Http/Controllers/FileExplorerController.php:204
 * @route '/file-explorer/create-folder'
 */
createFolder.url = (options?: RouteQueryOptions) => {
    return createFolder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileExplorerController::createFolder
 * @see app/Http/Controllers/FileExplorerController.php:204
 * @route '/file-explorer/create-folder'
 */
createFolder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createFolder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FileExplorerController::createFolder
 * @see app/Http/Controllers/FileExplorerController.php:204
 * @route '/file-explorer/create-folder'
 */
    const createFolderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: createFolder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FileExplorerController::createFolder
 * @see app/Http/Controllers/FileExplorerController.php:204
 * @route '/file-explorer/create-folder'
 */
        createFolderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: createFolder.url(options),
            method: 'post',
        })
    
    createFolder.form = createFolderForm
/**
* @see \App\Http\Controllers\FileExplorerController::read
 * @see app/Http/Controllers/FileExplorerController.php:233
 * @route '/file-explorer/read'
 */
export const read = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: read.url(options),
    method: 'get',
})

read.definition = {
    methods: ["get","head"],
    url: '/file-explorer/read',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FileExplorerController::read
 * @see app/Http/Controllers/FileExplorerController.php:233
 * @route '/file-explorer/read'
 */
read.url = (options?: RouteQueryOptions) => {
    return read.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileExplorerController::read
 * @see app/Http/Controllers/FileExplorerController.php:233
 * @route '/file-explorer/read'
 */
read.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: read.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FileExplorerController::read
 * @see app/Http/Controllers/FileExplorerController.php:233
 * @route '/file-explorer/read'
 */
read.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: read.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FileExplorerController::read
 * @see app/Http/Controllers/FileExplorerController.php:233
 * @route '/file-explorer/read'
 */
    const readForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: read.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FileExplorerController::read
 * @see app/Http/Controllers/FileExplorerController.php:233
 * @route '/file-explorer/read'
 */
        readForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: read.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FileExplorerController::read
 * @see app/Http/Controllers/FileExplorerController.php:233
 * @route '/file-explorer/read'
 */
        readForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: read.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    read.form = readForm
/**
* @see \App\Http\Controllers\FileExplorerController::save
 * @see app/Http/Controllers/FileExplorerController.php:297
 * @route '/file-explorer/save'
 */
export const save = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(options),
    method: 'post',
})

save.definition = {
    methods: ["post"],
    url: '/file-explorer/save',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FileExplorerController::save
 * @see app/Http/Controllers/FileExplorerController.php:297
 * @route '/file-explorer/save'
 */
save.url = (options?: RouteQueryOptions) => {
    return save.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileExplorerController::save
 * @see app/Http/Controllers/FileExplorerController.php:297
 * @route '/file-explorer/save'
 */
save.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FileExplorerController::save
 * @see app/Http/Controllers/FileExplorerController.php:297
 * @route '/file-explorer/save'
 */
    const saveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: save.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FileExplorerController::save
 * @see app/Http/Controllers/FileExplorerController.php:297
 * @route '/file-explorer/save'
 */
        saveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: save.url(options),
            method: 'post',
        })
    
    save.form = saveForm
const FileExplorerController = { index, list, upload, download, rename, deleteMethod, createFolder, read, save, delete: deleteMethod }

export default FileExplorerController