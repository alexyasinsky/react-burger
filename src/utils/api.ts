type TFetchOptions = {
    method: string;
    headers: {
        [name: string]: string,
    };
    body: string;
} | undefined

type TRefreshData = {
    success: string;
    refreshToken: string;
    accessToken: string;
}

export const  BURGER_API = 'https://norma.nomoreparties.space/api';

const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() as Promise<T> : res.json().then(res => Promise.reject(res.message));
};

export async function makeRequest<T>(url: string, options: TFetchOptions = undefined): Promise<T> {
    const response = await fetch(url, options);
    return checkResponse<T>(response);
}

export async function refreshToken(): Promise<TRefreshData> {
    return await makeRequest<TRefreshData>(`${BURGER_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
}

export const makeRequestWithRefreshToken = async <T>(url: string, options: TFetchOptions): Promise<T> => {
    try {
        return await makeRequest<T>(url, options);
    } catch (err) {
        if (err === "jwt expired" && options) {
            const refreshData= await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            return await makeRequest<T>(url, options);
        } else {
            return Promise.reject(err);
        }
    }
};