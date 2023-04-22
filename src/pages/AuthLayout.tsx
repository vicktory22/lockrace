import { Outlet } from "@solidjs/router";
import { BottomNav } from "../components/BottomNav";

export function AuthLayout() {
  return (
    <>
      <div class="h-full pb-16">
        <Outlet />
      </div>
      <BottomNav />
    </>
  );
}
