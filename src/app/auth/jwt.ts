export interface LoginRequest {
    username: string;
    password: string;
}
  
export interface AuthResponse {
    token: string;
    user: string;
}
  
export interface TokenRequest {
    token: string;
}