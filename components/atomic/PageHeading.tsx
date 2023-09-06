import { Separator } from '@/components/ui/separator'

interface PageHeadingProps {
  title: string
  desc?: string
}

const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  desc
 }) => {
  return (
    <div className="space-y-2">
      <h1 className="font-bold text-3xl text-slate-800">{ title }</h1>
      <p className="font-medium text-sm text-slate-400">{ desc }</p>
      <Separator />
    </div>

  )
}

export default PageHeading
