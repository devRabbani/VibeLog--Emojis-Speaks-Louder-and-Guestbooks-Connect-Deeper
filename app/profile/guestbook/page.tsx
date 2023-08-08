export default function Guestbook() {
  return (
    <div className="bg-white mt-1 rounded-md shadow-sm p-2 items-baseline profileHeight">
      <form>
        <label className="text-sm text-slate-500" htmlFor="comment">
          Sign to Golam Rabbani's guestbook
        </label>
        <textarea
          className="bg-slate-100 w-full mt-1 mb-1 p-2 rounded-md border  border-slate-300 focus:border-slate-500 focus:outline-0"
          id="comment"
          rows={2}
          placeholder="Type something about...."
        />
        <button className="bg-slate-700 text-slate-50 w-32 rounded-md p-2 active:bg-slate-800 hover:bg-slate-800">
          Add
        </button>
      </form>

      <h3 className="mt-4 text-lg border-b border-slate-300 text-slate-500">
        Recents
      </h3>
      <div>
        <p className="text-slate-400 text-center my-[10vh] ">
          No one signed it yet
        </p>
      </div>
    </div>
  )
}
