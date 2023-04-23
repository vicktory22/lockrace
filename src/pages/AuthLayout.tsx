import { Outlet, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import { BottomNav } from "../components/BottomNav";
import { isAuthenticated } from "../services/auth/authenticator";

export function AuthLayout() {
  const navigate = useNavigate();

  createEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true });
    }
  });

  return (
    <>
      <div class="h-full pb-12">
        <Outlet />
      </div>
      <BottomNav />
    </>
  );
}
