import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { MemberCard } from "@/components/MemberCard";
import { getMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Members",
  description: "The people behind BMLA: founders, advisors and active members.",
};

export default function MembersPage() {
  const groups = getMembers();

  return (
    <section>
      <div className="mx-auto max-w-content px-6 py-16 md:py-20">
        <SectionHeading
          eyebrow="Members"
          title="The people behind BMLA"
          description="Students and advisors who run the association day to day, organize events and lead projects."
        />

        <div className="mt-14 flex flex-col gap-14">
          {groups.map((group) => (
            <div key={group.role}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                {group.role}
              </h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.members.map((member) => (
                  <MemberCard key={member.name} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
