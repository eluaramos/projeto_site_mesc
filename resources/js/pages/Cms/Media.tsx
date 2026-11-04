import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import CmsLayout from '../../Layouts/CmsLayout';

type MediaFile = { id: number; uuid: string; title: string; original_name: string; mime: string; size: number };
export default function Media({
    files,
    canUpload,
}: {
    files: { data: MediaFile[]; prev_page_url: string | null; next_page_url: string | null };
    canUpload: boolean;
}) {
    const form = useForm<{ title: string; file: File | null }>({ title: '', file: null });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const element = event.currentTarget;
        form.post('/cms/media', {
            onSuccess: () => {
                form.reset();
                element.reset();
            },
        });
    }

    return (
        <CmsLayout title="Mídia">
            <Link href="/dashboard" className="text-sm underline">
                Voltar ao dashboard
            </Link>
            <h1 className="my-5 text-3xl font-bold">Biblioteca de mídia</h1>
            <p className="mb-6">Os arquivos desta biblioteca são privados.</p>
            {canUpload && (
                <form onSubmit={submit} className="cms-card mb-6 space-y-4 p-6">
                    <div>
                        <label htmlFor="media-title">Título</label>
                        <input
                            id="media-title"
                            required
                            maxLength={200}
                            value={form.data.title}
                            onChange={(event) => form.setData('title', event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="media-file">Arquivo (PDF, JPEG, PNG ou WebP; até 5 MB)</label>
                        <input
                            id="media-file"
                            required
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                            onChange={(event) => form.setData('file', event.target.files?.[0] ?? null)}
                        />
                    </div>
                    {form.hasErrors && (
                        <p role="alert" className="text-red-800">
                            {Object.values(form.errors).join(' ')}
                        </p>
                    )}
                    <button className="cms-primary" disabled={form.processing}>
                        {form.processing ? 'Enviando…' : 'Enviar arquivo'}
                    </button>
                </form>
            )}
            <section className="cms-card p-6">
                <h2 className="mb-3 text-xl font-semibold">Arquivos enviados</h2>
                {files.data.length ? (
                    <ul className="divide-y">
                        {files.data.map((file) => (
                            <li key={file.id} className="py-3">
                                <a className="font-semibold underline" href={'/cms/media/' + file.uuid + '/download'}>
                                    {file.title}
                                </a>
                                <p className="text-sm">
                                    {file.original_name} · {Math.ceil(file.size / 1024)} KB
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum arquivo enviado.</p>
                )}
                <nav className="mt-4 flex gap-4" aria-label="Paginação">
                    {files.prev_page_url && <Link href={files.prev_page_url}>Anterior</Link>}
                    {files.next_page_url && <Link href={files.next_page_url}>Próxima</Link>}
                </nav>
            </section>
        </CmsLayout>
    );
}
