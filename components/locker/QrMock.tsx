export function QrMock() {
  const blocks = Array.from({ length: 100 });

  const darkIndexes = new Set([
    0, 1, 3, 4, 7, 10, 13, 14, 18, 21, 22, 24, 27, 29, 30, 33, 35, 37, 40, 41,
    42, 44, 45, 48, 50, 52, 55, 57, 58, 60, 63, 66, 68, 70, 71, 74, 77, 80, 82,
    83, 86, 88, 91, 94, 97,
  ]);

  return (
    <div className="grid grid-cols-10 gap-[2px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      {blocks.map((_, index) => (
        <div
          key={index}
          className={`h-2.5 w-2.5 rounded-[2px] ${
            darkIndexes.has(index) ? 'bg-slate-700' : 'bg-slate-100'
          }`}
        />
      ))}
    </div>
  );
}