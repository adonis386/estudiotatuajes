import { SITE_TITLE } from '../config/constants'

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#C4A962] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-[#C4A962] text-xl font-birthstone">{SITE_TITLE}</h2>
      </div>
    </div>
  )
}

export default Loading
