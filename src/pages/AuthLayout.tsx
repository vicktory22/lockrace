import { Outlet } from "@solidjs/router";
import { BottomNav } from "../components/BottomNav";

export function AuthLayout() {
  return (
    <>
      <div class="h-full pb-12">
        <Outlet />
      </div>
      <BottomNav />
    </>
  );
}
