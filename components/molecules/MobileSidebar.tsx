import { Menu } from 'lucide-react'

import { Sidebar } from '@/components/molecules/Sidebar'
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet'

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden pr-4'>
        <Menu />
      </SheetTrigger>
      <SheetContent side='left' className='p-0 pt-10 w-fit'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
