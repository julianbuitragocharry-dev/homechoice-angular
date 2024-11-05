export interface LoginRequest {
    username: string;
    password: string;
}
  
export interface AuthResponse {
    token: string;
}
  
export interface TokenRequest {
    token: string;
}