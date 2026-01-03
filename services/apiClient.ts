
export const API_DELAY = 800;

class ApiClient {
  private async simulateNetwork() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Giả lập lỗi hệ thống ngẫu nhiên 2%
        if (Math.random() < 0.02) reject(new Error("Internal Server Error"));
        else resolve(true);
      }, API_DELAY);
    });
  }

  async get<T>(service: string, endpoint: string): Promise<T> {
    console.debug(`[${service.toUpperCase()}] GET request to ${endpoint}`);
    await this.simulateNetwork();
    const data = localStorage.getItem(`app_${endpoint}`);
    return data ? JSON.parse(data) : null;
  }

  async post<T>(service: string, endpoint: string, body: any): Promise<T> {
    console.debug(`[${service.toUpperCase()}] POST request to ${endpoint}`, body);
    await this.simulateNetwork();
    return body as T;
  }

  async patch<T>(service: string, endpoint: string, body: any): Promise<T> {
    console.debug(`[${service.toUpperCase()}] PATCH request to ${endpoint}`, body);
    await this.simulateNetwork();
    return body as T;
  }

  async delete(service: string, endpoint: string): Promise<void> {
    console.debug(`[${service.toUpperCase()}] DELETE request to ${endpoint}`);
    await this.simulateNetwork();
  }
}

export const apiClient = new ApiClient();
