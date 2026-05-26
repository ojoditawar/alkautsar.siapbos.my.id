<?php

use App\Http\Controllers\Api\HijriHolidayController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MonitorConfigController;
use App\Http\Controllers\MonitorController;
use App\Http\Controllers\KajianController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\MasjidController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\LaporanBukuBesarController;
use App\Http\Controllers\LaporanBukuBesarPdfController;
use App\Http\Controllers\LaporanNeracaController;
use App\Http\Controllers\LaporanNeracaPdfController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RunningTextController;
use App\Http\Controllers\MappingRekeningController;
use App\Http\Controllers\RekController;
use App\Http\Controllers\RekeningController;
use App\Http\Controllers\SubRekController;
use App\Http\Controllers\TrensaksiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ValidasiBukuBesarController;
use App\Http\Controllers\JadwalImamController;
use App\Http\Controllers\JadwalImamPdfController;
use App\Http\Controllers\KhotbahController;
use App\Http\Controllers\KhotbahPdfController;
use App\Http\Controllers\JamaahController;
use App\Http\Controllers\ImamMasjidController;
use App\Http\Controllers\MutiaraImageController;
use App\Http\Controllers\PekurbanController;
use App\Http\Controllers\PekurbanPdfController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'Welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('beranda', [DashboardController::class, 'beranda'])->name('beranda');
    Route::get('monitor', [MonitorController::class, 'index'])->name('monitor');

    Route::middleware('role_or_permission:Admin|manage-users')->group(function () {
        Route::resource('users', UserController::class)->except(['show']);
    });

    Route::middleware('role_or_permission:Admin|manage-masjids')->group(function () {
        Route::resource('masjids', MasjidController::class)->except(['show']);
    });

    Route::middleware('role_or_permission:Admin|manage-programs')->group(function () {
        Route::resource('programs', ProgramController::class)->except(['show']);
        Route::resource('programs.kegiatans', KegiatanController::class)->except(['show']);
    });

    Route::middleware('role_or_permission:Admin|manage-reks')->group(function () {
        Route::get('reks/print-pdf', [RekController::class, 'printPdf'])->name('reks.print-pdf');
        Route::resource('reks', RekController::class)->except(['show']);
        Route::resource('reks.sub-reks', SubRekController::class)->except(['show'])->parameters(['sub-reks' => 'subRek']);
        Route::resource('reks.sub-reks.rekenings', RekeningController::class)->except(['show'])->parameters(['sub-reks' => 'subRek']);
        Route::get('mapping-rekenings/{rekening}/edit', [MappingRekeningController::class, 'edit'])->name('mapping-rekenings.edit');
        Route::put('mapping-rekenings/{rekening}', [MappingRekeningController::class, 'update'])->name('mapping-rekenings.update');
    });

    Route::middleware('role_or_permission:Admin|manage-roles')->group(function () {
        Route::resource('roles', RoleController::class)->except(['show']);
    });

    Route::middleware('role_or_permission:Admin|manage-permissions')->group(function () {
        Route::resource('permissions', PermissionController::class)->except(['show']);
    });

    Route::middleware('role_or_permission:Admin|manage-transaksis')->group(function () {
        Route::resource('transaksis', TrensaksiController::class)
            ->parameters(['transaksis' => 'trensaksi'])
            ->except(['show']);
        Route::post('transaksis/{trensaksi}/duplicate', [TrensaksiController::class, 'duplicate'])
            ->name('transaksis.duplicate');
    });

    Route::middleware('role_or_permission:Admin|manage-laporan-buku-besar')->group(function () {
        Route::get('laporan-buku-besar', [LaporanBukuBesarController::class, 'index'])->name('laporan-buku-besar.index');
        Route::get('laporan-buku-besar-pdf', [LaporanBukuBesarPdfController::class, 'generate'])->name('laporan-buku-besar.pdf');
    });
    // Route::middleware('role_or_permission:Admin|manage-laporan-buku-besar')->group(function () {
    //     Route::get('laporan-buku-besar', [LaporanBukuBesarController::class, 'index'])->name('laporan-buku-besar.index');
    //     Route::get('laporan-buku-besar-pdf', [LaporanBukuBesarPdfController::class, 'generate'])->name('laporan-buku-besar.pdf');
    // });

    Route::middleware('role_or_permission:Admin|manage-laporan-neraca')->group(function () {
        Route::get('laporan-neraca', [LaporanNeracaController::class, 'index'])->name('laporan-neraca.index');
        Route::get('laporan-neraca-pdf', [LaporanNeracaPdfController::class, 'generate'])->name('laporan-neraca.pdf');
    });

    Route::middleware('role_or_permission:Admin|manage-running-texts')->group(function () {
        Route::resource('running-texts', RunningTextController::class)
            ->parameters(['running-texts' => 'runningText'])
            ->except(['show']);
    });

    Route::middleware('role_or_permission:Admin|manage-kajians')->group(function () {
        Route::resource('kajians', KajianController::class)->except(['show']);
    });

    Route::middleware('role_or_permission:Admin|manage-pekurbans')->group(function () {
        Route::resource('pekurbans', PekurbanController::class)->except(['show']);
        Route::post('pekurbans/{pekurban}/duplicate', [PekurbanController::class, 'duplicate'])
            ->name('pekurbans.duplicate');
        Route::get('pekurbans-pdf', [PekurbanPdfController::class, 'generate'])->name('pekurbans.pdf');
    });

    Route::middleware('role_or_permission:Admin|manage-jadwal-imams')->group(function () {
        Route::resource('jadwal-imams', JadwalImamController::class)
            ->parameters(['jadwal-imams' => 'jadwalImam'])
            ->except(['show']);
        Route::post('jadwal-imams/{jadwalImam}/duplicate', [JadwalImamController::class, 'duplicate'])
            ->name('jadwal-imams.duplicate');
        Route::get('jadwal-imams-pdf', [JadwalImamPdfController::class, 'generate'])
            ->name('jadwal-imams.pdf');
        Route::get('jadwal-imams-rekap-pdf', [JadwalImamPdfController::class, 'rekap'])
            ->name('jadwal-imams.rekap-pdf');
    });

    Route::middleware('role_or_permission:Admin|manage-jadwal-khotibs')->group(function () {
        Route::resource('khotib-jumat', KhotbahController::class)
            ->parameters(['khotib-jumat' => 'khotbah'])
            ->except(['show']);
        Route::post('khotib-jumat/{khotbah}/duplicate', [KhotbahController::class, 'duplicate'])
            ->name('khotib-jumat.duplicate');
        // Route::get('khotib-jumat-pdf', [KhotbahPdfController::class, 'generate'])
        //     ->name('khotib-jumat.pdf');
        // Route::get('khotib-jumat-rekap-pdf', [KhotbahPdfController::class, 'rekap'])
        //     ->name('khotib-jumat.rekap-pdf');
    });

    Route::middleware('role_or_permission:Admin|manage-hijri-holidays')->group(function () {
        Route::get('hijri-holidays', [HijriHolidayController::class, 'index'])->name('hijri-holidays.index');
        Route::post('hijri-holidays', [HijriHolidayController::class, 'store'])->name('hijri-holidays.store');
        Route::post('hijri-holidays/sync', [HijriHolidayController::class, 'sync'])->name('hijri-holidays.sync');
        Route::delete('hijri-holidays/{holiday}', [HijriHolidayController::class, 'destroy'])->name('hijri-holidays.destroy');
        Route::put('hijri-holidays/{holiday}', [HijriHolidayController::class, 'update'])->name('hijri-holidays.update');
        Route::post('hijri-holidays/{holiday}/duplicate', [HijriHolidayController::class, 'duplicate'])->name('hijri-holidays.duplicate');
    });

    // Monitor Config & Mutiara Images: hanya Admin yang bisa mengakses.
        Route::middleware('role_or_permission:Admin')->group(function () {
            Route::resource('mutiara-images', MutiaraImageController::class)->except(['show']);
            Route::resource('imam-masjids', ImamMasjidController::class)->except(['show'])->parameters(['imam-masjids' => 'imamMasjid']);
            Route::resource('jamaahs', JamaahController::class)->except(['show']);


        Route::get('monitor-config', [MonitorConfigController::class, 'edit'])->name('monitor-config.edit');
        Route::put('monitor-config', [MonitorConfigController::class, 'update'])->name('monitor-config.update');

        // File Explorer
        Route::get('file-explorer', [FileExplorerController::class, 'index'])->name('file-explorer.index');
        Route::get('file-explorer/list', [FileExplorerController::class, 'list'])->name('file-explorer.list');
        Route::post('file-explorer/upload', [FileExplorerController::class, 'upload'])->name('file-explorer.upload');
        Route::get('file-explorer/download', [FileExplorerController::class, 'download'])->name('file-explorer.download');
        Route::post('file-explorer/rename', [FileExplorerController::class, 'rename'])->name('file-explorer.rename');
        Route::delete('file-explorer/delete', [FileExplorerController::class, 'delete'])->name('file-explorer.delete');
        Route::post('file-explorer/create-folder', [FileExplorerController::class, 'createFolder'])->name('file-explorer.create-folder');
    });

    // Validasi / Closing buku besar: hanya Admin yang bisa memproses/membatalkan.
    Route::middleware('role:Admin')->group(function () {
        Route::get('validasi-buku-besar', [ValidasiBukuBesarController::class, 'index'])
            ->name('validasi-buku-besar.index');
        Route::post('validasi-buku-besar/validate', [ValidasiBukuBesarController::class, 'validateTransaksi'])
            ->name('validasi-buku-besar.validate');
        Route::post('validasi-buku-besar/invalidate', [ValidasiBukuBesarController::class, 'invalidateTransaksi'])
            ->name('validasi-buku-besar.invalidate');
    });
});

require __DIR__ . '/settings.php';
