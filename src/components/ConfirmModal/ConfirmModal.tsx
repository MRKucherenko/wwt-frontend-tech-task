type Props = {
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({onConfirm, onCancel}: Props) {
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">
          <div className="flex items-center">
            <h2 className="mx-auto text-center text-lg font-semibold mb-10">Do you want to apply new filter</h2>
            <button
              className="text-2xl bg-transparent border-0"
              onClick={onCancel}
            >
              ✖
            </button>
          </div>

          <div className="flex gap-5">
             <button onClick={onCancel} className="w-[280px] h-[64px] rounded-2xl border border-gray-300 bg-white">Use old filter</button>
            <button onClick={onConfirm} className="w-[280px] h-[64px] rounded-2xl border border-gray-300 bg-orange-500 text-white">Apply new filter</button>
          </div>
        </div>
      </div>
    </>
  );
}
