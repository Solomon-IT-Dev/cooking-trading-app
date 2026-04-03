export function ProfileAvatar() {
  const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent('trader-user')}`

  return (
    <div className="relative">
      <img
        src={avatarUrl}
        alt="Profile avatar"
        className="h-9 w-9 rounded-full bg-zinc-800 ring-1 ring-zinc-700/40 object-cover"
      />
      <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-purple-400">
        <span className="text-[8px] text-black font-bold">+</span>
      </div>
    </div>
  )
}
