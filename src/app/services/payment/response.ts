
export interface ErrorContent {
    content: string
}

export interface ApiError {
    status: Number,
    content: any 
}

export type ApiResponse<T> = T | ApiError