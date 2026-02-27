export function Header() {
  return (
    <header className="bg-brand px-4 py-3 text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <div>
          <p className="text-xl font-bold leading-none">Flipkart</p>
          <p className="text-xs text-blue-100">Explore Plus</p>
        </div>
        <input
          className="h-10 w-full rounded-sm border-0 px-3 text-sm text-slate-900 outline-none"
          placeholder="Search for products, brands and more"
          type="text"
        />
        <button className="rounded-sm bg-white px-6 py-2 text-sm font-semibold text-brand">
          Login
        </button>
      </div>
    </header>
  );
}
