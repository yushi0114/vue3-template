import { FILE_TYPE, FILE_SIZE_ENUMS } from '@/enums';
export const CHILDREN = 'children';
export const CHILD = 'child';
export const PARENT = 'parent';
export const ID = 'id';
export const PID = 'parentId';

export const FILE_TYPE_LIMIT_MAP = {
    [FILE_TYPE.VIDEO]: FILE_SIZE_ENUMS.VIDEO_SIZE_LIMIT,
    [FILE_TYPE.IMAGE]: FILE_SIZE_ENUMS.IMAGE_SIZE_LIMIT,
    [FILE_TYPE.FILE]: FILE_SIZE_ENUMS.FILE_SIZE_LIMIT,
};

export const FILE_TYPE_NAME_MAP = {
    [FILE_TYPE.VIDEO]: '视频',
    [FILE_TYPE.IMAGE]: '图片',
    [FILE_TYPE.FILE]: '文件',
};

export const FILE_TYPE_ERROR_MAP = {
    [FILE_TYPE.VIDEO]: '视频只支持mp4、avi、wmv或mpeg格式',
    [FILE_TYPE.IMAGE]: '图片只支持png、jpeg或jpg格式',
    [FILE_TYPE.FILE]: '文件只支持xls、xlsx、doc、docx、txt、pdf、ppt、zip或rar格式',
};

export const FILE_SIZE_ERROR_MAP = {
    [FILE_TYPE.VIDEO]: `视频大小不能超过${FILE_SIZE_ENUMS.VIDEO_SIZE_LIMIT / 1024 / 1024}MB`,
    [FILE_TYPE.IMAGE]: `图片文件大小不能超过${FILE_SIZE_ENUMS.IMAGE_SIZE_LIMIT / 1024 / 1024}MB`,
    [FILE_TYPE.FILE]: `文件大小不能超过${FILE_SIZE_ENUMS.FILE_SIZE_LIMIT / 1024 / 1024}MB`,
};
