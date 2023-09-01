import Navbar from '@/components/molecules/Navbar'
import { Sidebar } from '@/components/molecules/Sidebar'

const RootLayout = ({ children } : {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full">
      <main>
        <Navbar />
        <div className='hidden md:flex mt-16 w-120 flex-col fixed inset-y-0'>
          <Sidebar />
        </div>
        <div className='md:pl-52 pt-16 h-full'>
          { children }
        </div>
      </main>
    </div>
  )
}

export default RootLayout
