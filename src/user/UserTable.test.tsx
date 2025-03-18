import { describe, expect, test } from "vitest";
import { UserTable } from "./UserTable.tsx";
import { render, screen } from "@testing-library/react";

describe("<UserTable>", () => {
  test("renders without crashing", async () => {
    render(<UserTable />);
  });

  test("loading spinner matches snapshot", async () => {
    const result = render(<UserTable />);

    expect(result.container).toMatchSnapshot();
  });

  test("rendered table matches snapshot", async () => {
    const result = render(<UserTable />);

    await screen.findByText("Chelsey Dietrich");

    expect(result.container).toMatchSnapshot();
  });
});
