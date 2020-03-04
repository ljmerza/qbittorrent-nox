

/**
 * groups files by parent folders
 * @param {Object[]} files 
 */
export const groupByFolderPath = files => {
    if (!files) return null;

    const groups = files.reduce((groups, file, idx) => {
        let folders = file.name.split('/');
        const fileName = folders.pop();
        const folderPath = folders.join('/');

        if (!groups[folderPath]) groups[folderPath] = [];
        groups[folderPath].push({ ...file, fileName, folderPath, fileId: idx })

        return groups;
    }, {});

    return Object.entries(groups).reduce((groupArray, [folder, files]) => {
        groupArray.push({ folder: folder || '/', files });
        return groupArray;
    }, []);
}