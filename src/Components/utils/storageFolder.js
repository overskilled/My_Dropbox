export const storageFolder = (fileType) => {
    let folder;

    // Categorize file types into folders
    if (fileType.startsWith('image/')) {
        folder = 'Images/';
    } else if (fileType === 'application/pdf') {
        folder = 'PDF/';
    } else if (fileType.startsWith('video/')) {
        folder = 'Videos/';
    } else if (fileType.startsWith('audio/')) {
        folder = 'Audio/';
    } else if (fileType.startsWith('text/')) {
        folder = 'Text/';
    } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        folder = 'Documents/Word/';
    } else if (fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        folder = 'Documents/Excel/';
    } else if (fileType === 'application/vnd.ms-powerpoint' || fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        folder = 'Documents/PowerPoint/';
    } else if (fileType === 'application/zip' || fileType === 'application/x-rar-compressed') {
        folder = 'Archives/';
    } else {
        folder = 'Others/';
    }

    return folder
}