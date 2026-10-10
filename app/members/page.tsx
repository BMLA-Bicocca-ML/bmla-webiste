import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { MembersMosaic } from "@/components/MembersMosaic";
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
          title="The people building BMLA"
          description="Meet the community behind BMLA"
        />

        <div className="mt-12">
          <MembersMosaic groups={groups} />
        </div>
      </div>
    </section>
  );
}
