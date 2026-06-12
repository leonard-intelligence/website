// 01 · GRANDS MODÈLES DE LANGAGE — les cartes logos (un modèle par fournisseur)
// posées sur un champ de beads en phyllotaxie (tournesol) : le motif de
// croissance organique — « l'intelligence se cultive ». Le champ est généré
// par algorithme et réglable en live : DevTools › Vortex › 01 · Modèles.
import { useVortexParams } from '../../dev/vortexParamsStore';
import { VortexBeadLayer } from './VortexBeadLayer';
import { IlluModels } from './IlluModels';

export function IlluModelField() {
    const vortex = useVortexParams('modeles');
    return (
        <div
            className="relative w-full overflow-hidden flex items-center justify-center"
            style={{
                minHeight: 'clamp(420px, 42vw, 520px)',
                padding: 'clamp(28px, 5vw, 64px)',
                borderRadius: 18,
                backgroundColor: '#EEEDE9',
                backgroundImage:
                    'linear-gradient(rgba(23,23,23,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.045) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                boxShadow: 'inset 0 0 0 1px rgba(23,23,23,0.06)',
            }}
        >
            {/* champ vortex — beads échantillonnées dans l'œuvre
                (couche scalée en mobile pour garder le motif entier dans le cadre) */}
            <div
                aria-hidden="true"
                className="absolute inset-0 max-[560px]:scale-[0.62]"
                style={{ transformOrigin: 'center' }}
            >
                <VortexBeadLayer params={vortex} />
            </div>

            {/* cartes logos — un modèle frontier par fournisseur */}
            <div
                className="relative w-full"
                style={{ maxWidth: 660, filter: 'drop-shadow(0 14px 30px rgba(0,0,0,0.12))' }}
            >
                <IlluModels />
            </div>
        </div>
    );
}
