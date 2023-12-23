export interface FileType {
    fileId: string;//use for query with database
    type: 'file';
}

export interface FolderType {
    name: string;
    type: 'folder',
    children: FileSystemNode[];
    expanded?:boolean;
}

type FileSystemNode = FileType | FolderType;