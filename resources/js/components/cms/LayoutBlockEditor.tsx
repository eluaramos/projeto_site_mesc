import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { type PortalItem, type PortalVariant } from '../PortalBlocks';

export const iconLabels: Record<string, string> = {
    '': 'Sem ícone',
    book: 'Livro',
    target: 'Objetivo',
    lightbulb: 'Inovação',
    graduation: 'Formação',
    flask: 'Laboratório',
    briefcase: 'Trabalho',
    users: 'Pessoas',
    search: 'Pesquisa',
};
export function initialLayoutItems(): PortalItem[] {
    return [{ title: '', text: '', image: '', alt: '', url: '', button: '', icon: '', value: '' }];
}
export default function LayoutBlockEditor({
    type,
    items,
    title,
    columns,
    id,
    onChange,
}: {
    type: PortalVariant;
    items: PortalItem[];
    title?: string;
    columns?: number;
    id: number;
    onChange: (change: { items?: PortalItem[]; title?: string; columns?: number }) => void;
}) {
    const single = type === 'card' || type === 'banner';
    const stats = type === 'stats';
    const hero = type === 'banner' || type === 'carousel';
    const limit = type === 'carousel' ? 10 : 12;
    function changeItem(index: number, change: Partial<PortalItem>) {
        onChange({ items: items.map((item, i) => (i === index ? { ...item, ...change } : item)) });
    }
    function move(index: number, offset: number) {
        const value = [...items];
        [value[index], value[index + offset]] = [value[index + offset], value[index]];
        onChange({ items: value });
    }
    return (
        <div className="space-y-5">
            {!single && (
                <div>
                    <label htmlFor={'layout-title-' + id}>Título da seção (opcional)</label>
                    <input id={'layout-title-' + id} value={title ?? ''} maxLength={200} onChange={(e) => onChange({ title: e.target.value })} />
                </div>
            )}
            {type === 'cards' && (
                <div>
                    <label htmlFor={'columns-' + id}>Colunas em telas grandes</label>
                    <select id={'columns-' + id} value={columns ?? 3} onChange={(e) => onChange({ columns: Number(e.target.value) })}>
                        <option value={2}>2 colunas</option>
                        <option value={3}>3 colunas</option>
                        <option value={4}>4 colunas</option>
                    </select>
                    <p className="mt-2 text-xs">A grade se adapta automaticamente ao celular.</p>
                </div>
            )}
            {type === 'carousel' && (
                <p className="text-sm text-[var(--uff-text-muted)]">Carrossel manual: o visitante escolhe quando avançar os slides.</p>
            )}
            {items.map((item, index) => (
                <fieldset key={index} className="space-y-3 rounded border border-[var(--uff-border)] p-4">
                    <legend className="px-2 text-sm font-semibold">
                        {type === 'carousel' ? 'Slide' : stats ? 'Indicador' : 'Card'} {index + 1}
                    </legend>
                    <div>
                        <label htmlFor={id + '-title-' + index}>{stats ? 'Rótulo do indicador' : 'Título'}</label>
                        <input
                            id={id + '-title-' + index}
                            value={item.title}
                            maxLength={200}
                            onChange={(e) => changeItem(index, { title: e.target.value })}
                        />
                    </div>
                    {stats ? (
                        <div>
                            <label htmlFor={id + '-value-' + index}>Valor (ex.: 2026 ou 12)</label>
                            <input
                                id={id + '-value-' + index}
                                maxLength={50}
                                value={item.value ?? ''}
                                onChange={(e) => changeItem(index, { value: e.target.value })}
                            />
                            <p className="mt-2 text-xs">Informe apenas dados institucionais verificados.</p>
                        </div>
                    ) : (
                        <>
                            <div>
                                <label htmlFor={id + '-text-' + index}>Texto{hero ? ' (opcional)' : ''}</label>
                                <textarea
                                    id={id + '-text-' + index}
                                    rows={3}
                                    maxLength={20000}
                                    value={item.text ?? ''}
                                    onChange={(e) => changeItem(index, { text: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor={id + '-image-' + index}>Imagem HTTPS ou /images/...{hero ? ' (obrigatória)' : ' (opcional)'}</label>
                                <input
                                    id={id + '-image-' + index}
                                    value={item.image ?? ''}
                                    onChange={(e) => changeItem(index, { image: e.target.value })}
                                    placeholder="https://"
                                />
                            </div>
                            <div>
                                <label htmlFor={id + '-alt-' + index}>Descrição da imagem (obrigatória quando há imagem)</label>
                                <input
                                    id={id + '-alt-' + index}
                                    value={item.alt ?? ''}
                                    maxLength={1000}
                                    onChange={(e) => changeItem(index, { alt: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor={id + '-url-' + index}>Link HTTPS ou caminho interno (opcional)</label>
                                <input
                                    id={id + '-url-' + index}
                                    value={item.url ?? ''}
                                    onChange={(e) => changeItem(index, { url: e.target.value })}
                                    placeholder="/sobre"
                                />
                            </div>
                            <div>
                                <label htmlFor={id + '-button-' + index}>
                                    Texto do botão/link{hero ? ' (obrigatório quando há link)' : ' (opcional)'}
                                </label>
                                <input
                                    id={id + '-button-' + index}
                                    value={item.button ?? ''}
                                    maxLength={200}
                                    onChange={(e) => changeItem(index, { button: e.target.value })}
                                />
                            </div>
                            {!hero && (
                                <div>
                                    <label htmlFor={id + '-icon-' + index}>Ícone</label>
                                    <select
                                        id={id + '-icon-' + index}
                                        value={item.icon ?? ''}
                                        onChange={(e) => changeItem(index, { icon: e.target.value })}
                                    >
                                        {Object.entries(iconLabels).map(([value, label]) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </>
                    )}
                    {!single && (
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="cms-secondary"
                                disabled={index === 0}
                                aria-label={'Mover item ' + (index + 1) + ' para cima'}
                                onClick={() => move(index, -1)}
                            >
                                <ArrowUp size={16} />
                            </button>
                            <button
                                type="button"
                                className="cms-secondary"
                                disabled={index === items.length - 1}
                                aria-label={'Mover item ' + (index + 1) + ' para baixo'}
                                onClick={() => move(index, 1)}
                            >
                                <ArrowDown size={16} />
                            </button>
                            <button
                                type="button"
                                className="cms-secondary"
                                aria-label={'Remover item ' + (index + 1)}
                                disabled={items.length === 1}
                                onClick={() => onChange({ items: items.filter((_, i) => i !== index) })}
                            >
                                <Trash2 size={16} />
                                Remover
                            </button>
                        </div>
                    )}
                </fieldset>
            ))}
            {!single && (
                <button
                    type="button"
                    className="cms-secondary"
                    disabled={items.length >= limit}
                    onClick={() => onChange({ items: [...items, ...initialLayoutItems()] })}
                >
                    <Plus size={16} />
                    Adicionar {type === 'carousel' ? 'slide' : stats ? 'indicador' : 'card'}
                </button>
            )}
        </div>
    );
}
