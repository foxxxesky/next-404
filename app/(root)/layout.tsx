import Navbar from '@/components/molecules/Navbar'

const RootLayout = ({ children } : {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full">
      <main>
        <Navbar />
        { children }
      </main>
    </div>
  )
}

export default RootLayout
