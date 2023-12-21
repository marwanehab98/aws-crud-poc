const ItemCard = ({
    id,
    name,
    price,
    selected,
    handleDelete,
    handleSelect,
}) => {
    return (
        <div
            data-testid="recipe-card"
            className={`relative flex w-full flex-col justify-between rounded-xl ${selected ? 'bg-slate-300' : 'bg-white'
                } bg-clip-border text-gray-700 shadow-md`}
        >
            <div className="p-6">
                <h5 className="text-blue-gray-900 mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
                    {name}
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    {price}
                </p>
            </div>
            <div className="flex flex-row gap-4 p-6 pt-0">
                <button
                    onClick={(e) => handleDelete(e, id)}
                    className="select-none rounded-lg bg-pink-500 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    Delete
                </button>
                <button
                    onClick={(e) => handleSelect(e, id, name, price)}
                    className="select-none rounded-lg bg-pink-500 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    {selected ? 'Unselect' : 'Select'}
                </button>
            </div>
        </div>
    );
};

export default ItemCard;
