import { useState } from 'react';
import { useLeaderboardStore } from '@/store/leaderboard';

export function FilterControls() {
  const {
    privateIds,
    excludedIds,
    setPrivateIds,
    setExcludedIds,
    fetch: refetch,
  } = useLeaderboardStore();

  const [open, setOpen] = useState(false);
  const [localPrivate, setLocalPrivate] = useState(privateIds);
  const [localExcluded, setLocalExcluded] = useState(excludedIds);

  const handleApply = () => {
    setPrivateIds(localPrivate);
    setExcludedIds(localExcluded);
    refetch();
  };

  return (
    <div className="mb-6">
      <button
        className="btn text-xs"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Hide Filters' : 'Filters'}
      </button>

      {open && (
        <div className="mt-3 rounded-xl border border-[var(--brand-purple-medium)]/30 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--color-scheme-1--text)]">
                Private X User IDs
              </label>
              <textarea
                className="form_input min-h-[60px]"
                placeholder="Comma-separated IDs to show only these users"
                value={localPrivate}
                onChange={(e) => setLocalPrivate(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--color-scheme-1--text)]">
                Excluded User IDs
              </label>
              <textarea
                className="form_input min-h-[60px]"
                placeholder="Comma-separated IDs to hide from results"
                value={localExcluded}
                onChange={(e) => setLocalExcluded(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button className="btn btn-active" onClick={handleApply}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
