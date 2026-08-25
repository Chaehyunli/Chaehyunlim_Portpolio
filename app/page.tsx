import { profile } from "@/content/profile";
import { ProfileSection } from "@/components/sections/ProfileSection";
import { RevealObserver } from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <main>
        <ProfileSection profile={profile} />
      </main>
    </>
  );
}
