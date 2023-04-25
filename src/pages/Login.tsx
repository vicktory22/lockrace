import { isAuthenticated, loginUser } from "../services/auth/authenticator";
import { useNavigate } from "@solidjs/router";
import { JSX, Show, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { match } from "ts-pattern";

const API_ERROR_MESSAGE = "There was an error logging in. Please try again.";
const PHONE_NUMBER_ERROR_MESSAGE = "Please enter a valid phone number.";

export default function Login() {
  const navigate = useNavigate();
  const formState = {
    phoneNumber: "",
    api: {
      hasError: false,
      errorMessage: "",
    },
  };

  const [loginState, setLoginState] = createStore(formState);

  createEffect(() => {
    if (isAuthenticated()) {
      navigate("/", { replace: true });
    }
  });

  const handleLogin: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = async function (e) {
    e.preventDefault();

    const phoneNumber = extractNumbers(loginState.phoneNumber);

    if (phoneNumber.length !== 10) {
      setLoginState("api", {
        hasError: true,
        errorMessage: PHONE_NUMBER_ERROR_MESSAGE,
      });
      return;
    }

    const loginResult = await loginUser(preparePhoneNumber(phoneNumber));

    if (loginResult.isErr()) {
      setLoginState("api", {
        hasError: true,
        errorMessage: API_ERROR_MESSAGE,
      });
      return;
    }

    navigate("/", { replace: true });
  };

  const handlePhoneNumberInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = function (e) {
    e.currentTarget.value = maskPhone(e.currentTarget.value);
    formState.phoneNumber = e.currentTarget.value;
  };

  return (
    <div class="container mx-auto px-4 h-full flex flex-col justify-center prose">
      <h2>Login</h2>
      <Show when={loginState.api.hasError}>
        <div class="form-control alert shadow py-2 mb-4 mt-2 text-error">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{loginState.api.errorMessage}</span>
          </div>
        </div>
      </Show>
      <div class="form-control w-full pb-6">
        <label class="label">
          <span class="label-text">Enter phone number:</span>
          <span class="label-text-alt">(ex. 123-123-1233)</span>
        </label>
        <input onInput={handlePhoneNumberInput} type="tel" class="input input-bordered input-primary w-full" />
      </div>
      <button onClick={handleLogin} class="btn btn-block btn-primary">
        Send Login Code
      </button>
    </div>
  );
}

function extractNumbers(input: string): string {
  let onlyNumbers = "";

  for (const char of input) {
    if (char < "0" || char > "9") {
      continue;
    }

    onlyNumbers += char;
  }

  return onlyNumbers;
}

function preparePhoneNumber(phoneNumber: string): string {
  return `+1${extractNumbers(phoneNumber)}`;
}

function maskPhone(phoneNumber: string): string {
  let maskedPhone = "";

  for (const char of phoneNumber) {
    if (maskedPhone.length === 14) {
      break;
    }

    if (char < "0" || char > "9") {
      continue;
    }

    maskedPhone += match(maskedPhone.length)
      .with(0, () => `(${char}`)
      .with(4, () => `) ${char}`)
      .with(9, () => `-${char}`)
      .otherwise(() => char);
  }

  return maskedPhone;
}
