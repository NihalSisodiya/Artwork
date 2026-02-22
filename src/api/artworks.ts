import axios from "axios";
import type { Artwork } from "../types/Artwork";

export interface ApiResponse{
    data: Artwork[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
        total_pages: number;
        current_page: number;
    };
}

export const fetchArtworks = async(page: number): Promise<ApiResponse> => {
    const response = await axios.get<ApiResponse>(`https://api.artic.edu/api/v1/artworks?page=${page}`);
    return response.data;
}