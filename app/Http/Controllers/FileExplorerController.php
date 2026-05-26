<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

class FileExplorerController extends Controller
{
    protected array $hiddenPaths = [
        'vendor',
        'node_modules',
        '.git',
        '.env',
        'bootstrap/cache',
        'storage/framework/cache',
        'storage/logs',
    ];

    /**
     * Display the file explorer page.
     */
    public function index()
    {
        return inertia('FileExplorer/Index', [
            'rootPath' => $this->getRelativePath(base_path()),
            'baseName' => basename(base_path()),
        ]);
    }

    /**
     * List contents of a directory.
     */
    public function list(Request $request)
    {
        $request->validate([
            'path' => 'nullable|string',
        ]);

        $fullPath = $this->resolvePath($request->input('path', ''));
        if (!$fullPath) {
            return response()->json(['error' => 'Invalid path'], 403);
        }

        if (!File::isDirectory($fullPath)) {
            return response()->json(['error' => 'Not a directory'], 400);
        }

        $directories = [];
        $files = [];

        foreach (File::directories($fullPath) as $dir) {
            $relPath = $this->getRelativePath($dir);
            if ($this->isHidden($relPath)) continue;

            $directories[] = [
                'name' => basename($dir),
                'path' => $relPath,
                'type' => 'directory',
                'modified' => date('Y-m-d H:i:s', File::lastModified($dir)),
            ];
        }

        foreach (File::files($fullPath) as $file) {
            $relPath = $this->getRelativePath($file->getPathname());
            if ($this->isHidden($relPath)) continue;

            $files[] = [
                'name' => $file->getFilename(),
                'path' => $relPath,
                'type' => 'file',
                'size' => $file->getSize(),
                'size_formatted' => $this->formatBytes($file->getSize()),
                'extension' => $file->getExtension(),
                'modified' => date('Y-m-d H:i:s', $file->getCTime()),
            ];
        }

        // Sort: directories first, then files, alphabetically
        $items = array_merge($directories, $files);

        return response()->json([
            'items' => $items,
            'currentPath' => $this->getRelativePath($fullPath),
            'parentPath' => $this->getParentPath($fullPath),
            'breadcrumbs' => $this->getBreadcrumbs($fullPath),
        ]);
    }

    /**
     * Upload file(s) to a directory.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'path' => 'nullable|string',
            'files' => 'required|array',
            'files.*' => 'required|file',
        ]);

        $fullPath = $this->resolvePath($request->input('path', ''));
        if (!$fullPath || !File::isDirectory($fullPath)) {
            return response()->json(['error' => 'Invalid directory'], 400);
        }

        $uploaded = [];
        foreach ($request->file('files') as $file) {
            $filename = $file->getClientOriginalName();
            $file->move($fullPath, $filename);
            $uploaded[] = $filename;
        }

        return response()->json([
            'success' => true,
            'uploaded' => $uploaded,
            'message' => count($uploaded) . ' file(s) uploaded',
        ]);
    }

    /**
     * Download a file.
     */
    public function download(Request $request)
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        $fullPath = $this->resolvePath($request->input('path'));
        if (!$fullPath || !File::isFile($fullPath)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        return Response::download($fullPath);
    }

    /**
     * Rename a file or directory.
     */
    public function rename(Request $request)
    {
        $request->validate([
            'path' => 'required|string',
            'newName' => 'required|string|max:255',
        ]);

        $fullPath = $this->resolvePath($request->input('path'));
        if (!$fullPath) {
            return response()->json(['error' => 'Invalid path'], 403);
        }

        if (!File::exists($fullPath)) {
            return response()->json(['error' => 'File/folder not found'], 404);
        }

        $newPath = dirname($fullPath) . '/' . $request->input('newName');

        if (File::exists($newPath)) {
            return response()->json(['error' => 'A file/folder with that name already exists'], 409);
        }

        File::move($fullPath, $newPath);

        return response()->json([
            'success' => true,
            'message' => 'Renamed successfully',
        ]);
    }

    /**
     * Delete a file or directory.
     */
    public function delete(Request $request)
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        $fullPath = $this->resolvePath($request->input('path'));
        if (!$fullPath) {
            return response()->json(['error' => 'Invalid path'], 403);
        }

        if (!File::exists($fullPath)) {
            return response()->json(['error' => 'File/folder not found'], 404);
        }

        if (File::isDirectory($fullPath)) {
            File::deleteDirectory($fullPath);
        } else {
            File::delete($fullPath);
        }

        return response()->json([
            'success' => true,
            'message' => 'Deleted successfully',
        ]);
    }

    /**
     * Create a new directory.
     */
    public function createFolder(Request $request)
    {
        $request->validate([
            'path' => 'nullable|string',
            'name' => 'required|string|max:255|regex:/^[\w\s\-\.]+$/',
        ]);

        $fullPath = $this->resolvePath($request->input('path', ''));
        if (!$fullPath || !File::isDirectory($fullPath)) {
            return response()->json(['error' => 'Invalid directory'], 400);
        }

        $newFolder = $fullPath . '/' . $request->input('name');

        if (File::exists($newFolder)) {
            return response()->json(['error' => 'Folder already exists'], 409);
        }

        File::makeDirectory($newFolder, 0755, true);

        return response()->json([
            'success' => true,
            'message' => 'Folder created',
        ]);
    }

    /**
     * Resolve a relative path to an absolute path, ensuring it's within the project root.
     */
    protected function resolvePath(?string $relativePath): ?string
    {
        $base = base_path();
        if (!$relativePath || $relativePath === '') {
            return $base;
        }

        // Normalize path separators
        $relativePath = str_replace(['\\', '//'], '/', $relativePath);
        $relativePath = ltrim($relativePath, '/');

        $fullPath = realpath($base . '/' . $relativePath);

        // Security: ensure the resolved path is within base_path()
        if (!$fullPath || !str_starts_with($fullPath, $base)) {
            return null;
        }

        return $fullPath;
    }

    /**
     * Get relative path from base_path().
     */
    protected function getRelativePath(string $absolutePath): string
    {
        $base = base_path();
        $relative = str_replace($base, '', $absolutePath);
        return ltrim(str_replace('\\', '/', $relative), '/');
    }

    /**
     * Check if a path should be hidden.
     */
    protected function isHidden(string $relativePath): bool
    {
        foreach ($this->hiddenPaths as $hidden) {
            if (
                $relativePath === $hidden ||
                str_starts_with($relativePath, $hidden . '/') ||
                str_starts_with(basename($relativePath), '.')
            ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get parent path (relative).
     */
    protected function getParentPath(string $fullPath): ?string
    {
        $parent = dirname($fullPath);
        $base = base_path();

        if ($parent === $base || strlen($parent) < strlen($base)) {
            return null; // Already at root
        }

        return $this->getRelativePath($parent);
    }

    /**
     * Get breadcrumbs array.
     */
    protected function getBreadcrumbs(string $fullPath): array
    {
        $base = base_path();
        $crumbs = [];
        $parts = [];

        $rel = str_replace($base, '', $fullPath);
        $rel = trim(str_replace('\\', '/', $rel), '/');

        if (empty($rel)) {
            return [['name' => basename($base), 'path' => '']];
        }

        $segments = explode('/', $rel);
        $current = '';

        // Root
        $crumbs[] = ['name' => basename($base), 'path' => ''];

        foreach ($segments as $seg) {
            $current = ltrim($current . '/' . $seg, '/');
            $crumbs[] = ['name' => $seg, 'path' => $current];
        }

        return $crumbs;
    }

    /**
     * Format bytes to human-readable.
     */
    protected function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $i = 0;
        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }
        return round($bytes, 1) . ' ' . $units[$i];
    }
}
