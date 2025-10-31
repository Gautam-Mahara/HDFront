// // services/adventureService.ts
// import type { Adventure, ApiResponse } from '../types/adventure';

// const API_BASE_URL = 'http://localhost:3001/api';

// export const adventureService = {
//   // Get all adventures
//   async getAdventures(): Promise<Adventure[]> {
//     try {
//       const response = await fetch(`${API_BASE_URL}/adventures`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result: ApiResponse<Adventure[]> = await response.json();
      
//       if (!result.success) {
//         throw new Error(result.message || 'Failed to fetch adventures');
//       }
      
//       return result.data;
//     } catch (error) {
//       console.error('Error fetching adventures:', error);
//       throw error;
//     }
//   },

//   // Get adventure by ID
//   async getAdventureById(id: string): Promise<Adventure> {
//     try {
//       const response = await fetch(`${API_BASE_URL}/adventures/${id}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result: ApiResponse<Adventure> = await response.json();
      
//       if (!result.success) {
//         throw new Error(result.message || 'Failed to fetch adventure');
//       }
      
//       return result.data;
//     } catch (error) {
//       console.error(`Error fetching adventure ${id}:`, error);
//       throw error;
//     }
//   },

//   // Search adventures by query
//   async searchAdventures(query: string): Promise<Adventure[]> {
//     try {
//       const response = await fetch(`${API_BASE_URL}/adventures/search?q=${encodeURIComponent(query)}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result: ApiResponse<Adventure[]> = await response.json();
      
//       if (!result.success) {
//         throw new Error(result.message || 'Failed to search adventures');
//       }
      
//       return result.data;
//     } catch (error) {
//       console.error('Error searching adventures:', error);
//       throw error;
//     }
//   }
// };
import type { Adventure } from '../types/adventure';

const API_BASE_URL = 'http://localhost:5000/api'; // Express backend

export const adventureService = {
  getAdventures: async (): Promise<Adventure[]> => {
    const response = await fetch(`${API_BASE_URL}/adventures`);
    if (!response.ok) {
      throw new Error('Failed to fetch adventures');
    }
    const data = await response.json();
    // /logging
    // log response data in a file or external logging service
    console.log(data);
    
    return data;
  },
};
