export default function Guestbook() {
  return (
    <div className="bg-teal-700 mt-1 rounded-md shadow-sm p-2 items-baseline profileHeight">
      <form>
        <label className="text-sm opacity-85" htmlFor="comment">
          Sign to Golam Rabbani's guestbook
        </label>
        <textarea
          className="bg-teal-800 w-full mt-1 mb-1 p-2 rounded-md border  border-teal-800 placeholder:opacity-60 focus:border-black focus:outline-0"
          id="comment"
          rows={2}
          placeholder="Type something about...."
        />
        <button className="bg-teal-100 text-teal-900 w-32 rounded-md p-2 active:bg-slate-800 hover:bg-slate-800">
          Add
        </button>
      </form>

      <h3 className="mt-4 text-lg border-b border-slate-300 opacity-85">
        Recents
      </h3>
      <div>
        <p className="opacity-50 text-center my-[10vh] ">
          No one signed it yet
        </p>
      </div>
    </div>
  )
}
