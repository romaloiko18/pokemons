import axios from 'axios';

class AuthService {
  protected get headers(): { headers: { [key: string]: string } } {
    return {
      headers: {
        Accept: 'application/json'
      }
    };
  }

  public setToken(appToken: string): void {
    localStorage.setItem('diploma-token', JSON.stringify(appToken));
  }

  public getToken(): string {
    try {
      if (typeof window === 'undefined') return '';

      const token = localStorage.getItem('diploma-token');

      return token && JSON.parse(token);
    } catch {
      return '';
    }
  }

  public removeToken(): void {
    localStorage.removeItem('diploma-token');
  }

  public async post(route: string, data: object) {
    const url: string = process.env.NEXT_PUBLIC_CALCULATOR_API || '';
    return await axios.post(`${url}${route}`, data, {
      headers: { ...this.headers.headers }
    });
  }
}

export const authService = new AuthService();
