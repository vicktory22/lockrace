import { JSX } from "solid-js";
import { match } from "ts-pattern";

export default function Login() {
  const handlePhoneNumberInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = function(e) {
    e.currentTarget.value = maskPhone(e.currentTarget.value);
  }

  return (
    <div class="container mx-auto px-4 h-full flex flex-col justify-center prose">
      <h2>Login</h2>
      <div class="form-control w-full pb-6">
        <label class="label">
          <span class="label-text">Enter phone number:</span>
          <span class="label-text-alt">(ex. 123-123-1233)</span>
        </label>
        <input onInput={handlePhoneNumberInput} type="tel" class="input input-bordered input-primary w-full" />
        <label class="label">
          <span class="label-text-alt text-error">Error Label</span>
        </label>
      </div>
      <button class="btn btn-block btn-primary">Send Login Code</button>
    </div>
  );
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
