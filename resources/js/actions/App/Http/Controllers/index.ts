import DashboardController from './DashboardController'
import MonitorController from './MonitorController'
import UserController from './UserController'
import MasjidController from './MasjidController'
import ProgramController from './ProgramController'
import KegiatanController from './KegiatanController'
import RekController from './RekController'
import SubRekController from './SubRekController'
import RekeningController from './RekeningController'
import MappingRekeningController from './MappingRekeningController'
import RoleController from './RoleController'
import PermissionController from './PermissionController'
import TrensaksiController from './TrensaksiController'
import LaporanBukuBesarController from './LaporanBukuBesarController'
import LaporanBukuBesarPdfController from './LaporanBukuBesarPdfController'
import LaporanNeracaController from './LaporanNeracaController'
import LaporanNeracaPdfController from './LaporanNeracaPdfController'
import RunningTextController from './RunningTextController'
import KajianController from './KajianController'
import PekurbanController from './PekurbanController'
import PekurbanPdfController from './PekurbanPdfController'
import JadwalImamController from './JadwalImamController'
import JadwalImamPdfController from './JadwalImamPdfController'
import KhotbahController from './KhotbahController'
import Api from './Api'
import MutiaraImageController from './MutiaraImageController'
import ImamMasjidController from './ImamMasjidController'
import MonitorConfigController from './MonitorConfigController'
import ValidasiBukuBesarController from './ValidasiBukuBesarController'
import Settings from './Settings'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
MonitorController: Object.assign(MonitorController, MonitorController),
UserController: Object.assign(UserController, UserController),
MasjidController: Object.assign(MasjidController, MasjidController),
ProgramController: Object.assign(ProgramController, ProgramController),
KegiatanController: Object.assign(KegiatanController, KegiatanController),
RekController: Object.assign(RekController, RekController),
SubRekController: Object.assign(SubRekController, SubRekController),
RekeningController: Object.assign(RekeningController, RekeningController),
MappingRekeningController: Object.assign(MappingRekeningController, MappingRekeningController),
RoleController: Object.assign(RoleController, RoleController),
PermissionController: Object.assign(PermissionController, PermissionController),
TrensaksiController: Object.assign(TrensaksiController, TrensaksiController),
LaporanBukuBesarController: Object.assign(LaporanBukuBesarController, LaporanBukuBesarController),
LaporanBukuBesarPdfController: Object.assign(LaporanBukuBesarPdfController, LaporanBukuBesarPdfController),
LaporanNeracaController: Object.assign(LaporanNeracaController, LaporanNeracaController),
LaporanNeracaPdfController: Object.assign(LaporanNeracaPdfController, LaporanNeracaPdfController),
RunningTextController: Object.assign(RunningTextController, RunningTextController),
KajianController: Object.assign(KajianController, KajianController),
PekurbanController: Object.assign(PekurbanController, PekurbanController),
PekurbanPdfController: Object.assign(PekurbanPdfController, PekurbanPdfController),
JadwalImamController: Object.assign(JadwalImamController, JadwalImamController),
JadwalImamPdfController: Object.assign(JadwalImamPdfController, JadwalImamPdfController),
KhotbahController: Object.assign(KhotbahController, KhotbahController),
Api: Object.assign(Api, Api),
MutiaraImageController: Object.assign(MutiaraImageController, MutiaraImageController),
ImamMasjidController: Object.assign(ImamMasjidController, ImamMasjidController),
MonitorConfigController: Object.assign(MonitorConfigController, MonitorConfigController),
ValidasiBukuBesarController: Object.assign(ValidasiBukuBesarController, ValidasiBukuBesarController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers