import App from "../App";
import { render } from "@solidjs/testing-library";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";

describe("App", () => {
  it("should lazy load all routes", () => {
    const { queryByText } = render(() => <App />);
    expect(queryByText("Dashboard")).toBeNull();
  });
});
