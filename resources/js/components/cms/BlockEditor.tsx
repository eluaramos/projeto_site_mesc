import { ArrowDown, ArrowUp, Copy, Plus, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { type Block, blockLabels } from './ContentBlocks';

type EditorBlock = Block & { key: number };
function newBlock(type: Block['type']): Block {
    if (type === 'image') return { type, url: '', alt: '', caption: '' };
    if (type === 'link') return { type, text: '', url: '' };
    if (type === 'table')
        return {
            type,
            caption: '',
            rows: [
                ['', ''],
                ['', ''],
            ],
        };
    if (type === 'list') return { type, text: '', ordered: false };
    return { type, text: '' };
}
export default function BlockEditor({ initial, onChange, disabled }: { initial: Block[]; onChange: (blocks: Block[]) => void; disabled: boolean }) {
    const nextKey = useRef(initial.length);
    const [blocks, setBlocks] = useState<EditorBlock[]>(() => initial.map((block, key) => ({ ...block, key })));
    const [addType, setAddType] = useState<Block['type']>('paragraph');
    const focusKey = useRef<number | null>(null);
    function commit(value: EditorBlock[]) {
        setBlocks(value);
        onChange(
            value.map((item) => {
                const block: Block & { key?: number } = { ...item };
                delete block.key;
                return block;
            }),
        );
    }
    function update(key: number, change: Partial<Block>) {
        commit(blocks.map((block) => (block.key === key ? { ...block, ...change } : block)));
    }
    function add(type: Block['type']) {
        const key = nextKey.current++;
        focusKey.current = key;
        commit([...blocks, { ...newBlock(type), key }]);
    }
    function move(index: number, offset: number) {
        const value = [...blocks];
        [value[index], value[index + offset]] = [value[index + offset], value[index]];
        commit(value);
    }
    return (
        <fieldset disabled={disabled} className="space-y-4">
            <legend className="sr-only">Editor de conteúdo</legend>
            {blocks.map((block, index) => (
                <section key={block.key} className="cms-card overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--uff-border)] bg-[var(--uff-light-gray)] px-4 py-2">
                        <h3 className="text-sm font-semibold">
                            <span className="mr-2 text-[var(--uff-text-muted)]">{String(index + 1).padStart(2, '0')}</span>
                            {blockLabels[block.type]}
                        </h3>
                        <div className="flex gap-1">
                            <button
                                type="button"
                                disabled={disabled || index === 0}
                                onClick={() => move(index, -1)}
                                className="rounded p-2 hover:bg-slate-200"
                                aria-label={'Mover bloco ' + (index + 1) + ' para cima'}
                            >
                                <ArrowUp size={16} />
                            </button>
                            <button
                                type="button"
                                disabled={disabled || index === blocks.length - 1}
                                onClick={() => move(index, 1)}
                                className="rounded p-2 hover:bg-slate-200"
                                aria-label={'Mover bloco ' + (index + 1) + ' para baixo'}
                            >
                                <ArrowDown size={16} />
                            </button>
                            <button
                                type="button"
                                disabled={disabled || blocks.length >= 100}
                                onClick={() => {
                                    const value = [...blocks];
                                    value.splice(index + 1, 0, { ...structuredClone(block), key: nextKey.current++ });
                                    commit(value);
                                }}
                                className="rounded p-2 hover:bg-slate-200"
                                aria-label={'Duplicar bloco ' + (index + 1)}
                            >
                                <Copy size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => commit(blocks.filter((item) => item.key !== block.key))}
                                className="rounded p-2 text-red-700 hover:bg-red-50"
                                aria-label={'Remover bloco ' + (index + 1)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4 p-5">
                        {['paragraph', 'heading', 'quote', 'list', 'link'].includes(block.type) && (
                            <div>
                                <label htmlFor={'text-' + block.key}>
                                    {block.type === 'list' ? 'Itens da lista (um por linha)' : block.type === 'link' ? 'Texto do link' : 'Texto'}
                                </label>
                                <textarea
                                    id={'text-' + block.key}
                                    ref={(element) => {
                                        if (element && focusKey.current === block.key) {
                                            element.focus();
                                            focusKey.current = null;
                                        }
                                    }}
                                    rows={block.type === 'heading' || block.type === 'link' ? 1 : 4}
                                    value={block.text ?? ''}
                                    onChange={(e) => update(block.key, { text: e.target.value })}
                                    placeholder={block.type === 'heading' ? 'Digite um subtítulo…' : 'Escreva aqui…'}
                                    maxLength={20000}
                                />
                            </div>
                        )}
                        {block.type === 'list' && (
                            <label className="flex! items-center gap-2">
                                <input type="checkbox" checked={!!block.ordered} onChange={(e) => update(block.key, { ordered: e.target.checked })} />
                                Lista numerada
                            </label>
                        )}
                        {(block.type === 'link' || block.type === 'image') && (
                            <div>
                                <label htmlFor={'url-' + block.key}>
                                    {block.type === 'image' ? 'Endereço HTTPS da imagem' : 'Endereço HTTPS ou caminho interno (/...)'}
                                </label>
                                <input
                                    id={'url-' + block.key}
                                    value={block.url ?? ''}
                                    onChange={(e) => update(block.key, { url: e.target.value })}
                                    placeholder="https://"
                                />
                            </div>
                        )}
                        {block.type === 'image' && (
                            <>
                                <div>
                                    <label htmlFor={'alt-' + block.key}>Descrição da imagem (texto alternativo obrigatório)</label>
                                    <input
                                        id={'alt-' + block.key}
                                        value={block.alt ?? ''}
                                        onChange={(e) => update(block.key, { alt: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={'caption-' + block.key}>Legenda (opcional)</label>
                                    <input
                                        id={'caption-' + block.key}
                                        value={block.caption ?? ''}
                                        onChange={(e) => update(block.key, { caption: e.target.value })}
                                    />
                                </div>
                                <p className="text-xs text-[var(--uff-text-muted)]">
                                    Use uma imagem já hospedada e autorizada para divulgação. A biblioteca de uploads será uma próxima etapa.
                                </p>
                            </>
                        )}
                        {block.type === 'table' && (
                            <>
                                <div>
                                    <label htmlFor={'caption-' + block.key}>Título da tabela</label>
                                    <input
                                        id={'caption-' + block.key}
                                        value={block.caption ?? ''}
                                        onChange={(e) => update(block.key, { caption: e.target.value })}
                                    />
                                </div>
                                <p className="text-xs text-[var(--uff-text-muted)]">A primeira linha contém os cabeçalhos das colunas.</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <tbody>
                                            {block.rows?.map((row, ri) => (
                                                <tr key={ri}>
                                                    {row.map((cell, ci) => (
                                                        <td key={ci} className="min-w-36 p-1">
                                                            <input
                                                                aria-label={'Bloco ' + (index + 1) + ', linha ' + (ri + 1) + ', coluna ' + (ci + 1)}
                                                                value={cell}
                                                                onChange={(e) =>
                                                                    update(block.key, {
                                                                        rows: block.rows!.map((r, rj) =>
                                                                            rj === ri ? r.map((c, cj) => (cj === ci ? e.target.value : c)) : r,
                                                                        ),
                                                                    })
                                                                }
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        className="cms-secondary"
                                        disabled={(block.rows?.length ?? 0) >= 30}
                                        onClick={() => update(block.key, { rows: [...block.rows!, block.rows![0].map(() => '')] })}
                                    >
                                        + Linha
                                    </button>
                                    <button
                                        type="button"
                                        className="cms-secondary"
                                        disabled={(block.rows?.[0].length ?? 0) >= 8}
                                        onClick={() => update(block.key, { rows: block.rows!.map((row) => [...row, '']) })}
                                    >
                                        + Coluna
                                    </button>
                                    <button
                                        type="button"
                                        className="cms-secondary"
                                        disabled={(block.rows?.length ?? 0) <= 2}
                                        onClick={() => update(block.key, { rows: block.rows!.slice(0, -1) })}
                                    >
                                        Remover última linha
                                    </button>
                                    <button
                                        type="button"
                                        className="cms-secondary"
                                        disabled={(block.rows?.[0].length ?? 0) <= 1}
                                        onClick={() => update(block.key, { rows: block.rows!.map((row) => row.slice(0, -1)) })}
                                    >
                                        Remover última coluna
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            ))}
            {!blocks.length && (
                <p className="cms-card p-8 text-center text-[var(--uff-text-muted)]">Sua página está em branco. Adicione o primeiro bloco abaixo.</p>
            )}
            {!disabled && (
                <div className="flex flex-wrap items-end gap-3 rounded-xl border-2 border-dashed border-[var(--uff-border)] p-5">
                    <div className="min-w-44 flex-1">
                        <label htmlFor="block-type">Adicionar conteúdo</label>
                        <select id="block-type" value={addType} onChange={(e) => setAddType(e.target.value as Block['type'])}>
                            {Object.entries(blockLabels).map(([type, label]) => (
                                <option key={type} value={type}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="button" className="cms-secondary" disabled={blocks.length >= 100} onClick={() => add(addType)}>
                        <Plus size={16} />
                        Adicionar bloco
                    </button>
                </div>
            )}
        </fieldset>
    );
}
