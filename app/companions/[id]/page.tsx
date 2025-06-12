import CompanionComponent from "@/components/CompanionComponent"
import { getCompanion } from "@/lib/actions/companion.actions"
import { getSubjectColor } from "@/lib/utils"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"

interface CompanionSessionPageProps {
  params: Promise<{id: string}>
}


const CompanionSession = async ({params}: CompanionSessionPageProps) => {
  const {id} = await params
  const companion = await getCompanion(id)
  const user = await currentUser()

  const {name, subject,title,topic,duration} = companion

  if(!user) redirect('/sign-in')
  if(!companion) redirect('/companions')  

  return (
    <main>
      <article className="flex justify-between rounded-border p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div className="size-[72px] flex items-center justify-center max-md:hidden rounded-lg" style={{backgroundColor: getSubjectColor(companion.subject)}}>
            <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} height={35} width={35}/>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <p className="font-bold text-2xl">
                {companion.name}
              </p>
              <div className="subject-badge max-sm:hidden">
                {companion.subject}
              </div>
            </div>
            <p className="text-lg">
              {companion.topic}
            </p>
          </div>
        </div>
        <div className="items-start max-md:hidden text-2xl">
          {companion.duration} minutes
        </div>
      </article>

      <CompanionComponent 
        {...companion}
        comapnionId = {id}
        userName = {user.firstName!}
        userImage = {user.imageUrl!}
      />
    </main>
  )
}

export default CompanionSession