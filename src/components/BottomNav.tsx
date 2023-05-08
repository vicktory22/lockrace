import { HomeIcon } from "../icons/HomeIcon";
import { TrophyIcon } from "../icons/TrophyIcon";
import { UserIcon } from "../icons/User";
import { A } from "@solidjs/router";

export function BottomNav() {
  return (
    <div class="btm-nav btm-nav-sm">
      <A href="/" end={true}>
        <HomeIcon />
      </A>
      <A href="/games">
        <TrophyIcon />
      </A>
      <A href="/me">
        <UserIcon />
      </A>
    </div>
  );
}
