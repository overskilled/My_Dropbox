import { create } from 'zustand';

const useFileStore = create((set) => ({
    files: [],
    createFile: (file) => set((state) => ({ files: [file, ...state.files] })),
    deleteFile: (id) => set((state) => ({ files: state.files.filter((file) => file.id !== id) })), // Ensure function is named correctly
    setFiles: (files) => set({ files }),
}));

export default useFileStore;
