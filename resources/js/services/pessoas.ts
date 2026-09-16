export type DocenteGrupo = 'principal' | 'apoio';

export interface Docente {
    id: number;
    nome: string;
    email: string;
    grupo: DocenteGrupo;
    ordem: number;
}

export interface Discente {
    id: number;
    nome: string;
    ordem: number;
}

export interface TurmaDiscentes {
    id: number;
    ano: number;
    discentes: Discente[];
}

const apiBaseUrl = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

async function requestJson<T>(path: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(`${apiBaseUrl}${path}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        signal,
    });

    if (!response.ok) {
        throw new Error(`Falha ao carregar ${path}: HTTP ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export function getDocentes(signal?: AbortSignal): Promise<Docente[]> {
    return requestJson<Docente[]>('/api/docentes', signal);
}

export function getTurmasDiscentes(signal?: AbortSignal): Promise<TurmaDiscentes[]> {
    return requestJson<TurmaDiscentes[]>('/api/discentes/turmas', signal);
}
