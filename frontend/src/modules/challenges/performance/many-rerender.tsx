// import React, { memo, useCallback, useState } from 'react';
// import { Profiler } from 'react';

// function onRender(id: string, phase: 'mount' | 'update', actualDuration: number) {
//   console.log({ id, phase, actualDuration });
// }
// function TestPage() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState(expensiveData);
//   /// You are using Memo without usecallback. Using Memo without use call batch is useless. They are paid. When we type in the input, the component re-renders, and in every re-render the child component sees a new handleDelete reference, so it re-renders again. To handle this, we need to put handleDelete in a useCallback hook.
//   /// You also used the functional updater prev => prev.filter(...) inside setResults — this is actually a bonus point in an interview because it means handleDelete doesn't need results in its dependency array. If you had written it like this instead:
//   const handleDelete = useCallback((id) => {
//     setResults((prev) => prev.filter((r) => r.id !== id));
//   }, []);
//   return (
//     <>
//       <Profiler id="SearchPage" onRender={onRender}>
//         <ExplainMemo />
//         <input
//           className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <ResultList items={results} onDelete={handleDelete} />{' '}
//       </Profiler>
//     </>
//   );
// }
// const ResultList = memo(({ items, onDelete }: { items: any[]; onDelete: (id: string) => void }) => {
//   return items.map((i) => <Row key={i.id} item={i} onDelete={onDelete} />);
// });

// const Row = memo(({ item, onDelete }: { item: any; onDelete: (id: string) => void }) => {
//   console.log('rendering row', item.id);
//   return (
//     <div className="flex items-center justify-between p-2 border-b border-gray-200">
//       {item.name}
//       <button
//         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//         onClick={() => onDelete(item.id)}
//       >
//         Delete
//       </button>
//     </div>
//   );
// });
// /// With memo on Row, only the deleted row disappears —
// // all others skip re-rendering because their item and onDelete props haven't changed.

// const expensiveData = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}` }));
// export default TestPage;

// const ExplainMemo = () => {
//   return (
//     <div className="p-2 bg-gray-100 rounded-md">
//       <p className="text-gray-700">
//         Interview bonus point — when does memoization hurt? An interviewer will almost certainly ask
//         this as a follow-up. The answer is: Memoization has a cost — React has to store the previous
//         props and run a comparison on every render. For simple cheap components, that comparison
//         costs more than just re-rendering. Wrong deps array — an incorrect useCallback deps array
//         can cause stale closures (exactly like challenge 1) or prevent updates from happening at
//         all. A good rule of thumb: only memoize when you can measure a real performance problem with
//         the React Profiler — not by instinct.
//       </p>
//       <p className="text-gray-700 mt-2">
//         Modern React advice Do NOT prematurely optimize everything. Use Profiler first. Measure:
//         what is actually slow what re-renders too much Then optimize surgically. A lot of React
//         developers overuse: useMemo useCallback memo without measurable benefit.
//       </p>
//     </div>
//   );
// };
