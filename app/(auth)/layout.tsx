import Image from 'next/image'

export default function authLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-screen justify-center">
      <div className="hidden md:flex w-2/3">
        <Image
            className="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1682687218147-9806132dc697?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1975&q=80"
            width={1000}
            height={1000}
            alt='Auth Images'
        />
      </div>
      { children }
    </div>
  )
}
