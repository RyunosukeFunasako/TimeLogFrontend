import { create } from 'zustand'
import { EditedProject } from '../types'

type State = {
  editedProject: EditedProject
  updateEditedProject: (payload: EditedProject) => void
  resetEditedProject: () => void
}

const useStore = create<State>((set) => ({
  editedProject: { id: 0, name: '', description: '' },
  updateEditedProject: (payload) =>
    set({
      editedProject: {
        id: payload.id,
        name: payload.name,
        description: payload.description,
      },
    }),
  resetEditedProject: () =>
    set({ editedProject: { id: 0, name: '', description: '' } }),
}))
export default useStore
