// React 19 with compiler enabled
import { startTransition, useOptimistic, useState } from 'react';
import { Profiler } from 'react';
// How the compiler works under the hood
// The compiler analyzes your component at build time and automatically
//  wraps values and functions that don't need to change in the equivalent
// of useCallback and useMemo.

function onRender(id: string, phase: 'mount' | 'update' | 'nested-update', actualDuration: number) {
  console.log({ id, phase, actualDuration });
}
// No memo, no useCallback needed — compiler handles it
function TestPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(expensiveData);
  const [optimisticResults, deleteOptimistic] = useOptimistic(results, (state, idToDelete) =>
    state.filter((r) => r.id !== idToDelete),
  );
  const deleteItemFromServer = async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
    console.log(`Deleted item with id: ${id}`);
  };
  const handleDelete = async (id: number) => {
    startTransition(async () => {         // ✅ wrap everything in startTransition
    deleteOptimistic(id);               // optimistic update
    try {
      const updatedResults = await deleteItemFromServer(id); // await server
      setResults((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Delete failed, reverting...', error);
    }
  });
  };

  return (
    <>
      <Profiler id="TestPage" onRender={onRender}>
        <input
          className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ResultList items={optimisticResults} onDelete={handleDelete} />
      </Profiler>
    </>
  );
}

function ResultList({ items, onDelete }: { items: any[]; onDelete: (id: number) => void }) {
   console.log('ResultList rendered'); 
  return items.map((i) => <Row key={i.id} item={i} onDelete={onDelete} />);
}

function Row({ item, onDelete }: { item: any; onDelete: (id: number) => void }) {
  console.log('rendering row', item.id);
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200">
      {item.name}
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onDelete(item.id)}
      >
        Delete
      </button>
    </div>
  );
}

const expensiveData = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}` }));
export default TestPage;

// The key thing to say in an interview is:
// "In React 19, the compiler removes the need for manual memoization,
//  but understanding why memo and useCallback work is still essential" —
// because the compiler isn't available everywhere yet, and you need to debug it when things go wrong.
