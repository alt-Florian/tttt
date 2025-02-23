import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Tour {
  id: string;
  completed: boolean;
}

interface ToursState {
  tours: Tour[];
  markTourAsCompleted: (tourId: string) => void;
  hasTourBeenCompleted: (tourId: string) => boolean;
}

export const useToursStore = create<ToursState>()(
  persist(
    (set, get) => ({
      tours: [],
      markTourAsCompleted: (tourId: string) => {
        set((state) => ({
          tours: [
            ...state.tours.filter((tour) => tour.id !== tourId),
            { id: tourId, completed: true }
          ]
        }));
      },
      hasTourBeenCompleted: (tourId: string) => {
        return get().tours.some((tour) => tour.id === tourId && tour.completed);
      }
    }),
    {
      name: 'tours-storage'
    }
  )
);
