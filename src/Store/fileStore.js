import { create } from 'zustand';

const useFileStore = create((set) => ({
    files: [],
	createFile: (file) => set((state) => ({ files: [file, ...state.files] })),
	deleteFile: (id) => set((state) => ({ files: state.files.filter((file) => file.id !== id) })),
	setFiles: (files) => set({ files }),
}))

export default useFileStore;