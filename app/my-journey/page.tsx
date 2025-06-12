import CompanionsList from "@/components/CompanionsList"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getUserCompanions, getUserSessions } from "@/lib/actions/companion.actions"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"

const Profile = async () => {
  const user = await currentUser()
  if(!user) redirect('/sign-in')
    
    const companions = await getUserCompanions(user.id)
    const sessionsHistory = await getUserSessions(user.id)

  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between items-center gap-4 max-sm:flex-col">
        <div className="flex items-center gap-4">
          <Image src={user.imageUrl} alt={user.firstName!} height={110} width={110}/>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-muted-foreground text-sm">{user.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 border border-black rounded-lg p-3 h-fit">
            <div className="flex items-center gap-2">
              <Image src="/icons/check.svg" alt="checkmark" width={22} height={22}/>
              <p className="font-bold text-2xl">{sessionsHistory.length}</p>
            </div>
            <div>Lessons completed</div>
          </div>

          <div className="flex flex-col gap-2 border border-black rounded-lg p-3 h-fit">
            <div className="flex items-center gap-2">
              <Image src="/icons/cap.svg" alt="cap" width={22} height={22}/>
              <p className="font-bold text-2xl">{companions.length}</p>
            </div>
            <div>Companions created</div>
          </div>
        </div>
      </section>

      <Accordion type="multiple">
        <AccordionItem value="recent">
        <AccordionTrigger className="font-bold text-2xl">Recent Sessions</AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="Recent sessions" companions={sessionsHistory}/>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="companions">
          <AccordionTrigger className="font-bold text-2xl">My companions {`(${companions.length})`}</AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My companions" companions={companions}/>
          </AccordionContent>
          </AccordionItem>
      </Accordion>
    </main>
  )
}

export default Profile